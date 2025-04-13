import { errorHandler, notFoundHandler } from '../middlewares/error.middlewares'
import testRouter from './test.routes'

export default function initRoutes(app) {
  app.use('/api/v1/test', testRouter)

  app.use(errorHandler)
  app.use(notFoundHandler)
}
