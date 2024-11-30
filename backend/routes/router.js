const express = require('express')
const multer = require('multer')

const router = express.Router()
const uploadImage = multer({
    dest: 'uploads/',
    limits: 20 * 1024 * 1024
})

const userRegisterCtr = require('../controller/userRegisterCtr')
const userLoginCtr = require('../controller/userLoginCtr')
const authLogin = require('../middleware/authLogin')
const userDetailsCtr = require('../controller/userDetailsCtr')
const userLogoutCtr = require('../controller/userLogoutCtr')
const getAllUsers = require('../controller/usersGetAll')
const updateUserRole = require('../controller/userUpdateRole')
const projectUploadCtr = require('../controller/projectUploadCtr')
const projectGetAll = require('../controller/projectGetAll')
const projectUpdateCtr = require('../controller/projectUpdateCtr')
const projectByCategory = require('../controller/projectByCategory')
const projectDetails = require('../controller/projectDetails')
const newsUpload = require('../controller/newsUpload')
const newsGetAll = require('../controller/newsGetAll')
const newsDetails = require('../controller/newsDetails')

router.post('/register', userRegisterCtr)
router.post('/login', userLoginCtr)
router.get('/user-details', authLogin, userDetailsCtr)
router.get('/logout', userLogoutCtr)

// Admin User
router.get('/get-all-users', authLogin, getAllUsers)
router.post('/update-user-role', authLogin, updateUserRole)

// Admin Project
router.post('/project-upload', authLogin, projectUploadCtr)
router.get('/all-projects', projectGetAll)
router.post('/project-update', authLogin, projectUpdateCtr)

// Project
router.post('/projects-by-category', projectByCategory)
router.post('/project-details', projectDetails)

// News
router.post('/upload-news', authLogin, uploadImage.single('newsImage'), newsUpload)
router.get('/get-all-news', newsGetAll)
router.post('/news-details', newsDetails)

module.exports = router