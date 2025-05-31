import { body, header } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { pool } from '../configs/database/connect'
import { ErrorWithStatus } from '../errors/ErrorWithStatus'
import { verifyAuthToken } from '../utils/jwt.utils'
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

export const accessTokenValidator = (required = true) =>
  validate([
    header('Authorization')
      .if((value, { req }) => required || !!req.headers['authorization'])
      .notEmpty()
      .withMessage('Access token is required')
      .bail()
      .custom(async (accessToken, { req }) => {
        try {
          if (!accessToken) return true

          accessToken = accessToken.replace('Bearer ', '')

          const { customer_id, role } = verifyAuthToken(accessToken)
          const [[existingUser]] = await pool.query('SELECT * FROM customers WHERE customer_id = ? AND role = ?', [
            customer_id,
            role
          ])
          if (!existingUser) {
            throw new Error()
          }
          req.user = existingUser
        } catch (error) {
          throw new ErrorWithStatus('Invalid access token', StatusCodes.UNAUTHORIZED)
        }
        return true
      })
  ])

export const isAdminValidator = (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new ErrorWithStatus('You are not authorized to access this resource', StatusCodes.UNAUTHORIZED)
  }
  next()
}
