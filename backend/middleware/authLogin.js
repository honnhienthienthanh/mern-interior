import jwt from 'jsonwebtoken'

async function authLogin(req, res, next) {
    try {
        const token = req.headers?.token

        if(!token) {
            return res.status(200).json({
                message: 'User not login!',
                success: false,
                error: true
            })
        } else {
            jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
                if(err) {
                    console.log('authLogin - Error Auth - ', err)
                }
    
                req.userId = decoded?._id
    
                next()
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

export default authLogin