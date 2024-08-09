const express = require('express')
const route = express.Router()
const {getDoctors, signupDoctor, loginDoctor} = require("./doctorController")
route.get("/", getDoctors)
route.get("/:id", (req,res)=>{
    res.send('Get Particular doctor')
})
route.post("/signup", signupDoctor)
route.post("/login", loginDoctor)
route.put("/update/:id", (req,res)=>{
    res.send('Update single doctor')
})
route.delete("/delete/:id", (req,res)=>{
    res.send('Delete single doctor')
})

module.exports = route