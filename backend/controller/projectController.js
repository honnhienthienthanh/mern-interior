import { v2 as cloudinary } from 'cloudinary'
import projectModel from '../models/projectModel.js'
import uploadImages from '../helpers/uploadImages.js'

// Add new Project
async function addProject(req, res) {
    try {
        console.log('-----------------------------------------------\n\
            Bắt đầu xử lý yêu cầu thêm mới dự án..\n\
            -----------------------------------------------\n\
        ')

        const {
            projectName, category, customer, floorArea,
            numberOfFloors, projectAddress, projectUri
        } = req.body

        const projectImages =  req.files

        const finalImages = await uploadImages(projectImages)

        const newProject = new projectModel({
            projectName, category, customer, floorArea,
            numberOfFloors, projectAddress, projectUri,
            projectImages: finalImages
        })

        const finishAddNew = await newProject.save()

        res.status(201).json({
            data: finishAddNew,
            message: 'Đã thêm dự án mới thành công!',
            success: true,
            error: false
        })

        console.log('-----------------------------------------------\n \
            Dự án đã thêm mới thành công! \n \
            -----------------------------------------------\n \
        ')
    } catch(err) {
        console.log(err.message)
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

// Update Project
async function updateProject(req, res) {
    try {} catch(err) {
        console.log(err.message)
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

export { addProject }