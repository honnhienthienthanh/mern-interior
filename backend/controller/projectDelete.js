import projectModel from '../models/projectModel.js'

async function projectDelete(req, res) {
    try {
        const { _id } = req.body

        const delProject = await projectModel.findByIdAndDelete(_id)

        if(delProject) {
            res.status(200).json({
                message: 'Xóa dự án thành công!',
                success: true,
                error: false
            })
        } else {
            throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại!')
        }
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

export default projectDelete