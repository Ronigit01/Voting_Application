
const express = require("express")
const router = express.Router()

const { loginController, userLoginController } = require("../controllers/login-controller")

router.get("/", loginController)
router.post("/user-login", userLoginController)

module.exports = router