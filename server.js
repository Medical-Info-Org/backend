const express = require("express")
const connectSQLdb = require("./database/mySQLdb")
const app = express()
const dotenv = require("dotenv").config()

const port = process.env.PORT
connectSQLdb()

app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})