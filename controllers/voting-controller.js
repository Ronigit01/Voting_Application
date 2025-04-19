
const candidateModel = require("../model/candidate")
const { userModel } = require("../model/user")

module.exports.voteCountController = async (req, res) => {
    const candidates = await candidateModel.find().sort({ voteCount: "desc" })
    const user = await userModel.findOne({ email: req.user.email })
    res.render("voteCounts", { candidates, user })
}


module.exports.votingPanelController = async (req, res) => {
    const candidates = await candidateModel.find()
    const user = await userModel.findOne({ email: req.user.email })
    res.render("votingpanel", { candidates, user })
}


module.exports.voteSubmitController = async (req, res) => {

    try {
        console.log(req.body)
        console.log(req.user)
        const candidate = await candidateModel.findOne({ _id: req.body.selectedCandidate });
        const user = await userModel.findOne({ email: req.user.email })

        if (!user) {
            return res.status(404).send("user does not found")
        }
        if (user.role == "admin") {
            return res.status(400).send("admin can not vote")
        }
        if (user.isvoted == true) {
            return res.status(400).send("you have already voted")
        }

        candidate.vote.push({ user: user._id })
        candidate.voteCount++;
        await candidate.save()


        user.isvoted = true;
        await user.save()

        res.send("you have successfully voted")
    } catch (err) {
        console.log(err)
    }

}