import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        const uniqueName = `${Date.now()}-${file.originalname}`
        callback(null, uniqueName)
    }
})

const fileFilter = function(req, file, callback) {
    const allowedTypes = /jpeg|jpg|png|web|gif/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if(extname && mimetype) {
        callback(null, true)
    } else {
        callback(new Error('Hệ thống chỉ cho phép các định dạng: jpeg, jpg, png, web và gif!'))
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
})

export default upload