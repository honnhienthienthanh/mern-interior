const userModel = require('../models/userModel')

async function userPermission(userId) {
    const user = await userModel.findById(userId)

    if(user.role !== 'ADMIN') {
        return false
    }

    return true
}

module.exports = userPermission