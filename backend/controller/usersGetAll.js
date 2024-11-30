const userModel = require('../models/userModel')

async function getAllUsers(req, res) {
    try {
        const allUsers = await userModel.find()
        res.status(200).json({
            data: allUsers,
            message: 'All Users',
            success: true,
            error: false
        })
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: true,
            error: false
        })
    }
}

module.exports = getAllUsers