const express = require("express")
const cookieparser = require("cookie-parser")
const app = express()


app.use(express.static("html"))
app.use(express.urlencoded({extended: false}))
app.use(cookieparser())

app.set("view engine","ejs")

app.get("/", (req, res, next) => {
    res.render("index")
})

app.get("/landing", (req, res) => {
    let un = req.cookies.username
    res.render("landing", {username: un})
})
app.get("/fail", (req, res) => {
    res.send("failure!!")
})

app.post("/processform", (req,res) => {
    if(req.body.password === "1234"){
        res.cookie("username",req.body.username)
        res.redirect("/landing")
    }else{
        res.redirect("/fail")
    }
})

app.listen(3000, () => {
    console.log("server started in port 3000");
})