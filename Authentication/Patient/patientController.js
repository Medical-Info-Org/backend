// const {db} = require("../../database/mySQLdb")
const Patient = require("../../Model/Users/patientSchema")
const emailValidator = require('../../utils/emailValidator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const getPatients = async(req,res)=>{
  const users = await Patient.find()
  res.status(200).json({message: users})
}

// signup Patients
const signupPatient = async(req,res)=>{
        const {firstName, lastName, email, password, country} = req.body
        try {  
            if(!firstName || !lastName || !email || !password || !country){
                res.status(400).json({message: "Please fill all fields"})  
            } 
    const user =await Patient.findOne({email});
    const emailTrue = emailValidator(email)
    if(!emailTrue){
      res.status(400).json({message:"please enter a valid Email"})
    }
    if(!user){
    const securePassword = await bcrypt.hash(password, 10)
    const user = await Patient.create({firstName, lastName, email, password: securePassword, country})
    res.status(201).json({message: "User Signup Successful", User:{name: user.firstName}} )
    }else if(user){
      res.status(400).json({message:"User already exists"})
    }
        } catch (error) {
            console.log(error)
            res.status(400).json({message:error})
        }
}

// Login patients
const loginPatient = async(req,res) =>{
    // res.status(200).json({message: "login patients"})
    const {email, password} = req.body
    try {
        const user = await Patient.findOne({email})
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

module.exports = {signupPatient, getPatients, loginPatient}