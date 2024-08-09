// const {db} = require("../../database/mySQLdb")
const Doctor = require("../../Model/Users/doctorSchema")
const emailValidator = require('../../utils/emailValidator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const getDoctors = async(req,res)=>{
  const users = await Doctor.find()
  res.status(200).json({message: users})
}

// signup Doctors
const signupDoctor = async(req,res)=>{
        const {firstName, lastName, email, password, country, address, specialty, medicalCert} = req.body
        try {  
            if(!firstName || !lastName || !email || !password || !country ||address || !specialty || !medicalCert){
                res.status(400).json({message: "Please fill all fields"})  
            } 
    const user =await Doctor.findOne({email});
    const emailTrue = emailValidator(email)
    if(!emailTrue){
      res.status(400).json({message:"please enter a valid Email"})
    }
    if(!user){
    const securePassword = await bcrypt.hash(password, 10)
    const user = await Doctor.create({firstName, lastName, email, password: securePassword, country, address, specialty, medicalCert})
    res.status(201).json({message: "Doctor Signup Successful", User:{name: user.firstName}} )
    }else if(user){
      res.status(400).json({message:"Doctor already exists"})
    }
        } catch (error) {
            console.log(error)
            res.status(400).json({message:error})
        }
}

// Login Doctors
const loginDoctor = async(req,res) =>{
    // res.status(200).json({message: "login Doctors"})
    const {email, password} = req.body
    try {
        const user = await Doctor.findOne({email})
        if(!user){
          res.status(400).json({message:"Invalid username or Password"})
        }else if(user && await bcrypt.compare(password, user.password)){
            const accessToken = await jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: "7d"})
            res.status(200).json({message: `Login Successful, welcome ${user.firstName}`, accessToken})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error})
    }
}

module.exports = {signupDoctor, getDoctors, loginDoctor}