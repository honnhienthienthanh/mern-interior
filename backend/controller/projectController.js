import { v2 as cloudinary } from 'cloudinary'
import projectModel from '../models/projectModel.js'
import uploadImages from '../helpers/uploadImages.js'
import userPermission from '../helpers/permission.js'
import deleteImages from '../helpers/deleteImages.js'

// Add new Project
async function addProject(req, res) {
    try {
        if(!userPermission(req.userId)) {
            throw new Error('Permission denied!')
        }

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
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

// Listing
async function listProjects(req, res) {
    try {
        const list = await projectModel.find().sort({ createdAt: -1 })

        res.status(200).json({
            data: list,
            message: 'Danh sách các dự án!',
            success: true,
            eror: false
        })
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

// Details
async function oneProject(req, res) {
    try {
        const { projectUri } = req.body

        const project = await projectModel.find({ projectUri: projectUri })

        res.status(200).json({
            data: project,
            message: 'Chi tiết dự án',
            success: true,
            error: false
        })
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

// Update Project
async function updateProject(req, res) {
    try {
        if(!userPermission(req.userId)) {
            throw new Error('Permission denied!')
        }

        const {
            _id, projectName, category, customer,
            floorArea, numberOfFloors, projectAddress,
            projectUri, publicId
        } = req.body

        const projectImages = JSON.parse(req.body.projectImages)

        const newImages = req.files

        let addNewImages
        let newArray = []

        if(newImages.length > 0) {
            addNewImages = await uploadImages(newImages)
            newArray = [...projectImages, ...addNewImages]
        } else {
            newArray = [...projectImages]
        }

        console.log('New Array: ', newArray)

        if(publicId) {
            await deleteImages(publicId)
        }

        const payload = {
            ...( projectName && { projectName: projectName }),
            ...( category && { category: category }),
            ...( customer && { customer: customer }),
            ...( floorArea && { floorArea: floorArea }),
            ...( numberOfFloors && { numberOfFloors: numberOfFloors }),
            ...( projectAddress && { projectAddress: projectAddress }),
            ...( newArray && { projectImages: newArray }),
            ...( projectUri && { projectUri: projectUri })
        }

        const updateProject = await projectModel.findByIdAndUpdate(_id, payload)

        res.status(201).json({
            data: updateProject,
            message: 'Project update successfully!',
            success: true,
            error: false
        })
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

// Remove Project
async function removeProject(req, res) {
    try {
        if(!userPermission(req.userId)) {
            throw new Error('Permission denied!')
        }

        const { _id } = req.body

        const project = await projectModel.findById(_id)

        if(project) {
            const imagesLink = project?.projectImages.map(image => {
                return image.public_id
            })
            await deleteImages(imagesLink)
        }

        const delProject = await projectModel.findByIdAndDelete(_id)

        if(delProject) {
            res.status(201).json({
                message: 'Dự án đã được xóa!',
                success: true,
                error: false
            })
        }
    } catch(err) {
        res.status(201).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

export { addProject, listProjects, oneProject, updateProject, removeProject }