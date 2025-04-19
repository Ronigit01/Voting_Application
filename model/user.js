
const mongoose = require("mongoose")
const joi = require("joi")

const userschema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    age: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    mobile: {
        type: String,
    },
    aadharCardNumber: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["voter", "admin"],
        default: "voter",
    },
    isvoted: {
        type: Boolean,
        default: false,
    },
    profilepic: {
        type: String,
        default: "user.png",
    }

})


function validatedata(data) {
    const Schema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().min(3).required(),
        aadharCardNumber: Joi.string()
            .pattern(/^[2-9][0-9]{11}$/) // Must be 12 digits, start with 2-9
            .required()
            .messages({
                'string.pattern.base': 'Aadhaar number must be 12 digits and start with 2-9.',
                'any.required': 'Aadhaar number is required.'
            })

    })

    const { error } = Schema.validate(data)
    return error
}

const userModel = mongoose.model("user", userschema)

module.exports = { validatedata, userModel }