const express = require('express')
const authLogin = require('../middleware/authLogin')
const getAllUsers = require('../controller/usersGetAll')
const updateUserRole = require('../controller/userUpdateRole')
const projectUploadCtr = require('../controller/projectUploadCtr')
const projectUpdateCtr = require('../controller/projectUpdateCtr')
const newsUpload = require('../controller/newsUpload')
const careersUpload = require('../controller/careersUpload')

const multer = require('multer')
const isAdmin = require('../controller/isAdmin')
const careersEdit = require('../controller/careersEdit')
const newsUpdate = require('../controller/newsUpdate')
const homeSlideUpload = require('../controller/homeSlideUpload')
const uploadImage = multer({
    dest: 'uploads/',
    limits: 20 * 1024 * 1024
})

const adminRouter = express.Router()

adminRouter.get('/is-admin', authLogin, isAdmin)

// Admin User
adminRouter.get('/get-all-users', authLogin, getAllUsers)
adminRouter.post('/update-user-role', authLogin, updateUserRole)

// Admin Project
adminRouter.post('/project-upload', authLogin, projectUploadCtr)
adminRouter.post('/project-update', authLogin, projectUpdateCtr)

// News
adminRouter.post('/upload-news', authLogin, uploadImage.single('newsImage'), newsUpload)
adminRouter.post('/update-news', authLogin, uploadImage.single('newsImage'), newsUpdate)

// Careers
adminRouter.post('/upload-careers', authLogin, uploadImage.single('careersImage'), careersUpload)
adminRouter.post('/update-careers', authLogin, uploadImage.single('careersImage'), careersEdit)

// Home
adminRouter.post('/upload-slide', uploadImage.single('slideImage'), homeSlideUpload)

module.exports = adminRouter