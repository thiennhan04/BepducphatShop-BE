import { Router } from 'express'
import {
  createCommentController,
  getAllProductsController,
  getCommentController,
  getProductController
} from '../controllers/products.controllers'
import { pagingValidator } from '../middlewares/paging.middlewares'
import {
  createCommentValidator,
  getAllProductsValidator,
  getCommentValidator,
  getProductValidator
} from '../middlewares/products.middlewares'
import { asyncHandler } from '../utils/asyncHandler.utils'

const productsRouter = Router()

productsRouter.get('/', getAllProductsValidator, pagingValidator, asyncHandler(getAllProductsController))
productsRouter.get('/:product_id', getProductValidator, asyncHandler(getProductController))
productsRouter
  .route('/:product_id/comments')
  .post(createCommentValidator, asyncHandler(createCommentController))
  .get(getCommentValidator, asyncHandler(getCommentController))

export default productsRouter
