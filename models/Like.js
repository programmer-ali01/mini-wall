const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('likes', likeSchema)