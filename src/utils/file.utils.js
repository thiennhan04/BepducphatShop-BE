import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const UPLOAD_IMAGE_TEMP_DIR = path.resolve('uploads/images/temp')
export const UPLOAD_IMAGE_DIR = path.resolve('uploads/images')

export const initFolder = () => {
  const foldersInit = [UPLOAD_IMAGE_TEMP_DIR]
  foldersInit.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true
      })
    }
  })
}

export const handleUploadImage = (req) => {
  const form = formidable({
    maxFiles: 4,
    uploadDir: UPLOAD_IMAGE_TEMP_DIR,
    keepExtensions: true,
    maxFileSize: 1024 * 1024, // limit 1MB each file,
    maxTotalFileSize: 4 * 1024 * 1024, // total file size <= 4MB,
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error', new Error('File type is not allowed'))
      }
      return true
    }
  })
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      if (!Boolean(files.image)) {
        return reject(new Error('File is empty'))
      }
      resolve(files.image)
    })
  })
}

export const getNameFromFullname = (fullname) => {
  const list = fullname.split('.')
  list.pop()
  return list.join('.')
}
