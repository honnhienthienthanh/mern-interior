const newsModel = require('../models/newsModel')

async function newsDelete(req, res) {
    try {
        const { _id } = req.body

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
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

module.exports = newsDelete