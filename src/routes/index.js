import { errorHandler, notFoundHandler } from '../middlewares/error.middlewares'
import adminRouter from './admin.routes'
import authRouter from './auth.routes'
import cartRouter from './cart.routes'
import mediasRouter from './medias.routes'
import productsRouter from './products.routes'
import staticRouter from './static.routes'

export default function initRoutes(app) {
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/products', productsRouter)
  app.use('/api/v1/medias', mediasRouter)
  app.use('/api/v1/static', staticRouter)
  app.use('/api/v1/cart', cartRouter)
  app.use('/api/v1/admin', adminRouter)

  app.use(errorHandler)
  app.use(notFoundHandler)
}
