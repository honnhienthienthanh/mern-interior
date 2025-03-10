import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

async function userLoginCtr(req, res) {
    try {
        const { email, password } = req.body

        if(!email) {
            throw new Error('Please provide email!')
        }

        if(!password) {
            throw new Error('Please provide password!')
        }

        const user = await userModel.findOne({ email })

        if(!user) {
            throw new Error('User not found!')
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                httpOnly: true,
                secure: true
            }
            res.cookie('token', token, tokenOption).json({
                data: token,
                message: 'Login successfully!',
                success: true,
                error: false
            })
        } else {
            throw new Error('Please check password!')
        }
    } catch(err) {
        res.json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

export default userLoginCtr