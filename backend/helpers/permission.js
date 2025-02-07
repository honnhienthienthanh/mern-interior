import userModel from '../models/userModel.js'

async function userPermission(userId) {
    const user = await userModel.findById(userId)

    if(user.role !== 'ADMIN') {
        return false
    }

    return true
}

export default userPermission