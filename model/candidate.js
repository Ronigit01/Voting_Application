const mongoose = require("mongoose")

const candidateschema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    party: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    vote: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },

            votedAt: {
                type: Date,
                default: Date.now(),
            },
        }
    ],
    voteCount: {
        type: Number,
        default: 0,
    }
})


module.exports = mongoose.model("candidate", candidateschema)