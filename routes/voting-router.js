
const express = require("express")
const router = express.Router()

const { votingPanelController, voteSubmitController, voteCountController } = require("../controllers/voting-controller")
const isLoggedin = require("../middlewares/isLoggedin")

router.get("/counts", isLoggedin, voteCountController)
router.get("/panel", isLoggedin, votingPanelController)
router.post("/submit", isLoggedin, voteSubmitController)

module.exports = router