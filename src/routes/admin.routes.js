import { Router } from 'express'
import {
  createProductController,
  createTopCategoriesController,
  deleteProductController,
  getCategoriesController,
  getDetailDetailController,
  getListCategoriesController,
  getlistCategoriesDetailController,
  getListOrderController,
  updateCategoryDetailController,
  updateOrderStatusController,
  updateProductController
} from '../controllers/products.controllers'
import { accessTokenValidator, isAdminValidator } from '../middlewares/auth.middlewares'
import { pagingValidator } from '../middlewares/paging.middlewares'
import { getListOrderValidator } from '../middlewares/products.middlewares'
import { asyncHandler } from '../utils/asyncHandler.utils'
const adminRouter = Router()

adminRouter.post(
  '/products/createProduct',
  accessTokenValidator(),
  isAdminValidator,
  asyncHandler(createProductController)
)

adminRouter.post(
  '/products/updateProduct',
  accessTokenValidator(),
  isAdminValidator,
  asyncHandler(updateProductController)
)

adminRouter.get('/products/categories', accessTokenValidator(), isAdminValidator, asyncHandler(getCategoriesController))
adminRouter.get(
  '/products/listcategory',
  accessTokenValidator(),
  isAdminValidator,
  asyncHandler(getListCategoriesController)
)
adminRouter.get(
  '/products/updateCategoryDetail',
  accessTokenValidator(),
  isAdminValidator,
  asyncHandler(updateCategoryDetailController)
)
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
adminRouter.delete('/products/:id', accessTokenValidator(), isAdminValidator, deleteProductController)
adminRouter.post(
  '/orders/getOrderList',
  accessTokenValidator(),
  isAdminValidator,
  pagingValidator,
  getListOrderValidator,
  getListOrderController
)
adminRouter.post('/orders/getDetailOrder', accessTokenValidator(), isAdminValidator, getDetailDetailController)
adminRouter.post('/orders/updateOrderStatus', accessTokenValidator(), isAdminValidator, updateOrderStatusController)

export default adminRouter
