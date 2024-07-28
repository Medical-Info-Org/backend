const express = require('express')
const route = express.Router()
const {getPatients, createPatient} = require("./patientController")
route.get("/", getPatients)
route.get("/:id", (req,res)=>{
    res.send('Get Particular Patient')
})
route.post("/create", createPatient)
route.put("/update/:id", (req,res)=>{
    res.send('Update single Patient')
})
route.delete("/delete/:id", (req,res)=>{
    res.send('Delete single Patient')
})

module.exports = route