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
const createPatient = async(req,res)=>{
    res.send("Create Patient")
}


module.exports = {createPatient, getPatients}