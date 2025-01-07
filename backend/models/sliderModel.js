const mongoose = require('mongoose')
const { Schema, model } = mongoose

const sliderSchema = new Schema({
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

const sliderModel = model('slider', sliderSchema)

module.exports = sliderModel