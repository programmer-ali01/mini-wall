/**
 * Reference: the code used in this project are learned from or directly used from lab tutorials week 2 to 4.
 */
const express = require('express')
const router = express.Router()

const User = require('../models/User')
const { registerValidation, loginValidation } = require('../validations/validation')

const jsonwebtoken = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

router.post('/register', async (req, res) => {
    // validation to check user input
    const { error } = registerValidation(req.body)
    if (error) {
        res.status(400).send({ message: error['details'][0]['message'] })
    }

    // check if user exists
    const userExists = await User.findOne({ email: req.body.email })
    if (userExists) {
        return res.status(400).send({ message: "User already exists" })
    }

    // creates a hashed representation
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(req.body.password, salt)

    // code to insert data
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })
    // data is saved and sent to the database
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (err) {
        res.status(400).send({ message: err })
    }

})

// Login user. The user is validated and the password is hashed using bcryptjs 
router.post('/login', async (req, res) => {

    // check if user exists
    const { error } = loginValidation(req.body)
    if (error) {
        return res.status(400).send({ message: error['details'][0]['message'] })
    }
    // validation to check user password
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send({ message: "User does not exist" })
    }
    // checks if the body password and the user passwords match
    const passwordValiation = await bcryptjs.compare(req.body.password, user.password)
    if (!passwordValiation) {
        return res.status(400).send({ message: "Password is wrong" })
    }
    // generates an auth token whenever the user successfully logins
    const token = jsonwebtoken.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({ 'auth-token': token })

})

module.exports = router