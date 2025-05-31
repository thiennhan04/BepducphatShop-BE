import { Router } from 'express'
import {
  addToCartController,
  createCheckoutController,
  getCartController,
  removeFromCartController
} from '../controllers/cart.controllers'
import { accessTokenValidator } from '../middlewares/auth.middlewares'
import { addToCartValidator, createCheckoutValidator } from '../middlewares/cart.middlewares'
import { asyncHandler } from '../utils/asyncHandler.utils'
const cartRouter = Router()

cartRouter
  .route('/checkout')
  .post(accessTokenValidator(false), createCheckoutValidator, asyncHandler(createCheckoutController))
cartRouter
  .route('/')
  .get(accessTokenValidator(), asyncHandler(getCartController))
  .post(accessTokenValidator(false), addToCartValidator, asyncHandler(addToCartController))
  .delete(accessTokenValidator(false), asyncHandler(removeFromCartController))

export default cartRouter
