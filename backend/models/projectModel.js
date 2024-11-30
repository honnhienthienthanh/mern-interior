const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    projectName: String,
    category: String,
    customer: String,
    floorArea: Number,
    numberOfFloors: String,
    projectAddress: String,
    projectImages: [],
    projectUri: String
}, {
    timestamps: true
})

const projectModel = mongoose.model('project', projectSchema)

module.exports = projectModel