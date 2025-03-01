import { v2 as cloudinary } from 'cloudinary'

async function deleteImages(publicId) {
    try {
        let finalResults
        if(typeof publicId === 'object') {
            finalResults = await Promise.all(
                publicId.map(async(id) => {
                    let result = await cloudinary.uploader.destroy(id.toString())
                    return result
                })
            )
           
        } else {
            finalResults = await cloudinary.uploader.destroy(publicId)
        }

        return finalResults
    }
    catch(err) {
        throw new Error(err.message)
    }
}

export default deleteImages