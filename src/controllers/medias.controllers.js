import { StatusCodes } from 'http-status-codes'
import path from 'path'
import { uploadImage } from '../services/medias.services'
import { UPLOAD_IMAGE_DIR } from '../utils/file.utils'

export const serveImageController = (req, res) => {
  const { name } = req.params

  res.status(StatusCodes.OK).sendFile(path.resolve(UPLOAD_IMAGE_DIR, name), (error) => {
    if (error) {
      res.status(error.status).send('Not found')
    }
  })
}

export const uploadImageController = async (req, res) => {
  const images = await uploadImage(req)

  res.status(StatusCodes.OK).json({
    message: 'Upload image successfully',
    data: {
      images
    }
  })
}
