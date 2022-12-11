/**
 * Reference: the code used in this project are learned from or directly used from lab tutorials week 2 to 4.
 */
const joi = require('joi')

const registerValidation = (data) => {
    const schemaValidation = joi.object({
        username: joi.string().required().min(3).max(256),
        email: joi.string().required().min(3).max(256).email(),
        password: joi.string().required().min(3).max(1024),
    })
    return schemaValidation.validate(data)
}

const loginValidation = (data) => {
    const schemaValidation = joi.object({
        email: joi.string().required().min(3).max(256).email(),
        password: joi.string().required().min(3).max(1024),
    })
    return schemaValidation.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation