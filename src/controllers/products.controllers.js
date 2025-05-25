import { StatusCodes } from 'http-status-codes'
import {
  createComment,
  getAllProducts,
  getComment,
  getProductById,
  getTopCategories
} from '../services/products.services'

export const getAllProductsController = async (req, res) => {
  const { products, pagination } = await getAllProducts(req.query)

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      products,
      pagination
    }
  })
}

export const getTopCategoriesController = async (req, res) => {
  const categoriesWithProducts = await getTopCategories()

  if (!categoriesWithProducts.length) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'success',
      message: 'Không tìm thấy danh mục nào kèm sản phẩm'
    })
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      categories: categoriesWithProducts
    }
  })
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
