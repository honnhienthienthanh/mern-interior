import projectModel from "../models/projectModel.js"


async function projectByCategory(req, res) {
    try {
        const { category } = req.body || req?.query

        const projects = await projectModel.find({ category })

        res.status(201).json({
            data: projects,
            message: `All projects of ${category} here!`,
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

export default projectByCategory