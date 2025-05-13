import { body } from 'express-validator'
import { getProductById } from '../services/products.services'
import { validate } from '../utils/validate.utils'

export const addToCartValidator = validate([
  body('product_id').isInt({ min: 1 }).withMessage('Product ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity is required')
])

export const createCheckoutValidator = validate([
  body('email').isEmail().withMessage('Email is invalid'),
  body('full_name').isString().withMessage('Full name is required'),
  body('phone').isMobilePhone('vi-VN').withMessage('Phone is required'),
  body('address').isString().withMessage('Address is required'),
  body('city').isString().withMessage('City is required'),
  body('district').isString().withMessage('District is required'),
  body('ward').isString().withMessage('Ward is required'),
  body('note').optional().isString().withMessage('Note must be a string'),
  body('items')
    .isArray()
    .withMessage('Items must be an array')
    .custom(async (items, { req }) => {
      if (!items) return true
      const isValid = items.every((item) => {
        return parseInt(item.product_id) > 0 && parseInt(item.quantity) > 0
      })
      if (!isValid) {
        throw new Error('Items must be an array of objects with valid product_id and valid quantity')
      }
      let totalAmount = 0
      for (const item of items) {
        const { product } = await getProductById({ product_id: item.product_id })
        if (!product) {
          throw new Error(`Product id ${item.product_id} not found`)
        }
        totalAmount += product.price * item.quantity
        item.price = product.price
      }
      if (totalAmount > 20000000) {
        throw new Error('Invalid total amount')
      }
      req.body.total_amount = totalAmount
      return true
    })
])
