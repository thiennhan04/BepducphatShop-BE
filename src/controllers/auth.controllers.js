import { StatusCodes } from 'http-status-codes'
import { registerUser } from '../services/auth.services'

export const registerController = async (req, res) => {
  const { email, password, name } = req.body

  const result = await registerUser({ email, password, name })

  if (!result) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Failed to create account'
    })
  }

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'Account created successfully'
  })
}
