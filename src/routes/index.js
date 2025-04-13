import { errorHandler, notFoundHandler } from '../middlewares/error.middlewares'
import authRouter from './auth.routes'
import productsRouter from './products.routes'

export default function initRoutes(app) {
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/products', productsRouter)

  app.use(errorHandler)
  app.use(notFoundHandler)
}
