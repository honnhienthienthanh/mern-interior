const userModel = require('../models/userModel')

async function userDetailsCtr(req, res) {
    try {
        console.log('User Details - User Id:', req.userId)

        const user = await userModel.findById(req.userId)

        res.status(200).json({
            data: user,
            message: 'User Details!',
            success: true,
            error: false
        })

        console.log('User Details - User: ', user)
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

module.exports = userDetailsCtr