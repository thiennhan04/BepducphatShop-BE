import cors from 'cors'
import express from 'express'
import { connectDB } from './configs/database/connect'
import initRoutes from './routes'
import { initFolder } from './utils/file.utils'
const app = express()

app.use(cors())
app.use(express.json())
initFolder()
initRoutes(app)

const port = process.env.PORT || 5555
const start = async () => {
  try {
    await connectDB()
    app.listen(port, () => console.log(`Server is running on port ${port}...`))
  } catch (err) {}
}
start()
