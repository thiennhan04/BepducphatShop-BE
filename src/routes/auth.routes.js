import { Router } from 'express'
import { loginController, registerController } from '../controllers/auth.controllers'
import { loginValidator, registerValidator } from '../middlewares/auth.middlewares'

const authRouter = Router()

authRouter.post('/register', registerValidator, registerController)
authRouter.post('/login', loginValidator, loginController)

export default authRouter
