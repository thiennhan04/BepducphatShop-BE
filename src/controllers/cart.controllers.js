import { StatusCodes } from 'http-status-codes'
import { addToCart, createCheckout, getCart, removeFromCart } from '../services/cart.services'

export const getCartController = async (req, res) => {
  const { cart } = await getCart(req.user.customer_id)

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: { cart }
  })
}

export const addToCartController = async (req, res) => {
  const { product_id, quantity } = req.body
  const cart = await addToCart(req.user.customer_id, product_id, quantity)

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: { cart }
  })
}

export const createCheckoutController = async (req, res) => {
  const { order } = await createCheckout(req.user?.customer_id, req.body)

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: { order }
  })
}

export const removeFromCartController = async (req, res) => {
  const { product_id } = req.body
  const cart = await removeFromCart(req.user.customer_id, product_id)

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: { cart }
  })
}
