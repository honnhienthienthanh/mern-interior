const designModel = require('../models/designModel')

async function designREQ(req, res) {
    try {
        const {
            customerName,
            customerPhone,
            customerEmail,
            customerArea,
            customerFloor,
            customerAddress,
            customerAdvisory,
            customerRequest
        } = req.body

        switch(true) {
            case !customerName:
                throw new Error('Vui lòng cung cấp họ và tên!')
            case !customerPhone:
                throw new Error('Vui lòng cung cấp số điện thoại!')
            case !customerEmail:
                throw new Error('Vui lòng cung cấp địa chỉ email!')
            case !customerArea:
                throw new Error('Vui lòng cung cấp diện tích thi công!')
            case !customerFloor:
                throw new Error('Vui lòng cung cấp số tầng thi công!')
            case !customerAddress:
                throw new Error('Vui lòng cung cấp địa chỉ thi công!')
            case !customerAdvisory:
                throw new Error('Vui lòng cung cấp mục cần tư vấn!')
            default:
                break
        }

        const designData = new designModel({
            customerName,
            customerPhone,
            customerEmail,
            customerArea,
            customerFloor,
            customerAddress,
            customerAdvisory,
            customerRequest
        })

        const save = await designData.save()

        res.status(201).json({
            data: save,
            message: 'Gửi yêu cầu thiết kế thành công!',
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

module.exports = designREQ