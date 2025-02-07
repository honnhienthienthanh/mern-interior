import fs from 'fs'
import newsModel from '../models/newsModel.js'

async function newsUpload(req, res) {
    try {
        const { originalname, path } = req.file
        fs.renameSync(path, 'uploads/' + Date.now() + originalname)
        const { newsTitle, newsSumary, newsContent, newsLink} = req.body
        const news = new newsModel({
            newsTitle,
            newsSumary,
            newsContent,
            newsLink,
            newsImage: Date.now() + originalname,
            author: req.userId
        })
        const saveNews = await news.save()
        res.json(saveNews)
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

export default newsUpload