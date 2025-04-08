import { query } from 'express-validator'
import { validate } from '../utils/validate.utils'

export const getAllProductsValidator = validate([
  query('search').optional().trim().isString().withMessage('search must be a string'),

  query('priceFrom').optional().trim().isFloat({ min: 0 }).withMessage('priceFrom must be a positive number'),

  query('priceTo').optional().trim().isFloat({ min: 0 }).withMessage('priceTo must be a positive number'),

  query('priceTo').custom((value, { req }) => {
    if (req.query.priceFrom && value) {
      const from = parseFloat(req.query.priceFrom)
      const to = parseFloat(value)
      if (from > to) {
        throw new Error('priceTo must be greater than or equal to priceFrom')
      }
    }
    return true
  }),

  query('category').optional().isString().withMessage('category must be a string')
])
