import { pool } from '../configs/database/connect'
import { hashPassword } from '../utils/bcrypt.utils'

export const registerUser = async ({ email, password, name }) => {
  const hashedPassword = await hashPassword(password)

  const [result] = await pool.query(
    'INSERT INTO customers (email, password, name, role, status) VALUES (?, ?, ?, ?, ?)',
    [email, hashedPassword, name, 'user', 'active']
  )

  return result.affectedRows > 0
}
