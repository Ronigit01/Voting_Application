
const mongoose = require("mongoose")
require("dotenv").config()

const connectdb = () =>{
    try{

        mongoose.connect(process.env.MONGO_URI)
        console.log("database connected")

    }catch(err){

        console.log(err)
        process.exit(1)

    }
}

module.exports = connectdb