const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')
app.use(bodyParser.json())
// middleware
const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')
const commentsRoute = require('./routes/comments')
const likesSchema = require('./routes/likes')

app.use('/api/post', postsRoute)
app.use('/api/user', authRoute)
app.use('/api/comment', commentsRoute)
app.use('/api/like', likesSchema)

app.get('/', (req, res) => {
    res.send('homepage')
})

mongoose.connect(process.env.DB_CONNECTOR, () => {
    console.log('You are connected to MongoDB')
})

app.listen(3000, () => {
    console.log('your server is up and running')
})