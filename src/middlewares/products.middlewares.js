import { body, param, query } from 'express-validator'
import { getCommentById, getProductById } from '../services/products.services'
import { validate } from '../utils/validate.utils'

export const getAllProductsValidator = validate([
  query('search').optional().trim().isString().withMessage('search must be a string'),

  query('priceFrom')
    .optional({ checkFalsy: true })
    .trim()
    .isFloat({ min: 0 })
    .withMessage('priceFrom must be a positive number'),

  query('priceTo')
    .optional({ checkFalsy: true })
    .trim()
    .isFloat({ min: 0 })
    .withMessage('priceTo must be a positive number'),

  query('priceTo').custom((value, { req }) => {
    if (req.query.priceFrom && value) {
      const from = parseFloat(req.query.priceFrom)
      const to = parseFloat(value)
      if (from > to) {
        throw new Error('priceTo must be greater than or equal to priceFrom')
      }
    }
    return true
  }),

  query('category').optional().isString().withMessage('category must be a string')
])

export const getProductValidator = validate([param('product_id').isInt({ min: 1 }).withMessage('invalid product id')])

export const createCommentValidator = validate([
  param('product_id')
    .isInt({ min: 1 })
    .withMessage('invalid product id')
    .custom(async (value) => {
      const { product } = await getProductById({ product_id: value })
      if (!product) {
        throw new Error('product not found')
      }
      return true
    }),
  body('parent_id')
    .optional({ values: 'falsy' })
    .isInt({ min: 1 })
    .withMessage('invalid parent id')
    .custom(async (value) => {
      const comment = await getCommentById({ comment_id: value })
      if (!comment) {
        throw new Error('comment not found')
      }
      return true
    }),
  body('name')
    .trim()
    .isString()
    .withMessage('name must be a string')
    .isLength({ min: 1 })
    .withMessage('name is required'),
  body('phone')
    .trim()
    .isString()
    .withMessage('phone must be a string')
    .isLength({ min: 1 })
    .withMessage('phone is required')
    .isMobilePhone()
    .withMessage('phone is invalid'),
  body('content')
    .trim()
    .isString()
    .withMessage('content must be a string')
    .isLength({ min: 1, max: 200 })
    .withMessage('content is required'),
  body('rating').custom((value, { req }) => {
    const parentId = req.body.parent_id

    if (!parentId) {
      if (value === undefined || value === null || value === '') {
        throw new Error('rating is required for root comment')
      }
      const num = Number(value)
      if (!Number.isInteger(num) || num < 1 || num > 5) {
        throw new Error('rating must be an integer between 1 and 5')
      }
    } else {
      if (value !== undefined && value !== null && value !== '') {
        throw new Error('rating is not allowed for a reply comment')
      }
    }

    return true
  }),
  body('images')
    .isArray()
    .withMessage('images must be an array')
    .custom((value) => {
      if (!value) {
        throw new Error('images is required')
      }
      if (value.length > 0) {
        value.forEach((image) => {
          if (image.type !== 'image') {
            throw new Error('image type must be an image')
          }
          if (!image.url) throw new Error('image url is required')
        })
      }
      return true
    })
])

export const getCommentValidator = validate([
  param('product_id')
    .isInt({ min: 1 })
    .withMessage('invalid product id')
    .custom(async (value) => {
      const { product } = await getProductById({ product_id: value })
      if (!product) {
        throw new Error('product not found')
      }
      return true
    })
])

export const createUpdateProductValidator = validate([
  body('name')
    .trim()
    .isString()
    .withMessage('name must be a string')
    .isLength({ min: 1 })
    .withMessage('name is required'),
  body('description')
    .trim()
    .isString()
    .withMessage('description must be a string')
    .isLength({ min: 1 })
    .withMessage('description is required'),
  body('price').trim().isFloat({ min: 0 }).withMessage('price must be a positive number'),
  body('promotion').trim().isFloat({ min: 0 }).withMessage('promotion must be a positive number'),
  body('quantity').trim().isInt({ min: 0 }).withMessage('quantity must be a positive number'),
  body('category').trim().isString().withMessage('category must be a string'),
  body('originalPrice').trim().isFloat({ min: 0 }).withMessage('originalPrice must be a positive number'),
  body('brand').trim().isString().withMessage('brand must be a string'),
  body('image_url').trim().isString().withMessage('image_url must be a string'),
  body('detail_images')
    .trim()
    .isString()
    .withMessage('detail_images must be a string')
    .custom((value) => {
      if (!value) {
        throw new Error('detail_images is required')
      }
      return true
    })
])
