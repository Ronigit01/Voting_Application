
const { userModel, validatedata } = require("../model/user")
const bcrypt = require("bcrypt")
const generatetoken = require("../utils/generatetoken")

module.exports.signupController = (req, res) => {
    res.render("signup")
}

module.exports.registerController = async (req, res) => {

    try {
        const { name, age, email, mobile, aadhar, password, role } = req.body;

        // if(role=="admin"){
        //     const existinguser = userModel.findOne({role:"admin"})
        //     if(existinguser){
        //         return res.status(400).send('An admin is already registered. Only one admin allowed.');
        //     }
        // }

        const error = validatedata({ name, email, aadhar, password })
        if (error) {
            res.status(400).send("invalid credentials")
        } else {

            const user = await userModel.findOne({ email: email })

            if (user) return res.status(400).send("user already exits! please login")

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {

                    const user = await userModel.create({
                        name,
                        age,
                        email,
                        mobile,
                        aadharCardNumber: aadhar,
                        password: hash,
                        role,

                    })
                    console.log(user)
                    const token = generatetoken({ email: email, id: user._id })
                    res.cookie("token", token)
                    res.redirect("/login")

                })
            })
        }


    } catch (err) {
        res.send(err)
    }



}