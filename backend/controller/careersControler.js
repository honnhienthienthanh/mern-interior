import careersModel from '../models/careersModel.js'
import uploadImages from '../helpers/uploadImages.js'
import deleteImages from '../helpers/deleteImages.js'
import userPermission from '../helpers/permission.js'

// Add new Career
async function addCareer(req, res) {
    try {
        if(!userPermission(req.userId)) {
            throw new Error('Permission denied!')
        }

        const {
            careersTitle,
            careersSumary,
            careersContent,
            careersLink
        } = req.body

        const careersImage = req.files

        const finalImages = await uploadImages(careersImage)

        const careers = new careersModel({
            careersTitle,
            careersSumary,
            careersContent,
            careersLink,
            careersImage: finalImages,
            author: req.userId
        })

        const saveCareers = await careers.save()

        res.status(201).json({
            data: saveCareers,
            message: 'Đã thêm tin tức tuyển dụng thành công!',
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
async function listCareersV1(req, res) {
    try {
        const allCareers = await careersModel.find()
            .populate('author', 'name')
            .sort({createdAt: -1})

        if(allCareers) {
            res.status(200).json({
                data: allCareers,
                message: 'Get news data successfully!',
                success: true,
                error: false
            })
        } else {
            throw new Error('Data is empty or something went wrong!')
        }
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

async function listCareersV2(req, res) {
    try {
        const { page = 1 } = req.body
        const limit = 12
        const skip = (page - 1) * limit

        const allCareers = await careersModel.find()
            .populate('author', 'name')
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
        const total = await careersModel.countDocuments()

        if(allCareers) {
            res.status(200).json({
                data: allCareers,
                page: page,
                pages: Math.ceil(total / limit),
                message: 'Danh sách tin tức tuyển dụng!',
                success: true,
                error: false
            })
        } else {
            throw new Error('Data is empty or something went wrong!')
        }
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

// Details
async function oneCareer(req, res) {
    try {
        const { careersLink } = req.body

        const careers = await careersModel.find({ careersLink }).populate('author', ['name'])

        if(careers.length > 0) {
            res.status(200).json({
                data: careers,
                message: 'Get careers successfully!',
                success: true,
                error: false
            })
        } else {
            res.status(201).json({
                message: 'Careers not found!',
                success: false,
                error: true
            })
        }
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

// Update Career
async function updateCareer(req, res) {
    try {
        if(!userPermission(req.userId)) {
            throw new Error('Permission denied!')
        }
        
        const { _id, careersTitle, careersSumary, careersContent, careersLink } = req.body
        const careersImage = JSON.parse(req.body.careersImage)
        
        let replaceImage = req.files
        
        let newCareersImage = []
        let payload
        
        if(replaceImage.length > 0) {
            newCareersImage = await uploadImages(replaceImage)
            const career = await careersModel.findById(_id)
            if(career.careersImage[0].public_id) {
                await deleteImages(career.careersImage[0].public_id)
            }
            payload = {
                ...(careersTitle && { careersTitle: careersTitle }),
                ...(careersSumary && { careersSumary: careersSumary }),
                ...(careersContent && { careersContent: careersContent}),
                ...(careersLink && { careersLink: careersLink }),
                ...(newCareersImage && { careersImage: newCareersImage })
            }
        } else {
            payload = {
                ...(careersTitle && { careersTitle: careersTitle }),
                ...(careersSumary && { careersSumary: careersSumary }),
                ...(careersContent && { careersContent: careersContent}),
                ...(careersLink && { careersLink: careersLink }),
                ...(careersImage && { careersImage: careersImage })
            }
        }

        const updateCareers = await careersModel.findByIdAndUpdate(_id, payload)

        res.status(201).json({
            data: updateCareers,
            message: 'Cập nhật tin tức tuyển dụng thành công!',
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

// Delete Career
async function deleteCareer(req, res) {
    try {
        if(!userPermission(req.userId)) {
            throw new Error('Permission denied!')
        }

        const { _id } = req.body

        const career = await careersModel.findById(_id)

        if(career) {
            const imagesLink = career?.careersImage.map(image => {
                return image.public_id
            })
            await deleteImages(imagesLink)
        }

        const delCareer = await careersModel.findByIdAndDelete(_id)

        if(delCareer) {
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

export {addCareer, listCareersV1, listCareersV2, oneCareer, updateCareer, deleteCareer}