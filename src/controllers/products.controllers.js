import { StatusCodes } from 'http-status-codes'
import { getAllProducts } from '../services/products.services'

export const getAllProductsController = async (req, res) => {
  const { products } = await getAllProducts(req.query)

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      products
    }
  })
}
