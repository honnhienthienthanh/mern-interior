

async function userLogoutCtr(req, res) {
    try {
        res.clearCookie('token')

        res.status(200).json({
            message: 'Logout successfully!',
            success: true,
            error: false
        })
    } catch(err) {
        res.status(200).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

module.exports = userLogoutCtr