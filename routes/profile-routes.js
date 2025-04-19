
const express = require("express")
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedin")

const { profileController, updateController, updatePasswordController } = require("../controllers/profile-controller")

router.get("/", isLoggedIn, profileController)
router.get("/update-password", isLoggedIn, updateController)
router.post("/update", isLoggedIn, updatePasswordController)

module.exports = router