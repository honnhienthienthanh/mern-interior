import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js'

async function userRegisterCtr(req, res) {
    try {
        const { name, email, password } = req.body

        const user = await userModel.findOne({email})

        if(user) {
            throw new Error('User already exits!')
        }

        if(!name) {
            throw new Error('Please provide name!')
        }

        if(!email) {
            throw new Error('Please provide email!')
        }

        if(!password) {
            throw new Error('Please provide password!')
        }

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hashSync(password, salt)

        if(!hashPassword) {
            throw new Error('Something is wrong!')
        }

        const payload = {
            ...req.body,
            role: 'GENERAL',
            password: hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            message: 'User created successfully!',
            success: true,
            error: false
        })
    } catch(err) {
        res.json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

export default userRegisterCtr