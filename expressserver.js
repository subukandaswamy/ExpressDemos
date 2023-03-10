const express = require("express")
const cookieparser = require("cookie-parser")
const app = express()
const session = require('express-session')

const adminRouter = require('./adminrouter')

const User = require('./models/user')
const pool = require('./db')
const { deleteAllUsers } = require("./models/user")


app.use(express.static("html"))
app.use(express.urlencoded({extended: false}))
app.use(cookieparser())
app.use("/admin",adminRouter)
//app.user("/", userrouter)\

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.set("view engine","ejs")

app.get("/", (req, res, next) => {
    //console.log(req.query)
    let msg = ""
    if(req.query.loginres){
        msg = "Login failed. Incorrect username and/or password"
    }
    res.render("index", {msg: msg})
})

app.get("/landing", (req, res) => {
    //let un = req.cookies.username
    let un = req.session.user.username
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

app.post("/processform", async (req,res) => {
    let user = await User.getUserByUsername(req.body.username, req.body.password)
    console.log(user);
    if(user!==null){
        //res.cookie("username",user.username)
        req.session.user = user
        res.redirect("/landing")
    }else{
        res.redirect("/?loginres=fail")
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