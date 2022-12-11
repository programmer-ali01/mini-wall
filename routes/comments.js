/**
 * Reference: the code used in this project are learned from or directly used from lab tutorials week 2 to 4.
 */

const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Comment = require('../models/Comment')

const verify = require('../tokenVerification')

router.post('/', verify, async (req, res) => {
    // check if post exists
    const postExists = await Post.findById(req.body.post)
    if (!postExists) {
        return res.status(400).send({ message: "Post does not exist" })
    }

    // check if user is the author of comment
    const commentAuthor = await Post.findOne({ user: req.body.user })
    const isSameAuthor = req.body.user === commentAuthor
    if (isSameAuthor) {
        return res.status(400).send({ message: "Unable to comment on own post" })
    }
    // initialises a new comment
    const commentData = new Comment({
        comment: req.body.comment,
        user: req.body.user,
        post: req.body.post
    })
    try {
        const commentToSave = await commentData.save()
        res.send(commentToSave)
    } catch (err) {
        res.send({ message: err })
    }
})

// Get all comments in the database
router.get('/', verify, async (req, res) => {
    try {
        const getComments = await Comment.find()
        res.send(getComments)
    } catch (err) {
        res.send({ message: err })
    }
})

// Get all comments belonging to one user
router.get('/:userId', verify, async (req, res) => {
    try {
        const getCommentsByUserId = await Comment.findOne({ user: req.params.userId })
        res.send(getCommentsByUserId)
    } catch (err) {
        res.send({ message: err })
    }
})
// get a comment based on Id
router.get('/:commentId', verify, async (req, res) => {
    try {
        const getCommentById = await Post.findById(req.params.commentId)
        res.send(getCommentById)
    } catch (err) {
        res.send({ message: err })
    }
})

// update comment 
router.patch('/:commentId', verify, async (req, res) => {
    const commentData = new Comment({
        comment: req.body.comment,
        user: req.body.user,
        post: req.body.post
    })
    try {
        const updateCommentById = await Comment.updateOne(
            { _id: req.params.commentId },
            {
                $set: {
                    comment: req.body.comment,
                    user: req.body.user,
                    post: req.body.post
                }
            })
        res.send(updateCommentById)
    } catch (err) {
        res.send({ message: err })
    }
})

router.delete('/:commentId', verify, async (req, res) => {
    try {
        const deleteCommentById = await Post.deleteOne(
            { _id: req.params.commentId }
        )
        res.send(deleteCommentById)
    } catch (err) {
        res.send({ message: err })
    }
})

module.exports = router