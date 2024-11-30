const projectUploadPermission = require('../helpers/permission')
const projectModel = require('../models/projectModel')

async function projectUpdateCtr(req, res) {
    try {
        if(!projectUploadPermission(req.userId)) {
            throw new Error('Permission denied!')
        }

        const { _id, ...reqBody } = req.body

        const updateProject = await projectModel.findByIdAndUpdate(_id, reqBody)

        res.status(201).json({
            data: updateProject,
            message: 'Project update successfully!',
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

module.exports = projectUpdateCtr