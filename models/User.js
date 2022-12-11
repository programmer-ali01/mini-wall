const mongoose = require('mongoose')

// The user schema has a username, email, and password.
const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 256
    },
    email: {
        type: String,
        require: true,
        min: 6,
        max: 256,
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 1024,
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users', userSchema)