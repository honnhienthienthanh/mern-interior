import contactModel from '../models/contactModel.js'

async function contactGetAll(req, res) {
    try {
        const contactList = contactModel.find()

        res.status(201).json({
            data: contactList,
            message: 'Danh sách các lời nhắn từ khách hàng',
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

export default contactGetAll