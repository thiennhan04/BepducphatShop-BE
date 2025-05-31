import { Router } from 'express'
import { createProductController, getCategoriesController } from '../controllers/products.controllers'
import { accessTokenValidator, isAdminValidator } from '../middlewares/auth.middlewares'
import { pagingValidator } from '../middlewares/paging.middlewares'
import { asyncHandler } from '../utils/asyncHandler.utils'
const adminRouter = Router()

adminRouter.post(
  '/products',
  accessTokenValidator,
  isAdminValidator,
  pagingValidator,
  asyncHandler(createProductController)
)
adminRouter.get('/products/categories', accessTokenValidator(), isAdminValidator, asyncHandler(getCategoriesController))

export default adminRouter
