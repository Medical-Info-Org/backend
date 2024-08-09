const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Patients = new Schema({
    googleId:{
        type: String,
    },
    firstName:{
        type: String,
        required: [true, "Please enter your Name"]
    },
    lastName:{
        type: String,
        required: [true, "Please enter your Full Name"]
    },
    email:{
        type: String,
        required: [true, "Please enter your Email"]
    },
    password:{
        type: String,
    },
    country:{
        type: String,
    },
},{
    timestamps: true
})

const Patient = mongoose.model("Patients", Patients)
module.exports = Patient 