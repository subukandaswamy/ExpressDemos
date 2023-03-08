const express = require("express")
const cookieparser = require("cookie-parser")
const app = express()

const adminRouter = require('./adminrouter')

const User = require('./models/user')
const pool = require('./db')
const { deleteAllUsers } = require("./models/user")


app.use(express.static("html"))
app.use(express.urlencoded({extended: false}))
app.use(cookieparser())
app.use("/admin",adminRouter)
//app.user("/", userrouter)

app.set("view engine","ejs")

app.get("/", (req, res, next) => {
    console.log(req.params)
    res.render("index")
})

app.get("/landing", (req, res) => {
    let un = req.cookies.username
    let accounts = [
        {
            accname: 'savings',
            balance: 1000000
        },
        {
            accname: 'checking',
            balance: 2000000
        }
    ]
    res.render("landing", {username: un, accounts: accounts})
})
app.get("/fail", (req, res) => {
    res.send("failure!!")
})

app.post("/processform", (req,res) => {
    if(req.body.password === "1234"){
        res.cookie("username",req.body.username)
        res.redirect("/landing")
    }else{
        res.redirect("/index?loginres=fail")
    }
})

function dbsetup() {
    User.deleteAllUsers()
    let user = new User('subu','1234')
    user.save()
}

app.listen(3000, () => {
    dbsetup()
    console.log("server started in port 3000");
})