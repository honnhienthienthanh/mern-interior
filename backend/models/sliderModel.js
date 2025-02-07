import mongoose from 'mongoose'

const sliderSchema = new mongoose.Schema({
    slideImage: {
        type: String,
        required: true
    },
    slideAuthor: {
        type: String,
        required: true
    },
    slideTitle: {
        type: String,
        required: true
    },
    slideCategory: {
        type: String,
        required: true
    },
    slideDescription: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const sliderModel = mongoose.model('slider', sliderSchema)

export default sliderModel