import { Router } from 'express'
import { loginController, registerController } from '../controllers/auth.controllers'
import { loginValidator, registerValidator } from '../middlewares/auth.middlewares'
import { asyncHandler } from '../utils/asyncHandler.utils'
const authRouter = Router()

authRouter.post('/register', registerValidator, asyncHandler(registerController))
authRouter.post('/login', loginValidator, asyncHandler(loginController))

export default authRouter
