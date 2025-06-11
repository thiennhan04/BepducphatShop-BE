import { StatusCodes } from 'http-status-codes'
import {
  createComment,
  createProduct,
  getAllProducts,
  getCategories,
  getComment,
  getProductById,
  getTopCategories,
  getListCategories,
  createTopCategories,
  getlistCategoriesDetail,
  updatetCategoriesDetail,
  deleteCategory,
  updateProduct,
  deleteProduct
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
export const getListCategoriesController = async (req, res) => {
  const categories = await getListCategories()

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: { categories }
  })
}

export const createTopCategoriesController = async (req, res) => {
  await createTopCategories({ ...req.body, product_id: req.params.product_id })

  res.status(StatusCodes.CREATED).json({
    status: 'success'
  })
}

export const getCommentController = async (req, res) => {
  const { comments } = await getComment(req.params.product_id)

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: { comments }
  })
}

export const createProductController = async (req, res) => {
  await createProduct(req.body)

  res.status(StatusCodes.CREATED).json({
    status: 'success'
  })
}

export const updateProductController = async (req, res) => {
  await updateProduct(req.body)

  res.status(StatusCodes.CREATED).json({
    status: 'success'
  })
}

export const getCategoriesController = async (req, res) => {
  const categories = await getCategories()

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: { categories }
  })
}

export const getlistCategoriesDetailController = async (req, res) => {
  const categories = await getlistCategoriesDetail(req.query)

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: categories
  })
}

export const updateCategoryDetailController = async (req, res) => {
  const categories = await updatetCategoriesDetail(req.body)

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: categories
  })
}

export const deleteCategoryController = async (req, res) => {
  const categoryId = req.params.id
  if (!categoryId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'fail',
      message: 'Category ID is required'
    })
  }
  const deletedCategory = await deleteCategory(Number(categoryId))

  if (!deletedCategory) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'fail',
      message: 'Category not found or already deleted'
    })
  }

  return res.status(StatusCodes.OK).json({
    status: 'success',
    data: deletedCategory
  })
}

export const deleteProductController = async (req, res) => {
  console.log(req)

  const product_id = req.params.id
  if (!product_id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'fail',
      message: 'Product ID is required'
    })
  }
  const deletedCategory = await deleteProduct(Number(product_id))

  if (!deletedCategory) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'fail',
      message: 'Product not found or already deleted'
    })
  }

  return res.status(StatusCodes.OK).json({
    status: 'success',
    data: deletedCategory
  })
}
