import { StatusCodes } from 'http-status-codes'
import {
  createComment,
  getAllProducts,
  getComment,
  getProductById,
  getTopCategories
} from '../services/products.services'

export const getAllProductsController = async (req, res) => {
  const { products } = await getAllProducts(req.query)

  if (!products.length) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'success',
      message: 'Chưa có sản phẩm nào trong cơ sở dữ liệu'
    })
  }

  if (!products.length) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'success',
      message: 'Chưa có danh mục nào trong cơ sở dữ liệu'
    })
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      products
    }
  })
}

export const getTopCategoriesController = async (req, res) => {
  try {
    const categories = await getTopCategories()

    if (!categories.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'success',
        message: 'Không có danh mục nào'
      })
    }

    return res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        categories
      }
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách danh mục'
    })
  }
}

export const getProductController = async (req, res) => {
  const { product } = await getProductById(req.params)

  if (!product) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'success',
      message: 'Product not found'
    })
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      product
    }
  })
}

export const createCommentController = async (req, res) => {
  const { comment } = await createComment({ ...req.body, product_id: req.params.product_id })

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: { comment }
  })
}

export const getCommentController = async (req, res) => {
  const { comments } = await getComment(req.params.product_id)

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: { comments }
  })
}
