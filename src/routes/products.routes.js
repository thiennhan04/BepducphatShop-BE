import { Router } from 'express'
import { getAllProductsController } from '../controllers/products.controllers'
import { pagingValidator } from '../middlewares/paging.middlewares'
import { getAllProductsValidator } from '../middlewares/products.middlewares'
const productsRouter = Router()

productsRouter.get('/', getAllProductsValidator, pagingValidator, getAllProductsController)

export default productsRouter
