/**
 * Reference: the code used in this project are learned from or directly used from lab tutorials week 2 to 4.
 */

const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Like = require('../models/Like')
// using verify all the CRUD operations are only done when the user is verified
const verify = require('../tokenVerification')


// CREATE post
router.post('/', verify, async (req, res) => {
    const postData = new Post({
        user: req.body.user,
        title: req.body.title,
        description: req.body.description
    })
    try {
        const postToSave = await postData.save()
        res.send(postToSave)
    } catch (err) {
        res.send({ message: err })
    }
})
// READ all posts
router.get('/', verify, async (req, res) => {
    try {
        const getPosts = await Post.find().sort({ likes: -1 })
        res.send(getPosts)
    } catch (err) {
        res.send({ message: err })
    }
})

// get posts that equal the request parameter postId
router.get('/:postId', verify, async (req, res) => {
    try {
        const getPost = await Post.findById(req.params.postId)
        res.send(getPost)
    } catch (err) {
        res.send({ message: err })
    }
})

// UPDATE: updates the post based on the request parameter postId
router.patch('/:postId', verify, async (req, res) => {
    const postData = new Post({
        user: req.body.user,
        title: req.body.title,
        description: req.body.description
    })
    try {
        const updatePostById = await Post.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    user: req.body.user,
                    title: req.body.title,
                    description: req.body.description
                }
            })
        res.send(updatePostById)
    } catch (err) {
        res.send({ message: err })
    }
})

// DELETE: deletes a post based on the request parameters postId

router.delete('/:postId', verify, async (req, res) => {
    try {
        const deletePostById = await Post.deleteOne(
            { _id: req.params.postId }
        )
        res.send(deletePostById)
    } catch (err) {
        res.send({ message: err })
    }
})

module.exports = router