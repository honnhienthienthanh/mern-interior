import express from 'express'
import authLogin from '../middleware/authLogin.js'
import getAllUsers from '../controller/usersGetAll.js'
import updateUserRole from '../controller/userUpdateRole.js'
// import projectUploadCtr from '../controller/projectUploadCtr.js'
import projectUpdateCtr from '../controller/projectUpdateCtr.js'
import newsUpload from '../controller/newsUpload.js'
import careersUpload from '../controller/careersUpload.js'

import multer from 'multer'
import isAdmin from '../controller/isAdmin.js'
import careersEdit from '../controller/careersEdit.js'
import newsUpdate from '../controller/newsUpdate.js'
import homeSlideUpload from '../controller/homeSlideUpload.js'
import designREQGet from '../controller/designREQGet.js'
import designREQDelete from '../controller/designREQDelete.js'
import projectDelete from '../controller/projectDelete.js'
import newsDelete from '../controller/newsDelete.js'
import upload from '../middleware/multer.js'
import { addProject } from '../controller/projectController.js'
import { addNews } from '../controller/newsController.js'
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
// adminRouter.post('/project-upload', authLogin, projectUploadCtr)
adminRouter.post('/project-update', authLogin, projectUpdateCtr)
adminRouter.post('/delete-project', authLogin, projectDelete)

// News
adminRouter.post('/add-new-news', authLogin, upload.array('newsImage'), addNews)
// adminRouter.post('/upload-news', authLogin, uploadImage.single('newsImage'), newsUpload)
adminRouter.post('/update-news', authLogin, uploadImage.single('newsImage'), newsUpdate)
adminRouter.post('/delete-news', authLogin, newsDelete)

// Careers
adminRouter.post('/upload-careers', authLogin, uploadImage.single('careersImage'), careersUpload)
adminRouter.post('/update-careers', authLogin, uploadImage.single('careersImage'), careersEdit)

// Home
adminRouter.post('/upload-slide', uploadImage.single('slideImage'), homeSlideUpload)

// Design REQ
adminRouter.get('/get-design-req', authLogin, designREQGet)
adminRouter.post('/delete-design-req', authLogin, designREQDelete)

export default adminRouter