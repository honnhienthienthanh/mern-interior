const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    newsTitle: String,
    newsSumary: String,
    newsImage: String,
    newsContent: String,
    newsLink: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
})

const newsModel = mongoose.model('news', newsSchema)

module.exports = newsModel