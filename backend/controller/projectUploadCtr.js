import projectUploadPermission from "../helpers/permission.js"
import projectModel from "../models/projectModel.js"

async function projectUploadCtr(req, res) {
    try {
        const sessionUserId = req.userId

        if(!projectUploadPermission(sessionUserId)) {
            throw new Error('Permission denied!')
        }
        const projectUpload = new projectModel(req.body)
        const projectSave = await projectUpload.save()

        res.status(201).json({
            data: projectSave,
            message: 'Project upload successfully!',
            success: true,
            error: false
        })
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            succes: false
        })
    }
}

export default projectUploadCtr