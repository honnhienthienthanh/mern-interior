const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema({
    contact1stName: {
        type: String,
        required: true
    },
    contactLastName: {
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

const contactModel = model('contact', contactSchema)

module.exports = contactModel