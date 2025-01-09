const sliderModel = require('../models/sliderModel')

async function homeGetSlide(req, res) {
    try {
        const allSlide = await sliderModel.find().sort({ createdAt: -1 })

        if(allSlide) {
            res.status(201).json({
                data: allSlide,
                message: 'Here are all Slide!',
                success: true,
                error: false
            })
        } else {
            res.status(201).json({
                message: 'Slide list empty!',
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

module.exports = homeGetSlide