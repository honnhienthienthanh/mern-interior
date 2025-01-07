const careersModel = require('../models/careersModel')

async function careersDetails(req, res) {
    try {
        const { careersLink } = req.body

        const careers = await careersModel.find({ careersLink }).populate('author', ['name'])

        if(careers.length > 0) {
            res.status(200).json({
                data: careers,
                message: 'Get careers successfully!',
                success: true,
                error: false
            })
        } else {
            res.status(201).json({
                message: 'Careers not found!',
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

module.exports = careersDetails