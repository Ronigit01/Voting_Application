
const express = require("express")
const router = express.Router()


const { signupController } = require("../controllers/signup-controller")
const { registerController } = require("../controllers/signup-controller")

router.get("/", signupController)

router.post("/register", registerController)

module.exports = router;