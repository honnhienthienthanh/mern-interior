import { v2 as cloudinary } from 'cloudinary'

async function uploadImages(images) {
    try {
        const finalResult = await Promise.all(
            images.map(async(image) => {
                let result = await cloudinary.uploader.upload(
                    image.path,
                    {
                        public_id: image.filename,
                        resource_type: 'image'
                    }
                )
                return { url: result.secure_url, public_id: result.public_id }
            })
        )

        if(finalResult) {
            return finalResult
        } else {
            throw new Error('Đã có lỗi xảy ra với chương trình upload ảnh.')
        }
    } catch(err) {
        throw new Error(err.message)
    }
}

export default uploadImages