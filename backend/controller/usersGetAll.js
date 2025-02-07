import userModel from '../models/userModel.js'

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

export default getAllUsers