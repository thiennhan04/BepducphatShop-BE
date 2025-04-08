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

  const [rows] = await pool.query(queryStr, params)
  return { products: rows }
}
