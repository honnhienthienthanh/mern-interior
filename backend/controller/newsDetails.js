import newsModel from "../models/newsModel.js"


async function newsDetails(req, res) {
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

export default newsDetails