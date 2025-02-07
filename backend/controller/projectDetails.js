import projectModel from "../models/projectModel.js"


async function projectDetails(req, res) {
    try {
        const { projectUri } = req.body

        const detailsData = await projectModel.find({ projectUri: projectUri })

        res.status(201).json({
            data: detailsData,
            message: 'Project details are here!',
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

export default projectDetails