const newsModel = require("../models/newsModel")


async function newsGetAll(req, res) {
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

module.exports = newsGetAll