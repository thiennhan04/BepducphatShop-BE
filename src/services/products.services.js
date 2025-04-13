import { pool } from '../configs/database/connect'

export const getAllProducts = async ({ search, priceFrom, priceTo, limit, page, sortBy, orderBy, category }) => {
  let queryStr = `SELECT product_id, name, description, price, image_url, category
                  FROM products
                  WHERE 1 = 1`
  const params = []

  if (search) {
    queryStr += ` AND name LIKE ?`
    params.push(`%${search}%`)
  }
  if (category) {
    queryStr += ` AND category = ?`
    params.push(category)
  }
  if (priceFrom) {
    queryStr += ` AND price >= ?`
    params.push(parseFloat(priceFrom))
  }
  if (priceTo) {
    queryStr += ` AND price <= ?`
    params.push(parseFloat(priceTo))
  }
  if (sortBy) {
    const allowedSortBy = ['product_id', 'name', 'price', 'category']
    if (allowedSortBy.includes(sortBy)) {
      const order = orderBy && ['asc', 'desc'].includes(orderBy.toLowerCase()) ? orderBy.toUpperCase() : 'ASC'
      queryStr += ` ORDER BY ${sortBy} ${order}`
    }
  }
  if (limit && page) {
    const currPage = parseInt(page)
    const lim = parseInt(limit)
    const start = (currPage - 1) * lim

    queryStr += ` LIMIT ? OFFSET ?`
    params.push(lim, start)
  }

  const [products] = await pool.query(queryStr, params)
  return { products }
}

export const getProductById = async ({ product_id }) => {
  let queryStr = `SELECT product_id, name, description, price, image_url, category
                  FROM products
                  WHERE 1 = 1 AND product_id = ?`
  const params = [product_id]

  const [[product]] = await pool.query(queryStr, params)

  if (!product) {
    return {
      product: null
    }
  }

  const [productSpec] = await pool.query(
    `SELECT spec_name, spec_value FROM product_spec WHERE 1 = 1 AND product_id = ? ORDER BY spec_id`,
    params
  )

  productSpec.forEach((spec) => (spec.spec_value = JSON.parse(spec.spec_value)))

  product.spec = productSpec

  return {
    product
  }
}
