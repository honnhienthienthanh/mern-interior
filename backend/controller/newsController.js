import newsModel from '../models/newsModel.js'
import uploadImages from '../helpers/uploadImages.js'
import deleteImages from '../helpers/deleteImages.js'
import userPermission from '../helpers/permission.js'

// Add News
async function addNews(req, res) {
    try {
        if(!userPermission(req.userId)) {
            throw new Error('Permission denied!')
        }

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
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

// Listing
async function listNewsV1(req, res) {
    try {
        const allNews = await newsModel.find()
            .populate('author', 'name')
            .sort({createdAt: -1})

        if(allNews) {
            res.status(200).json({
                data: allNews,
                message: 'Get news data successfully!',
                success: true,
                error: false
            })
        } else {
            res.status(400).json({
                message: 'Data is empty or something went wrong!',
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


async function listNewsV2(req, res) {
    try {
        const { page = 1 } = req.body
        const limit = 12
        const skip = (page - 1) * limit

        const allNews = await newsModel.find()
            .populate('author', 'name')
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
        const total = await newsModel.countDocuments()

        if(allNews) {
            res.status(200).json({
                data: allNews,
                page: page,
                pages: Math.ceil(total / limit),
                message: 'Danh sách tin tức!',
                success: true,
                error: false
            })
        } else {
            res.status(400).json({
                message: 'Dữ liệu trống hoặc đã có lỗi!',
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

// News Details
async function oneNews(req, res) {
    try {
        const { newsLink } = req.body

        const news = await newsModel.find({ newsLink }).populate('author', ['name'])

        if(news.length > 0) {
            res.status(200).json({
                data: news,
                message: 'Get news successfully!',
                success: true,
                error: false
            })
        } else {
            res.status(201).json({
                message: 'News not found!',
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

// Update News
async function updateNews(req, res) {
    try {
        if(!userPermission(req.userId)) {
            throw new Error('Permission denied!')
        }
        
        const { _id, newsTitle, newsSumary, newsContent, newsLink } = req.body
        const newsImage = JSON.parse(req.body.newsImage)
        
        let replaceImage = req.files
        
        let newNewsImage = []
        let payload
        
        if(replaceImage.length > 0) {
            newNewsImage = await uploadImages(replaceImage)
            const news = await newsModel.findById(_id)
            if(news.newsImage[0].public_id) {
                await deleteImages(news.newsImage[0].public_id)
            }
            payload = {
                ...(newsTitle && { newsTitle: newsTitle }),
                ...(newsSumary && { newsSumary: newsSumary }),
                ...(newsContent && { newsContent: newsContent}),
                ...(newsLink && { newsLink: newsLink }),
                ...(newNewsImage && { newsImage: newNewsImage })
            }
        } else {
            payload = {
                ...(newsTitle && { newsTitle: newsTitle }),
                ...(newsSumary && { newsSumary: newsSumary }),
                ...(newsContent && { newsContent: newsContent}),
                ...(newsLink && { newsLink: newsLink }),
                ...(newsImage && { newsImage: newsImage })
            }
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

// Delete News
async function deleteNews(req, res) {
    try {
        if(!userPermission(req.userId)) {
            throw new Error('Permission denied!')
        }
        
        const { _id } = req.body

        const news = await newsModel.findById(_id)

        if(news) {
            await deleteImages(news.newsImage[0].public_id)

            const delNews = await newsModel.findByIdAndDelete(_id)
    
            if(delNews) {
                res.status(200).json({
                    message: 'Đã xóa tin tức thành công!',
                    success: true,
                    error: false
                })
            } else {
                throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại!')
            }
        }
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

export { addNews, listNewsV1, listNewsV2, oneNews, updateNews, deleteNews }