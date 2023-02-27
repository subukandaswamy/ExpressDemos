const path = require("path")

const express = require("express")
const app = express()

function handle(req, res) {
    res.send("Hello Express!")
}



app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname,"index.html"))
})

app.get('*',handle)

app.listen(3000)