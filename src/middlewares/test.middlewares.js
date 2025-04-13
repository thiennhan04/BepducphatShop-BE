import { param } from 'express-validator'
import { validate } from '../utils/validate.utils'

export const testValidator = validate([
  param('check').isEmpty().withMessage('check param'),
  param('check2').isEmpty().withMessage('check param2')
])
