const userModel = require('../models/userModel')

async function updateUserRole(req, res) {
    try {
        const sessionUser = req.userId
        const { userId, name, email, role } = req.body

        const payload = {
            ...( name && { name: name }),
            ...( email && { email: email }),
            ...( role && { role: role })
        }

        const user = await userModel.findById(sessionUser)

        console.log('Update User Role - ', user)

        const updateUser = await userModel.findByIdAndUpdate(userId, payload)

        res.json({
            data: updateUser,
            message: 'User updated',
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

module.exports = updateUserRole