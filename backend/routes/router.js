import express from 'express'

const router = express.Router()

import userRegisterCtr from '../controller/userRegisterCtr.js'
import userLoginCtr from '../controller/userLoginCtr.js'
import authLogin from '../middleware/authLogin.js'
import userDetailsCtr from '../controller/userDetailsCtr.js'
import userLogoutCtr from '../controller/userLogoutCtr.js'
import projectGetAll from '../controller/projectGetAll.js'
import projectByCategory from '../controller/projectByCategory.js'
import projectDetails from '../controller/projectDetails.js'
import newsGetAll from '../controller/newsGetAll.js'
import newsDetails from '../controller/newsDetails.js'
import careersGetAll from '../controller/careersGetAll.js'
import careersDetails from '../controller/careersDetails.js'
import contactReceive from '../controller/contactReceive.js'
import designREQ from '../controller/designREQ.js'
import homeGetSlide from '../controller/homeGetSlide.js'

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

export default router