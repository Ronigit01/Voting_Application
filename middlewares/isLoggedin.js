
const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
require("dotenv").config()

app.use(cookieParser())

const isLoggedin = (req, res, next) => {

    if (!req.cookies.token) {
        res.send("you must be logged in")
    } else {

        req.user = jwt.verify(req.cookies.token, process.env.SECRET_KEY)

        console.log(req.user)
        next()
    }

}

module.exports = isLoggedin