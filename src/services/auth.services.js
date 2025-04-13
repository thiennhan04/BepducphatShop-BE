import bcrypt from 'bcrypt'
import { pool } from '../configs/database/connect'

export const registerUser = async ({ email, password, name }) => {
  const hashedPassword = await bcrypt.hash(password, 10)

  const [result] = await pool.query(
    'INSERT INTO customers (email, password, name, role, status) VALUES (?, ?, ?, ?, ?)',
    [email, hashedPassword, name, 'user', 'active']
  )

  return result.affectedRows > 0
}
