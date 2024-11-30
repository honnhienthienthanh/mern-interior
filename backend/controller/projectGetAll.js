const projectModel = require("../models/projectModel")


async function projectGetAll(req, res) {
    try {
        const allProject = await projectModel.find().sort({ createdAt: -1 })

        res.status(201).json({
            data: allProject,
            message: 'All projects are here!',
            success: true,
            error: false
        })
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

module.exports = projectGetAll