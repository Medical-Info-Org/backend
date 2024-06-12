const mysql = require('mysql2')

const connectSQLdb =()=>{
    const con = mysql.createConnection({
        host:"127.0.0.1",
        user: "root",
        password: '351885'
    })
    
    con.connect((err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("mySQL database connected successfully")
        }
    })
}

module.exports = connectSQLdb