import { Router } from 'express'
import {
  createProductController,
  getCategoriesController,
  updateProductController
} from '../controllers/products.controllers'
import { accessTokenValidator, isAdminValidator } from '../middlewares/auth.middlewares'
import { pagingValidator } from '../middlewares/paging.middlewares'
import { createUpdateProductValidator } from '../middlewares/products.middlewares'
import { asyncHandler } from '../utils/asyncHandler.utils'
const adminRouter = Router()

adminRouter.use(accessTokenValidator(), isAdminValidator)
adminRouter.post('/products', createUpdateProductValidator, pagingValidator, asyncHandler(createProductController))
adminRouter.post('/products/:productId', createUpdateProductValidator, asyncHandler(updateProductController))
adminRouter.get('/products/categories', asyncHandler(getCategoriesController))
export default adminRouter
