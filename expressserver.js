const express = require("express")
const app = express()

function validateUser(req, res, next) {
    // assume that I am doing some DB stuff
    // and validation user
    console.log("user is validated");
    res.locals.name = "Jeremiah"
    next()
}

app.use(validateUser)

// app.get("/", (req, res, next) => {
//     res.send("Hello! Welcome to the Server Side")
// })

app.use(express.static("html"))

app.set("view engine","ejs")
app.set("view", "assets")

app.get("/", (req, res, next) => {
    // assume that I pulled the username and balance
    console.log(res)
    //res.locals.name = "Logan"
    res.render("index", {
        balance: "1000000"
    })
})

app.listen(3000, () => {
    console.log("server started in port 3000");
})