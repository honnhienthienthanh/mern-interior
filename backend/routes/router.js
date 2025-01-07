const express = require('express')

const router = express.Router()

const userRegisterCtr = require('../controller/userRegisterCtr')
const userLoginCtr = require('../controller/userLoginCtr')
const authLogin = require('../middleware/authLogin')
const userDetailsCtr = require('../controller/userDetailsCtr')
const userLogoutCtr = require('../controller/userLogoutCtr')
const projectGetAll = require('../controller/projectGetAll')
const projectByCategory = require('../controller/projectByCategory')
const projectDetails = require('../controller/projectDetails')
const newsGetAll = require('../controller/newsGetAll')
const newsDetails = require('../controller/newsDetails')
const careersGetAll = require('../controller/careersGetAll')
const careersDetails = require('../controller/careersDetails')
const contactReceive = require('../controller/contactReceive')
const designREQ = require('../controller/designREQ')
const homeGetSlide = require('../controller/homeGetSlide')

// User
router.post('/register', userRegisterCtr)
router.post('/login', userLoginCtr)
router.get('/user-details', authLogin, userDetailsCtr)
router.get('/logout', userLogoutCtr)

// Project
router.get('/all-projects', projectGetAll)
router.post('/projects-by-category', projectByCategory)
router.post('/project-details', projectDetails)

// News
router.get('/get-all-news', newsGetAll)
router.post('/news-details', newsDetails)

// Careers
router.get('/get-all-careers', careersGetAll)
router.post('/careers-details', careersDetails)

// Contact
router.post('/post-contact', contactReceive)

// Design REQ
router.post('/design-req', designREQ)

// Home
router.get('/get-slide', homeGetSlide)

module.exports = router