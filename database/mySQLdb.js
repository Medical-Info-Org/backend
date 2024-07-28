const mysql = require('mysql2')

const db = mysql.createConnection({
    host:"127.0.0.1",
    user: "root",
        password: '351885',
        database: "Mydb"
    })          
    // Creating the individual model or Table
            // con.connect((err)=>{
                //     if(err){
    //         console.log(err);
    //     }else{
        //         console.log("mySQL database connected successfully")
        //         con.query("CREATE TABLE doctors (name VARCHAR(25), address VARCHAR(25))", (err,res)=>{
            //             if(err) {throw err};
            //             console.log("Doctor model added")
    //         })
    //     }
    // })
    
const connectSQLdb =()=>{
    // Inserting a value into the table
    db.connect((err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("mySQL database connected successfully")
            db.query("ALTER TABLE doctors ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY",(err,res)=>{
                      if(err) {throw err};
                      console.log("Doctor model added")
        })
    }})

}

module.exports = {db, connectSQLdb}