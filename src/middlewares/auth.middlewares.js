import { body } from 'express-validator'
import { pool } from '../configs/database/connect'
import { validate } from '../utils/validate.utils'

export const registerValidator = validate([
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const [[existingUser]] = await pool.query('SELECT email FROM customers WHERE email = ?', [email])
      if (existingUser) {
        throw new Error('Email is already in use')
      }
    }),
  body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .custom(async (name) => {
      const [[existingUser]] = await pool.query('SELECT name FROM customers WHERE name = ?', [name])
      if (existingUser) {
        throw new Error('Name is already in use')
      }
    })
])

export const loginValidator = validate([
  body('usernameOrEmail').trim().notEmpty().withMessage('Username or email is required'),
  body('password').trim().notEmpty().withMessage('Password is required')
])
