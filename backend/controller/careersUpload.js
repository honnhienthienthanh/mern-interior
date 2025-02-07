import fs from 'fs'
import careersModel from '../models/careersModel.js'

async function careersUpload(req, res) {
    try {
        const { originalname, path } = req.file
        const newPath = Date.now() + '-' + originalname
        fs.renameSync(path,  'uploads/' + newPath)
        const { careersTitle, careersSumary, careersContent, careersLink} = req.body
        const careers = new careersModel({
            careersTitle,
            careersSumary,
            careersContent,
            careersLink,
            careersImage: newPath,
            author: req.userId
        })
        const saveCareers = await careers.save()
        res.json(saveCareers)
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: true,
            error: true
        })
    }
}

export default careersUpload