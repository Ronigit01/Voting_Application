const express = require("express")
const app = express()
const path = require("path")
const signupRouter = require("./routes/signup-routes")
const loginRouter = require("./routes/login-routes")
const profileRouter = require("./routes/profile-routes")
const candidateRouter = require("./routes/candidate-routes")
const votingRouter = require("./routes/voting-router")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const db = require("./config/mongoose-connetion")
db()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")
app.use(cookieParser());

app.get("/", (req, res) => {
  res.redirect("/signup");
});

app.use("/signup", signupRouter)

app.use("/login", loginRouter)
app.use("/profile", profileRouter)

app.use("/candidates", candidateRouter);
app.use("/vote", votingRouter);

app.post("/logout", (req, res) => {
  res.cookie("token", "")
  res.redirect("/")
})


app.listen(process.env.PORT)


module.exports = app;
