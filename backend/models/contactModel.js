import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    contactfullName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: true
    },
    contactIssue: {
        type: String,
        required: true
    },
    contactMessage: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const contactModel = mongoose.model('contact', contactSchema)

export default contactModel