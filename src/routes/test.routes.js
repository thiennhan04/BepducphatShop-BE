import { Router } from 'express'
import { testController } from '../controllers/test.controllers'
import { testValidator } from '../middlewares/test.middlewares'
const testRouter = Router()

testRouter.get('/test', testValidator, testController)

export default testRouter
