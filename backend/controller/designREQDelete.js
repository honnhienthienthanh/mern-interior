const designModel = require('../models/designModel')

async function designREQDelete(req, res) {
    try {
        const { _id } = req.body

        const delDesignREQ = await designModel.findByIdAndDelete(_id)

        if(delDesignREQ) {
            res.status(200).json({
                message: 'Xóa yêu cầu thiết kế thành công!',
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

module.exports = designREQDelete