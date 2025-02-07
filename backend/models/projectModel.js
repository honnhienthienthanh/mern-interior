import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    floorArea: {
        type: Number,
        required: true
    },
    numberOfFloors: {
        type: String,
        required: true
    },
    projectAddress: {
        type: String,
        required: true
    },
    projectImages: {
        type: Array,
        required: true
    },
    projectUri: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const projectModel = mongoose.model('project', projectSchema)

export default projectModel