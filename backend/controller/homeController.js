import sliderModel from '../models/sliderModel.js'
import uploadImages from '../helpers/uploadImages.js'
import deleteImages from '../helpers/deleteImages.js'
import userPermission from '../helpers/permission.js'

// Add new Slide
async function addSlide(req, res) {
    try {
        if(!userPermission(req.userId)) {
            throw new Error('Permission denied!')
        }

        const { slideAuthor, slideTitle, slideCategory, slideDescription } = req.body

        const slideImage = req.files

        const filnalImage = await uploadImages(slideImage)

        const newSlide = new sliderModel({
            slideAuthor,
            slideTitle,
            slideCategory,
            slideImage: filnalImage,
            slideDescription
        })

        const saveSlide = await newSlide.save()
        res.status(201).json({
            data: saveSlide,
            message: 'Đã thêm slide mới thành công!',
            success: true,
            error: false
        })
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: true,
            error: false
        })
    }
}

// Listing
async function listSlide(req, res) {
    try {
        const allSlide = await sliderModel.find().sort({ createdAt: -1 })

        if(allSlide) {
            res.status(201).json({
                data: allSlide,
                message: 'Here are all Slide!',
                success: true,
                error: false
            })
        } else {
            res.status(201).json({
                message: 'Slide list empty!',
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

// Update Slide
async function updateSlide(req, res) {
    try {
        if(!userPermission(req.userId)) {
            throw new Error('Permission denied!')
        }
        
        const { _id, slideAuthor, slideTitle, slideCategory, slideDescription } = req.body
        const slideImage = JSON.parse(req.body.slideImage)
        
        let replaceImage = req.files
        
        let newSlideImage = []
        let payload
        
        if(replaceImage.length > 0) {
            newSlideImage = await uploadImages(replaceImage)
            const slide = await sliderModel.findById(_id)
            if(slide.slideImage[0].public_id) {
                await deleteImages(slide.slideImage[0].public_id)
            }
            payload = {
                ...(slideAuthor && { slideAuthor: slideAuthor }),
                ...(slideTitle && { slideTitle: slideTitle }),
                ...(slideCategory && { slideCategory: slideCategory}),
                ...(slideDescription && { slideDescription: slideDescription }),
                ...(newSlideImage && { slideImage: newSlideImage })
            }
        } else {
            payload = {
                ...(slideAuthor && { slideAuthor: slideAuthor }),
                ...(slideTitle && { slideTitle: slideTitle }),
                ...(slideCategory && { slideCategory: slideCategory}),
                ...(slideDescription && { slideDescription: slideDescription }),
                ...(slideImage && { slideImage: slideImage })
            }
        }

        const updateNews = await sliderModel.findByIdAndUpdate(_id, payload)

        res.status(201).json({
            data: updateNews,
            message: 'Cập nhật Slide thành công!',
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

// Delete SLide
async function deleteSlide(req, res) {
    
    try {
        if(!userPermission(req.userId)) {
            throw new Error('Permission denied!')
        }

        const { _id } = req.body

        const slide = await sliderModel.findById(_id)

        if(slide) {
            const imagesLink = slide?.slideImage.map(image => {
                return image.public_id
            })
            await deleteImages(imagesLink)
        }

        const delSlide = await sliderModel.findByIdAndDelete(_id)

        if(delSlide) {
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

export {addSlide, listSlide, updateSlide, deleteSlide}