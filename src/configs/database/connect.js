import { config } from 'dotenv'
import mysql from 'mysql2/promise'

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
config({ path: `.env.${env}` })

let pool

export async function connectDB() {
  try {
    pool = await mysql.createPool({
      host: process.env.DB_HOST || '',
      database: process.env.DB_NAME || '',
      user: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || '',
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0
    })

    await pool.query('SELECT 1')
    console.log('Connected Database!')
  } catch (err) {
    console.error('Connect database failed:', err.message)
    process.exit(1)
  }
}

export { pool }
