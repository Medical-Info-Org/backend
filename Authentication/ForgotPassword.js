const express = require('express')
const route = express.Router()

route.get("/", (req,res)=>{
    const {email} = req.body
    // send token to email
    const otp =  Math.floor(1000 + Math.random() * 9000)
    
    // res.send("forgot password")
})

module.exports = route