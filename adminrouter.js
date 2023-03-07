const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {

    res.send("Root admin page")
})

router.get("/control", (req, res) => {
    
    res.send("Admin control page")
})

router.get("/customer/:custid", (req, res) => {
    //console.log(req.params)
    // I pull informatio of customer matching custid
    res.send("Customer Page" + req.params.custid)
})


module.exports = router