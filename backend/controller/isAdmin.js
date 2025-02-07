import userModel from '../models/userModel.js'

async function isAdmin(req, res) {
    try {
        const user = await userModel.findById(req.userId)

        if(user.role === 'ADMIN') {
            return res.status(201).json({
                data: user.role,
                message: `Welcome back! ${user.name}`,
                success: true,
                error: false
            })
        } else {
            return res.status(400).json({
                data: user.role,
                message: 'User infufficient permission!',
                success: false,
                error: true
            })
        }
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

export default isAdmin