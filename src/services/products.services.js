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
  let queryStr = `SELECT product_id, name, description, price, promotion, image_url, category, sort, originalPrice, brand, quantity ${baseQuery}`

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
export const getCommentByIdsss = async ({ comment_id }) => {
  const [result] = await pool.query(
    `SELECT comment_id, parent_id, product_id, name, phone, content, rating, images, created_at 
     FROM comments
     WHERE comment_id = ?
     ORDER BY created_at DESC`,
    [comment_id]
  )

  return result[0]
}
export const getListCategories = async () => {
  const [categories] = await pool.query(`SELECT DISTINCT category FROM products`)
  return categories
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
  const productQuery = `SELECT product_id, name, description,sort, brand, price, promotion, quantity, category, originalPrice, image_url
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
  product.image_url = [product.image_url, ...productImage.map((item) => item.image_url)]

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

export const createTopCategories = async ({ category, sort, img, logo1, logo2, logo3 }) => {
  await pool.query(`INSERT INTO topcategory(category, sort, img, logo1, logo2, logo3) values (?,?,?,?,?,?)`, [
    category,
    sort,
    img,
    logo1,
    logo2,
    logo3
  ])
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

export const createProduct = async ({
  name,
  description,
  price,
  images,
  originalPrice,
  quantity,
  category,
  sort,
  brand,
  specs
}) => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    // 1. Insert product
    const [productResult] = await connection.query(
      `INSERT INTO products (name, description, price, originalPrice, quantity, category, sort, brand, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, description, price, originalPrice, quantity, category, sort, brand, images[0]]
    )

    const productId = productResult.insertId

    // 2. Insert additional images
    for (const img of images.slice(1)) {
      await connection.query(`INSERT INTO product_images (product_id, image_url) VALUES (?, ?)`, [productId, img])
    }

    // 3. Insert specifications
    for (const group of specs) {
      const groupTitle = group.title
      for (const item of group.data) {
        await connection.query(
          `INSERT INTO product_spec (product_id, spec_name, spec_value)
           VALUES (?, ?, ?)`,
          [productId, groupTitle, JSON.stringify(item)]
        )
      }
    }

    await connection.commit()
    return { productId }
  } catch (err) {
    await connection.rollback()
    console.error('Transaction failed:', err)
    throw new Error('Failed to create product')
  } finally {
    connection.release()
  }
}

export const updateProduct = async ({
  id,
  name,
  description,
  price,
  images,
  originalPrice,
  quantity,
  category,
  sort,
  brand,
  specs
}) => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    // 1. Update product
    await connection.query(
      `UPDATE products
       SET name = ?, description = ?, price = ?, originalPrice = ?, quantity = ?, category = ?, sort = ?, brand = ?, image_url = ?
       WHERE product_id = ?`,
      [name, description, price, originalPrice, quantity, category, sort, brand, images[0], id]
    )

    // 2. Delete old images
    await connection.query(`DELETE FROM product_images WHERE product_id = ?`, [id])

    // 3. Insert updated additional images
    for (const img of images.slice(1)) {
      await connection.query(`INSERT INTO product_images (product_id, image_url) VALUES (?, ?)`, [id, img])
    }

    // 4. Delete old specs
    await connection.query(`DELETE FROM product_spec WHERE product_id = ?`, [id])

    // 5. Insert updated specs
    for (const group of specs) {
      const groupTitle = group.title
      for (const item of group.data) {
        await connection.query(
          `INSERT INTO product_spec (product_id, spec_name, spec_value)
           VALUES (?, ?, ?)`,
          [id, groupTitle, JSON.stringify(item)]
        )
      }
    }

    await connection.commit()
    return { success: true, productId: id }
  } catch (err) {
    await connection.rollback()
    console.error('Transaction failed during update:', err)
    throw new Error('Failed to update product')
  } finally {
    connection.release()
  }
}

export const getCategories = async () => {
  const [result] = await pool.query(`SELECT DISTINCT category FROM products`)

  return result.map((item) => item.category)
}

export const getlistCategoriesDetail = async ({ limit, page }) => {
  let queryStr = 'SELECT * FROM topcategory'
  const params = []
  let currPage = 1
  let lim = 10
  if (limit && page) {
    currPage = parseInt(page)
    lim = parseInt(limit)
    const start = (currPage - 1) * lim
    queryStr += ` LIMIT ? OFFSET ?`
    params.push(lim, start)
  }
  const [result] = await pool.query(queryStr, params)
  const [[{ totalItems }]] = await pool.query('Select count(1) as totalItems FROM topcategory')
  return { categories: result, pagination: { totalItems } }
}

