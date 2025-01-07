const mongoose = require('mongoose')

const careersSchema = new mongoose.Schema({
    careersTitle: String,
    careersSumary: String,
    careersImage: String,
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

module.exports = careersModel