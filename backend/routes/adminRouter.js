import express from 'express'
import authLogin from '../middleware/authLogin.js'
import getAllUsers from '../controller/usersGetAll.js'
import updateUserRole from '../controller/userUpdateRole.js'

import multer from 'multer'
import isAdmin from '../controller/isAdmin.js'
import designREQGet from '../controller/designREQGet.js'
import designREQDelete from '../controller/designREQDelete.js'
import upload from '../middleware/multer.js'
import { addProject, removeProject, updateProject } from '../controller/projectController.js'
import { addNews, deleteNews, updateNews } from '../controller/newsController.js'
import { addCareer, deleteCareer, updateCareer } from '../controller/careersControler.js'
import { addSlide, deleteSlide, updateSlide } from '../controller/homeController.js'
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
adminRouter.post('/add-new-project', authLogin, upload.array('projectImages'), addProject)
adminRouter.post('/update-project', authLogin, upload.array('newImages'), updateProject)
adminRouter.post('/remove-project', authLogin, removeProject)

// News
adminRouter.post('/add-new-news', authLogin, upload.array('newsImage'), addNews)
adminRouter.post('/update-news', authLogin, upload.array('replaceImage'), updateNews)
adminRouter.post('/delete-news', authLogin, deleteNews)

// Careers
adminRouter.post('/upload-careers', authLogin, upload.array('careersImage'), addCareer)
adminRouter.post('/update-careers', authLogin, upload.array('replaceImage'), updateCareer)
adminRouter.post('/delete-career', authLogin, deleteCareer)

// Home
adminRouter.post('/upload-slide', authLogin, upload.array('slideImage'), addSlide)
adminRouter.post('/slide-update', authLogin, upload.array('replaceImage'), updateSlide)
adminRouter.post('/slide-delete', authLogin, deleteSlide)

// Design REQ
adminRouter.get('/get-design-req', authLogin, designREQGet)
adminRouter.post('/delete-design-req', authLogin, designREQDelete)

export default adminRouter