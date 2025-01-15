const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectToDatabase = require('./config/database')
const router = require('./routes/router')
const adminRouter = require('./routes/adminRouter')

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api', router)
app.use('/api', adminRouter)
app.use('/uploads', express.static(__dirname + '/uploads'))

const PORT = process.env.PORT || 8080

connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log('Connected to database!')
        console.log('Server is running!')
    })
})