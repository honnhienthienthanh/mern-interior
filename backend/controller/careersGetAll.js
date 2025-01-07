const careersModel = require('../models/careersModel')

async function careersGetAll(req, res) {
    try {
        const allCareers = await careersModel.find()
            .populate('author', 'name')
            .sort({createdAt: -1})

        if(allCareers) {
            res.status(200).json({
                data: allCareers,
                message: 'Get news data successfully!',
                success: true,
                error: false
            })
        } else {
            throw new Error('Data is empty or something went wrong!')
        }
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: true,
            error: true
        })
    }
}

module.exports = careersGetAll