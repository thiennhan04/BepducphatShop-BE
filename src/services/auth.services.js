import { pool } from '../configs/database/connect'
import { hashPassword } from '../utils/bcrypt.utils'
import { signAuthToken } from '../utils/jwt.utils'

export const registerUser = async ({ email, password, name }) => {
  const hashedPassword = await hashPassword(password)

  const [result] = await pool.query(
    'INSERT INTO customers (email, password, name, role, status) VALUES (?, ?, ?, ?, ?)',
    [email, hashedPassword, name, 'user', 'active']
  )

  return result.affectedRows > 0
}

export const loginUser = async ({ usernameOrEmail }) => {
  const [rows] = await pool.query(
    'SELECT customer_id, email, password, name, role FROM customers WHERE email = ? OR name = ?',
    [usernameOrEmail, usernameOrEmail]
  )

  if (!rows.length) {
    return null
  }

  const user = rows[0]
  const token = signAuthToken({ customer_id: user.customer_id, role: user.role })

  return { token, user }
}
