const fs = require('fs')
const careersModel = require('../models/careersModel')
const userPermission = require('../helpers/permission')

async function careersEdit(req, res) {
    try {
        if(!userPermission(req.userId)) {
            throw new Error('Permission denied!')
        }
        
        const { _id, careersTitle, careersSumary, careersContent, careersLink, careersImage } = req.body
        
        let isImage = req.file
        
        let newCareersImage
        
        if(!isImage) {
            newCareersImage = careersImage + ''
        } else {
            const { originalname, path } = req.file
            newCareersImage = Date.now() + '-' + originalname
            fs.renameSync(path,  'uploads/' + newCareersImage)
        }

        const payload = {
            ...(careersTitle && { careersTitle: careersTitle }),
            ...(careersSumary && { careersSumary: careersSumary }),
            ...(careersContent && { careersContent: careersContent}),
            ...(careersLink && { careersLink: careersLink }),
            ...(newCareersImage && { careersImage: newCareersImage })
        }

        const updateCareers = await careersModel.findByIdAndUpdate(_id, payload)

        res.status(201).json({
            data: updateCareers,
            message: 'Careers update successfully!',
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

module.exports = careersEdit