export const updatetCategoriesDetail = async ({ id, category, sort, img, logo1, logo2, logo3 }) => {
  const [result] = await pool.query(
    `Update topcategory set category = ?, sort = ?,img = ?,logo1 = ?,logo2 = ?,logo3 = ?  where id = ?`,
    [category, sort, img, logo1, logo2, logo3, id]
  )
  return result
}

export const deleteCategory = async (id) => {
  const [result] = await pool.query(`DELETE FROM topcategory WHERE product_id = ?`, [id])
  return result
}

export const deleteProduct = async (productId) => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    // 1. Xoá ảnh phụ
    await connection.query(`DELETE FROM product_images WHERE product_id = ?`, [productId])

    // 2. Xoá thông số kỹ thuật
    await connection.query(`DELETE FROM product_spec WHERE product_id = ?`, [productId])

    // 3. Xoá comment
    await connection.query(`DELETE FROM comments WHERE product_id = ?`, [productId])

    // 3. Xoá orders
    await connection.query(`DELETE FROM order_items WHERE product_id = ?`, [productId])

    // 4. Xoá sản phẩm chính
    const [result] = await connection.query(`DELETE FROM products WHERE product_id = ?`, [productId])

    await connection.commit()

    if (result.affectedRows === 0) {
      return { success: false, message: 'Product not found' }
    }

    return { success: true, message: 'Product deleted successfully' }
  } catch (err) {
    await connection.rollback()
    console.error('Failed to delete product:', err)
    throw new Error('Failed to delete product')
  } finally {
    connection.release()
  }
}

export const getListOrder = async ({
  limit = 10,
  page = 1,
  sortBy = 'order_date',
  orderBy = 'desc',
  search = '',
  status = ''
}) => {
  const select = `SELECT order_id, customer_id, phone, email, full_name, address, city, district, ward, note, total_amount, order_date, status`
  let queryStr = `FROM orders
                    WHERE 1 = 1`
  const params = []

  if (search) {
    queryStr += ` AND (CAST(order_id AS CHAR) LIKE ? OR phone LIKE ? OR email LIKE ? OR note LIKE ?)`
    params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`)
  }

  if (status) {
    queryStr += ` AND status = ?`
    params.push(status)
  }

  if (sortBy && orderBy) {
    const allowedSortBy = ['order_date', 'amount']
    if (allowedSortBy.includes(sortBy)) {
      const order = orderBy && ['asc', 'desc'].includes(orderBy.toLowerCase()) ? orderBy.toUpperCase() : 'ASC'
      queryStr += ` ORDER BY ${sortBy} ${order}`
    }
  }

  const [[{ totalItems }]] = await pool.query(`SELECT COUNT(*) as totalItems ${queryStr}`, params)
  let totalPages = 1
  let currentPage = 1

  if (limit && page) {
    currentPage = parseInt(page)
    const lim = parseInt(limit)
    const start = (currentPage - 1) * lim
    queryStr += ` LIMIT ? OFFSET ?`
    params.push(lim, start)
    totalPages = Math.ceil(totalItems / lim)
  }

  const [orderList] = await pool.query(`${select} ${queryStr}`, params)

  return {
    orderList,
    pagination: {
      totalItems,
      totalPages,
      currentPage
    }
  }
}

export const getDetailOrder = async ({ order_id }) => {
  const queryStr = `SELECT 
                    oi.order_item_id,
                    oi.order_id,
                    oi.product_id,
                    p.name,
                    p.image_url,
                    oi.quantity,
                    oi.price,
                    (oi.quantity * oi.price) AS total_price
                  FROM order_items oi
                  JOIN products p ON oi.product_id = p.product_id
                  WHERE oi.order_id = ?`
  const params = [order_id]
  const [productList] = await pool.query(queryStr, params)

  return {
    productList
  }
}

export const updateOrderStatus = async ({ order_id, status }) => {
  const queryStr = `UPDATE orders SET status = ? WHERE order_id = ?`
  const params = [status, order_id]

  await pool.query(queryStr, params)
}
