const designModel = require('../models/designModel')

async function designREQGet(req, res) {
    try {
        const allDesignREQ = await designModel.find().sort({ createdAt: -1 })

        res.status(200).json({
            data: allDesignREQ,
            messsage: 'Lấy dữ liệu yêu cầu thiết kế thành công!',
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

module.exports = designREQGet