const {db} = require("../../database/mySQLdb")

const getPatients = async(req,res)=>{
    const query = "SELECT * FROM patients"
    db.query(query, (err,res)=>{
        if(err){
            throw err
        }
        console.log(res)
    })
}

// signup Patients
const signupPatient = async(req,res)=>{
        const {firstname, lastname, email, password, country, address} = req.body
        if(!firstname || !lastname || !email || !password || !country || !address){
            res.status(400).json({message: "Please fill all fields"})  
        } 
        try {  
            const query1 = `SELECT * FROM patients WHERE email = "${email}"` 
            db.query(query1, (err, result)=>{
                if (err) {
                    console.log(err); 
                    res.status(400).json({message:err.sqlMessage, errorDetail: err.sql})
                }
                else if(result.length > 0){
                    res.status(400).json({message: "User already exists"})
                }else{
                    const query = `INSERT INTO patients (firstname, lastname, email, password, country, address) VALUES ('${firstname}', '${lastname}', '${email}', '${password}', '${country}', '${address}')`
                    db.query(query, (err, result)=>{
                    if (err) {
                        console.log(err); 
                        res.status(400).json({message:err.sqlMessage, errorDetail: err.sql})
                    }
                    res.send(result)
                 })
                }
             })
              
        } catch (error) {
            console.log(error)
            throw error
        }
}

// Login patients
const loginPatient = async(req,res) =>{
    // res.status(200).json({message: "login patients"})
    const {email, password} = req.body
    try {
        if(!email || !password){
            res.status(400).json({message: "Please fill all fields"})
        }
        const query = `SELECT * FROM patients WHERE email = "${email}"`
        db.query(query, (err, result)=>{
            if (err){ 
                console.log(err)
                res.status(400).json({message:err.sqlMessage, errorDetail: err.sql})
            }
            if(result.length === 0){
                res.send("Invalid Email or password")
            }
            const user = result.filter((item)=> item === email )
            res.send(result)
         })
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {signupPatient, getPatients, loginPatient}