import express from 'express'

const router = express.Router()

import userRegisterCtr from '../controller/userRegisterCtr.js'
import userLoginCtr from '../controller/userLoginCtr.js'
import authLogin from '../middleware/authLogin.js'
import userDetailsCtr from '../controller/userDetailsCtr.js'
import userLogoutCtr from '../controller/userLogoutCtr.js'
import designREQ from '../controller/designREQ.js'
import { listProjects, oneProject } from '../controller/projectController.js'
import { listNews, oneNews } from '../controller/newsController.js'
import { listCareers, oneCareer } from '../controller/careersControler.js'
import { listSlide } from '../controller/homeController.js'
import { addContact, subscribeEmail } from '../controller/contactController.js'

// User
router.post('/register', userRegisterCtr)
router.post('/login', userLoginCtr)
router.get('/user-details', authLogin, userDetailsCtr)
router.get('/logout', userLogoutCtr)

// Project
router.get('/list-projects', listProjects)
router.post('/details-project', oneProject)

// News
router.get('/get-all-news', listNews)
router.post('/news-details', oneNews)

// Careers
router.get('/get-all-careers', listCareers)
router.post('/careers-details', oneCareer)

// Design REQ
router.post('/design-req', designREQ)

// Home
router.get('/get-slide', listSlide)

// Contact
router.post('/add-contact', addContact)
router.post('/send-subscribe', subscribeEmail)

export default router