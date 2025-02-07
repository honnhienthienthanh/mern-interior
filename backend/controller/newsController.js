import newsModel from '../models/newsModel.js'
import uploadImages from '../helpers/uploadImages.js'

async function addNews(req, res) {
    try {
        console.log('-----------------------------------------------\n\
            Bắt đầu xử lý yêu cầu thêm mới tin tức..\n\
            -----------------------------------------------\n\
        ')

        const {
            newsTitle,
            newsSumary,
            newsContent,
            newsLink
        } = req.body

        const newsImage = req.files

        const finalImages = await uploadImages(newsImage)

        const newNews = new newsModel({
            newsTitle,
            newsSumary,
            newsContent,
            newsLink,
            newsImage: finalImages,
            author: req.userId
        })

        const finishAddNew = await newNews.save()

        res.status(201).json({
            data: finishAddNew,
            message: 'Đã thêm tin tức mới thành công!',
            success: true,
            error: false
        })

        console.log('-----------------------\n \
            Đã thêm tin tức mới thành công! \n \
            --------------------------------\n \
        ')
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

export { addNews }