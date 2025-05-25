import { pool } from '../configs/database/connect'

export const getAllProducts = async ({
  search,
  priceFrom,
  priceTo,
  limit,
  page,
  sortBy,
  orderBy,
  category,
  sort,
  brand
}) => {
  let baseQuery = `FROM products WHERE 1 = 1`
  const params = []

  if (search) {
    baseQuery += ` AND name LIKE ?`
    params.push(`%${search}%`)
  }
  if (brand && !Array.isArray(brand)) {
    brand = [brand]
  }
  if (category) {
    baseQuery += ` AND category = ?`
    params.push(category)
  }
  if (brand) {
    if (Array.isArray(brand)) {
      const placeholders = brand.map(() => '?').join(', ')
      baseQuery += ` AND brand IN (${placeholders})`
      params.push(...brand)
    } else {
      baseQuery += ` AND brand = ?`
      params.push(brand)
    }
  }
  if (priceFrom) {
    baseQuery += ` AND price >= ?`
    params.push(parseFloat(priceFrom))
  }
  if (priceTo) {
    baseQuery += ` AND price <= ?`
    params.push(parseFloat(priceTo))
  }
  if (sort) {
    baseQuery += ` AND sort = ?`
    params.push(parseInt(sort))
  }

  // Đếm tổng sản phẩm phù hợp
  const countQuery = `SELECT COUNT(*) as total ${baseQuery}`
  const [countResult] = await pool.query(countQuery, params)
  const totalItems = countResult[0].total

  // Truy vấn dữ liệu sản phẩm
  let queryStr = `SELECT product_id, name, description, price, promotion, image_url, category, sort, originalPrice, brand ${baseQuery}`

  if (sortBy) {
    const allowedSortBy = ['product_id', 'name', 'price', 'category', 'sort']
    if (allowedSortBy.includes(sortBy)) {
      const order = orderBy && ['asc', 'desc'].includes(orderBy.toLowerCase()) ? orderBy.toUpperCase() : 'ASC'
      queryStr += ` ORDER BY ${sortBy} ${order}`
    }
  }

  let currPage = 1
  let lim = 10
  if (limit && page) {
    currPage = parseInt(page)
    lim = parseInt(limit)
    const start = (currPage - 1) * lim
    queryStr += ` LIMIT ? OFFSET ?`
    params.push(lim, start)
  }

  const [products] = await pool.query(queryStr, params)

  const totalPages = Math.ceil(totalItems / lim)

  return {
    products,
    pagination: {
      totalItems,
      totalPages,
      currentPage: currPage
    }
  }
}

export const getTopCategories = async () => {
  try {
    const [categories] = await pool.query(
      `SELECT category, img, logo1, logo2, logo3  FROM topcategory ORDER BY sort ASC`
    )
    const results = []
    for (const item of categories) {
      const { products } = await getAllProducts({
        category: item.category,
        limit: 6,
        page: 1,
        sortBy: 'sort',
        orderBy: 'asc'
      })

      results.push({
        category: item.category,
        img: item.img,
        logo1: item.logo1,
        logo2: item.logo2,
        logo3: item.logo3,
        products
      })
    }
    return results
  } catch (error) {
    console.error('Lỗi khi lấy danh sách category:', error)
    throw error
  }
}

export const getProductById = async ({ product_id }) => {
  const productQuery = `SELECT product_id, name, description, price, promotion, quantity, category, originalPrice
                FROM products
                WHERE 1 = 1 AND product_id = ?`
  const params = [product_id]

  const [[product]] = await pool.query(productQuery, params)

  if (!product) {
    return {
      product: null
    }
  }

  const [specResult, imageResult, averageRatingResult] = await Promise.all([
    pool.query(
      `SELECT spec_name, spec_value FROM product_spec WHERE 1 = 1 AND product_id = ? ORDER BY spec_id`,
      params
    ),
    pool.query(`SELECT image_url FROM product_images WHERE 1 = 1 AND product_id = ?`, params),
    pool.query(
      `SELECT 
       AVG(rating) AS average, 
       COUNT(rating) AS total,
       (
        SELECT JSON_OBJECTAGG(t.rating, t.count)
        FROM (
          SELECT rating, COUNT(*) AS count
          FROM comments
          WHERE product_id = ? AND rating IS NOT NULL
          GROUP BY rating
        ) AS t
       ) AS distribution
       FROM comments
       WHERE product_id = ?`,
      [product_id, product_id]
    )
  ])

  const [productSpec] = specResult
  productSpec.forEach((spec) => (spec.spec_value = JSON.parse(spec.spec_value)))
  product.spec = productSpec

  const [productImage] = imageResult
  product.image_url = productImage.map((item) => item.image_url)

  const [averageRating] = averageRatingResult
  let distribution = averageRating[0].distribution

  if (!distribution) {
    distribution = {}
  }
  for (let i = 1; i <= 5; i++) {
    if (!distribution[i]) {
      distribution[i] = 0
    }
  }

  const rating = {
    average: Number(averageRating[0].average ?? 0),
    total: Number(averageRating[0].total ?? 0),
    distribution: distribution ?? {}
  }
  product.rating = rating

  return {
    product
  }
}

export const getCommentById = async ({ comment_id }) => {
  const [result] = await pool.query(
    `SELECT comment_id, parent_id, product_id, name, phone, content, rating, images, created_at 
     FROM comments
     WHERE comment_id = ?
     ORDER BY created_at DESC`,
    [comment_id]
  )

  return result[0]
}

export const createComment = async ({ parent_id, product_id, name, phone, content, images, rating }) => {
  const [[oldComment]] = await pool.query(
    `SELECT comment_id, parent_id
     FROM comments 
     WHERE 1 = 1 AND comment_id = ? AND product_id = ?
     LIMIT 1`,
    [parent_id, product_id]
  )

  if (parent_id && oldComment.parent_id) {
    parent_id = oldComment.parent_id
  }

  const [result] = await pool.query(
    `INSERT INTO comments (parent_id, product_id, name, phone, content, rating, images) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [parent_id, product_id, name, phone, content, rating, JSON.stringify(images)]
  )

  const newComment = await getCommentById({ comment_id: result.insertId })

  if (newComment.images) {
    newComment.images = JSON.parse(newComment.images)
  }

  return {
    comment: newComment
  }
}

export const getComment = async (product_id) => {
  const [result] = await pool.query(
    `SELECT comment_id, parent_id, product_id, name, phone, content, rating, images, created_at 
     FROM comments 
     WHERE 1 = 1 AND product_id = ?
     ORDER BY created_at DESC`,
    [product_id]
  )

  if (result.length) {
    result.forEach((item) => {
      if (item.images) {
        item.images = JSON.parse(item.images)
      }
    })
  }

  return {
    comments: result
  }
}
