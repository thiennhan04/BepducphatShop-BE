import { errorHandler, notFoundHandler } from '../middlewares/error.middlewares'
import productsRouter from './products.routes'

export default function initRoutes(app) {
  app.use('/api/v1/products', productsRouter)

  app.use(errorHandler)
  app.use(notFoundHandler)
}
