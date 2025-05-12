import { pool } from '../configs/database/connect'

export const getCart = async (customer_id) => {
  const [[cart]] = await pool.query(
    `SELECT
     o.order_id,
     o.customer_id,
     o.order_date,
     SUM((p.price * (1 - p.promotion / 100)) * oi.quantity) AS total_amount,
     o.status,
     JSON_ARRAYAGG(
      JSON_OBJECT(
        'product_id', oi.product_id,
        'order_quantity', oi.quantity,
        'name', p.name,
        'description', p.description,
        'price', p.price,
        'promotion', p.promotion,
        'image_url', p.image_url,
        'quantity', p.quantity,
        'category', p.category,
        'image_url', p.image_url
      )
     ) AS items
     FROM orders o
     LEFT JOIN order_items oi
     ON oi.order_id = o.order_id
     LEFT JOIN products p
     ON oi.product_id = p.product_id
     WHERE o.customer_id = ?
     GROUP BY o.order_id
     LIMIT 1`,
    [customer_id]
  )

  return {
    cart
  }
}

export const addToCart = async (customer_id, product_id, quantity) => {
  const [rows] = await pool.query('', [customer_id, product_id, quantity])

  return rows
}

export const getCheckout = async ({ order_id }) => {
  const [[order]] = await pool.query(`SELECT * FROM orders WHERE order_id = ?`, [order_id])

  return {
    order
  }
}

export const createCheckout = async (
  customer_id,
  { email, full_name, phone, address, city, district, ward, note, items, total_amount }
) => {
  if (!customer_id) customer_id = null

  const [rows] = await pool.query(
    `INSERT INTO orders (customer_id, phone, email, full_name, address, city, district, ward, note, total_amount, status) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [customer_id, phone, email, full_name, address, city, district, ward, note, total_amount, 'pending']
  )

  if (!rows.insertId) return { order: null }

  await pool.query(
    `INSERT INTO order_items (order_id, product_id, quantity, price)
     VALUES ${items.map((item) => `(?, ?, ?, ?)`).join(',')}`,
    items.flatMap((item) => [rows.insertId, item.product_id, item.quantity, item.price])
  )

  if (customer_id) {
    const productIds = items.map((item) => item.product_id)
    await pool.query(
      `DELETE FROM cart_items 
       WHERE customer_id = ? AND product_id IN (?)`,
      [customer_id, productIds]
    )
  }

  const [[order]] = await pool.query(`SELECT * FROM orders WHERE order_id = ?`, [rows.insertId])

  return {
    order
  }
}
