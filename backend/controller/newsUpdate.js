import fs from 'fs'
import newsModel from '../models/newsModel.js'
import userPermission from '../helpers/permission.js'

async function newsUpdate(req, res) {
    try {
        if(!userPermission(req.userId)) {
            throw new Error('Permission denied!')
        }
        
        const { _id, newsTitle, newsSumary, newsContent, newsLink, newsImage } = req.body
        
        let isImage = req.file
        
        let newNewsImage
        
        if(!isImage) {
            newNewsImage = newsImage + ''
        } else {
            const { originalname, path } = req.file
            newNewsImage = Date.now() + '-' + originalname
            fs.renameSync(path,  'uploads/' + newNewsImage)
        }

        const payload = {
            ...(newsTitle && { newsTitle: newsTitle }),
            ...(newsSumary && { newsSumary: newsSumary }),
            ...(newsContent && { newsContent: newsContent}),
            ...(newsLink && { newsLink: newsLink }),
            ...(newNewsImage && { newsImage: newNewsImage })
        }

        const updateNews = await newsModel.findByIdAndUpdate(_id, payload)

        res.status(201).json({
            data: updateNews,
            message: 'News update successfully!',
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

export default newsUpdate