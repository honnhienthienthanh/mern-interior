import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectToDatabase from './config/database.js'
import router from './routes/router.js'
import adminRouter from './routes/adminRouter.js'
import { fileURLToPath } from 'url'
import path from 'path'
import connectCloudinary from './config/cloudinary.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api', router)
app.use('/api', adminRouter)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use('/uploads', express.static(__dirname + '/uploads'))

const PORT = process.env.PORT || 8080

connectToDatabase().then(() => {
    console.log('Connected to Database!')
    connectCloudinary()
    console.log('Connected to Cloudinary!')
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}!`)
    })
})