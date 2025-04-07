import { StatusCodes } from 'http-status-codes'

export const errorHandler = (err, req, res, next) => {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR

  res.status(status).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    errors: err.details || []
  })
}

export const notFoundHandler = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: 'error',
    message: 'Api Not Found'
  })
}
