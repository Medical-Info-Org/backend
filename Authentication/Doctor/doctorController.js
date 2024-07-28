const {db} = require("../../database/mySQLdb")

const getDoctors = async(req,res)=>{
    const query = "SELECT * FROM doctors"
    db.query(query, (err,response)=>{
        if(err){
            throw err
        }
        res.send(response)
    })
}
const createDoctor = async(req,res)=>{
    res.send("Create doctor")
}


module.exports = {createDoctor, getDoctors}