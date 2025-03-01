import nodemailer from 'nodemailer'

// Add new Contact Message
async function addContact(req, res) {
    try {
        const { contactfullName, contactEmail, contactPhone, contactMessage } = req.body

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        let mailOptions = {
            from: contactEmail,
            to: process.env.EMAIL_GOAL,
            subject: `Lời nhắn từ khách hàng ${contactEmail}`,
            text: `Họ tên: ${contactfullName}\nSố điện thoại: ${contactPhone}\nLời nhắn: ${contactMessage}`
        }

        const sendResult = await transporter.sendMail(mailOptions)

        res.status(201).json({
            data: sendResult,
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

// Subscribe Email
async function subscribeEmail(req, res) {
    try {
        const { scEmail } = req.body

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        let mailOptions = {
            from: scEmail,
            to: process.env.EMAIL_GOAL,
            subject: `Đăng ký email từ ${scEmail}`,
            text: `Email: ${scEmail}`
        }

        const sendResult = await transporter.sendMail(mailOptions)

        res.status(201).json({
            data: sendResult,
            message: 'Đăng ký thành công!',
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

export { addContact, subscribeEmail }