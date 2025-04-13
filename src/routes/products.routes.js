import { Router } from 'express'
import { getAllProductsController, getProductController } from '../controllers/products.controllers'
import { pagingValidator } from '../middlewares/paging.middlewares'
import { getAllProductsValidator, getProductValidator } from '../middlewares/products.middlewares'
const productsRouter = Router()

productsRouter.get('/', getAllProductsValidator, pagingValidator, getAllProductsController)
productsRouter.get('/:product_id', getProductValidator, getProductController)

export default productsRouter
