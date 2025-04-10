import { StatusCodes } from 'http-status-codes'
import { getAllProducts, getProductById } from '../services/products.services'

export const getAllProductsController = async (req, res) => {
  const { products } = await getAllProducts(req.query)

  if (!products.length) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'success',
      message: 'Chưa có sản phẩm nào trong cơ sở dữ liệu'
    })
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      products
    }
  })
}

export const getProductController = async (req, res) => {
  const { product } = await getProductById(req.params)

  if (!product) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'success',
      message: 'Sản phẩm không tồn tại'
    })
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      product
    }
  })
}
