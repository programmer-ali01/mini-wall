const mongoose = require('mongoose')

// comment schema consists of a comment, a user for knowing who posted it and post for what post does it belong to.
const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('comments', commentSchema)