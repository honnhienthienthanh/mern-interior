import contactModel from '../models/contactModel.js'

async function contactReceive(req, res) {
    try {
        const {
            contact1stName, contactLastName, contactEmail,
            contactPhone, contactIssue, contactMessage
        } = req.body

        if(!contact1stName) {
            throw new Error('Vui lòng nhập họ và đệm!')
        }

        if(!contactLastName) {
            throw new Error('Vui lòng nhập tên!')
        }

        if(!contactEmail) {
            throw new Error('Vui lòng nhập email!')
        }

        if(!contactPhone) {
            throw new Error('Vui lòng nhập số điện thoại!')
        }

        if(!contactIssue) {
            throw new Error('Vui lòng chọn vấn đề cần liên hệ!')
        }

        if(!contactMessage) {
            throw new Error('Vui lòng nhập lời nhắn!')
        }

        const newContact = new contactModel({
            contact1stName, contactLastName, contactEmail,
            contactPhone, contactIssue, contactMessage
        })

        const saveContact = await newContact.save()

        res.status(201).json({
            data: saveContact,
            message: 'Gửi lời nhắn thành công!',
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

export default contactReceive