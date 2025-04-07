import { validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

export const validate = (validators) => {
  return async (req, res, next) => {
    await Promise.all(validators.map((validator) => validator.run(req)))

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed')
      error.status = StatusCodes.BAD_REQUEST
      error.details = errors.array().map(({ path, msg }) => ({
        field: path,
        message: msg
      }))
      return next(error)
    }
    next()
  }
}
