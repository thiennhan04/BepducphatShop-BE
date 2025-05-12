import { validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

export const validate = (validators) => {
  return async (req, res, next) => {
    await Promise.all(validators.map((validator) => validator.run(req)))

    const errors = validationResult(req)

    if (errors.isEmpty()) {
      return next()
    }

    const error = new Error('Validation failed')

    const errorArray = errors.array()
    const errorWithStatus = errorArray.find((err) => err.msg.includes('Invalid access token'))

    if (errorWithStatus) {
      error.status = StatusCodes.UNAUTHORIZED
    } else {
      error.status = StatusCodes.BAD_REQUEST
    }

    error.details = errorArray.map(({ path, msg }) => ({
      field: path,
      message: msg
    }))
    next(error)
  }
}
