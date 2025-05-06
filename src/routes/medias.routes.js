import { Router } from 'express'
import { uploadImageController } from '../controllers/medias.controllers'
import { asyncHandler } from '../utils/asyncHandler.utils'
const mediasRouter = Router()

mediasRouter.post('/upload-image', asyncHandler(uploadImageController))

export default mediasRouter
