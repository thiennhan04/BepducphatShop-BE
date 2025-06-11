import { Router } from 'express'
import {
  createProductController,
  getCategoriesController,
  getListCategoriesController,
  createTopCategoriesController,
  getlistCategoriesDetailController,
  updateCategoryDetailController,
  deleteCategoryController,
  updateProductController,
  deleteProductController
} from '../controllers/products.controllers'
import { accessTokenValidator, isAdminValidator } from '../middlewares/auth.middlewares'
import { pagingValidator } from '../middlewares/paging.middlewares'
import { asyncHandler } from '../utils/asyncHandler.utils'
const adminRouter = Router()

adminRouter.post(
  '/products/createProduct',
  accessTokenValidator,
  isAdminValidator,
  asyncHandler(createProductController)
)

adminRouter.post(
  '/products/updateProduct',
  accessTokenValidator,
  isAdminValidator,
  asyncHandler(updateProductController)
)

adminRouter.get('/products/categories', accessTokenValidator(), isAdminValidator, asyncHandler(getCategoriesController))
adminRouter.get('/products/listcategory', asyncHandler(getListCategoriesController))
adminRouter.get('/products/updateCategoryDetail', asyncHandler(updateCategoryDetailController))
adminRouter.post(
  '/products/topcategories',
  accessTokenValidator(),
  isAdminValidator,
  asyncHandler(createTopCategoriesController)
)
adminRouter.get(
  '/products/listCategoriesDetail',
  accessTokenValidator(),
  isAdminValidator,
  pagingValidator,
  asyncHandler(getlistCategoriesDetailController)
)

adminRouter.put(
  '/products/updateCategoryDetail',
  accessTokenValidator(),
  isAdminValidator,
  pagingValidator,
  asyncHandler(updateCategoryDetailController)
)

adminRouter.delete(
  '/products/deleteProduct/:id',
  accessTokenValidator(),
  isAdminValidator,
  asyncHandler(deleteProductController)
)
adminRouter.delete('/products/:id', deleteProductController)

export default adminRouter
