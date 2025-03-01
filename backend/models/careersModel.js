import mongoose from 'mongoose'

const careersSchema = new mongoose.Schema({
    careersTitle: String,
    careersSumary: String,
    careersImage: Array,
    careersContent: String,
    careersLink: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
})

const careersModel = mongoose.model('careers', careersSchema)

export default careersModel