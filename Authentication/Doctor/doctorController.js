const {db} = require("../../database/mySQLdb")

//create schema


const getDoctors = async(req,res)=>{
    const query = "SELECT * FROM doctors"
    db.query(query, (err,response)=>{
        if(err){
            throw err
        }
        res.send(response)
    })
}
// const getSingleDoctors = async(req,res)=>{
//     const query = "SELECT * FROM doctors"
//     db.query(query, (err,response)=>{
//         if(err){
//             throw err
//         }
//         res.send(response)
//     })
// }
const createDoctor = async(req,res)=>{
    const {firstname, lastname, email, password, country, specialty, medicalCert} = req.body
    try {
        if(!firstname || !lastname || !email || !password || !country || !specialty || !medicalCert){
            res.status(400).json({message: "Please fill all fields"})  
        } 
        else{
            const query = `INSERT INTO doctors (firstname, lastname, email, password, country, specialty, medicalCert) VALUES ('${firstname}', '${lastname}', '${email}', '${password}', '${country}', '${specialty}', '${medicalCert}')`
             db.query(query, (err, result)=>{
                if (err) throw err;
                res.send(result)
             })
        }
    } catch (error) {
        console.log(error)
        throw error
    }
    
}



module.exports = {createDoctor, getDoctors}