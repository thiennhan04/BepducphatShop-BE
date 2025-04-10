import { query } from 'express-validator'
import { validate } from '../utils/validate.utils'

export const pagingValidator = validate([
  query('limit').optional().trim().isInt({ min: 1 }).withMessage('limit must be a positive integer'),

  query('page').optional().trim().isInt({ min: 1 }).withMessage('page must be a positive integer'),

  query('sortBy').optional().trim().isString().withMessage('sortBy must be a string'),

  query('orderBy').optional().trim().isIn(['asc', 'desc']).withMessage('orderBy must be "asc" or "desc"')
])
