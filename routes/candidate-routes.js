
const express = require("express")
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");

const { showCandidates, createCandidates, createNewCandidates } = require("../controllers/candidate-controller");

router.get("/", isLoggedin, showCandidates)
router.get("/create", isLoggedin, createCandidates)
router.post("/create-new-candidate", isLoggedin, createNewCandidates)

module.exports = router;