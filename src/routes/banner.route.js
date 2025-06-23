import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler.utils'
import { handleGetBannerByCategory, handleGetBannerByBrand } from '../controllers/products.controllers'

const bannerRouter = Router()

bannerRouter.get('/category', asyncHandler(handleGetBannerByCategory))
bannerRouter.get('/brand', asyncHandler(handleGetBannerByBrand))

export default bannerRouter
