/**
 * Reference: the code used in this project are learned from or directly used from lab tutorials week 2 to 4.
 */
const jsonwebtoken = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send({ message: 'Access denied' })
    }
    try {
        const verified = jsonwebtoken.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (err) {
        return res.status(401).send({ message: 'wrong token' })
    }
}

module.exports = auth