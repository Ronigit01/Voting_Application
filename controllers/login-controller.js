const { userModel } = require("../model/user");
const bcrypt = require("bcrypt")
const generatetoken = require("../utils/generatetoken")

module.exports.loginController = (req, res) => {
    res.render("login")
}

module.exports.userLoginController = async (req, res) => {

    const { aadhar, password } = req.body;

    const user = await userModel.findOne({ aadharCardNumber: aadhar })

    if (!user) return res.status(400).send("user does not exits! please signup")

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {

            const token = generatetoken({ email: user.email, id: user._id })
            res.cookie("token", token)
            return res.redirect("/profile")

        } else {
            return res.redirect("/login")
        }

    })




}