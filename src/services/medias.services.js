import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { env } from '../configs/database/connect'
import { getNameFromFullname, handleUploadImage, UPLOAD_IMAGE_DIR } from '../utils/file.utils'

export const uploadImage = async (req) => {
  const files = await handleUploadImage(req)

  const results = await Promise.all(
    files.map(async (file) => {
      const newName = getNameFromFullname(file.newFilename)
      const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
      await sharp(file.filepath).withMetadata().jpeg({ quality: 60 }).toFile(newPath)
      await fs.unlink(file.filepath)
      return {
        url:
          env === 'production'
            ? `${process.env.HOST}/static/image/${newName}.jpg`
            : `http://localhost:${process.env.PORT}/api/v1/static/image/${newName}.jpg`,
        type: 'image'
      }
    })
  )
  return results
}
