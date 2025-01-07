const fs = require('fs')
const sliderModel = require('../models/sliderModel')

async function homeSlideUpload(req, res) {
    try {
        const { originalname, path } = req.file
        fs.renameSync(path, 'uploads/' + originalname)

        const { slideAuthor, slideTitle, slideCategory, slideDescription } = req.body
        const newSlide = new sliderModel({
            slideAuthor,
            slideTitle,
            slideCategory,
            slideImage: 'uploads/' + originalname,
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

module.exports = homeSlideUpload