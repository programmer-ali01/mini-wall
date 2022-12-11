const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')
const Like = require('../models/Like')

const verify = require('../tokenVerification')

// create a like
router.post('/', verify, async (req, res) => {
    // check so that user does not like their own posts
    const ownPosts = await Post.findOne({ user: req.body.user })
    if (ownPosts) {
        return res.status(400).send({ message: "Unable to like own posts" })
    }

    const newLike = new Like({
        user: req.body.user,
        post: req.body.post
    })
    // reference: The following code is learned and inspired by following website
    // medium.com, How to increment a number value in mongoose, available online at: https://medium.com/@salonimalhotra1ind/how-to-increment-a-number-value-in-mongoose-785066ba09d8 Last accessed: 11/12/2022
    try {
        const saveNewLike = await newLike.save(() => {
            Post.findByIdAndUpdate(req.body.post, { $inc: { likes: 1 } }, (err, like) => {
                if (err) { return res.send({ message: err }) }
                res.send(like)
            })
        })
    } catch (err) {
        res.send({ message: err })
    }
})

// get number of likes
router.get('/:postId', verify, async (req, res) => {
    try {
        Post.findById(req.params.postId, 'likes', (err, likes) => {
            if (err) { return res.send({ message: err }) }
            res.send(likes)
        })
    } catch (err) {
        res.send({ message: err })
    }

})

module.exports = router