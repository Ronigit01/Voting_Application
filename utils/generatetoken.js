
const jwt = require("jsonwebtoken")
require("dotenv").config()


const generatetoken = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY)
}

module.exports = generatetoken