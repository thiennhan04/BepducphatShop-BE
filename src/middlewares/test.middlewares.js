import { query } from 'express-validator'
import { validate } from '../utils/validate.utils'

export const testValidator = validate([
  query('check').notEmpty().withMessage('check param is required'),
  query('check2').notEmpty().withMessage('check param2 is required')
])
