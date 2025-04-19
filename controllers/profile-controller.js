const { userModel } = require("../model/user")
const bcrypt = require("bcrypt")

module.exports.profileController = async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email })
    console.log(user)
    res.render("profile", { user })

}

module.exports.updateController = async (req, res) => {
    res.render("updatePassword")
}

module.exports.updatePasswordController = async (req, res) => {

    const { oldPassword, newPassword } = req.body;

    const user = await userModel.findOne({ email: req.user.email })

    bcrypt.compare(oldPassword, user.password, async (err, result) => {
        if (result) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, salt, async (err, hash) => {

                    user.password = hash;
                    await user.save()
                    res.redirect("/profile")
                })
            })
        } else {
            res.status(500).send("old password does not match")
        }
    })



}

