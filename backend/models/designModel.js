import mongoose from 'mongoose'

const designSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerArea: {
        type: String,
        required: true
    },
    customerFloor: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    customerAdvisory: {
        type: String,
        required: true
    },
    customerRequest: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const designModel = mongoose.model('design-req', designSchema)

export default designModel