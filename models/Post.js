const { number } = require('joi')
const mongoose = require('mongoose')

// post schema has a user to know which user posted it, the actual post as a description and how many likes it has received.
const postSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('posts', postSchema)