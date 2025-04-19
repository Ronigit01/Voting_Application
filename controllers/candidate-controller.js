
const checkUserRole = require("../utils/checkUserRole")
const candidateModel = require("../model/candidate")
const { userModel } = require("../model/user")

module.exports.showCandidates = async (req, res) => {

    const user = await userModel.findOne({ email: req.user.email })
    const candidates = await candidateModel.find()
    const candidatedata = candidates.map((candidate) => {
        return {
            name: candidate.name,
            party: candidate.party,
            age: candidate.age,
            votecount: candidate.voteCount,
        }
    })
    console.log(candidatedata)
    res.render("showCandidates", { candidatedata, user })
}

module.exports.createCandidates = (req, res) => {
    res.render("createCandidate")
}


module.exports.createNewCandidates = async (req, res) => {
    try {

        if (checkUserRole(req.user.email)) {

            const { name, party, age } = req.body;

            const candidate = await candidateModel.findOne({ name })
            if (candidate) return res.status(500).send("candidate already exits!")

            const newcandidate = await candidateModel.create({
                name,
                age,
                party,
            })

            res.redirect("/candidates")
        } else {
            res.status(400).send("user has not admin role")
        }


    } catch (err) {
        console.log(err)
    }
}