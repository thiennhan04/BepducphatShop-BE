import { StatusCodes } from 'http-status-codes'
import { loginUser, registerUser } from '../services/auth.services'
import { verifyPassword } from '../utils/bcrypt.utils'

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

export const loginController = async (req, res) => {
  const { usernameOrEmail, password } = req.body

  const result = await loginUser({ usernameOrEmail })

  if (!result || !(await verifyPassword(password, result.user.password))) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: 'error',
      message: 'Invalid username/email or password'
    })
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Login successful',
    data: {
      token: result.token,
      user: {
        customer_id: result.user.customer_id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role
      }
    }
  })
}
