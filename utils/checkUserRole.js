
const { userModel } = require("../model/user")

const checkUserRole = async (email) => {

    const user = await userModel.findOne({ email })

    if (user.role == "admin") {
        return true
    } else {
        return false
    }

}

module.exports = checkUserRole