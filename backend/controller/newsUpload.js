const fs = require('fs')
const jwt = require('jsonwebtoken')
const newsModel = require('../models/newsModel')

async function newsUpload(req, res) {
    try {
        const { originalname, path } = req.file
        fs.renameSync(path, 'uploads/' + originalname)
        const { newsTitle, newsSumary, newsContent, newsLink} = req.body
        const news = new newsModel({
            newsTitle,
            newsSumary,
            newsContent,
            newsLink,
            newsImage: 'uploads/' + originalname,
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

module.exports = newsUpload