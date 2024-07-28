const express = require("express")
const {connectSQLdb} = require("./database/mySQLdb")
const dailyTips = require("./Routes&Controllers/Dailytips/dailytipsController")
const doctorRoute = require("./Authentication/Doctor/doctorRouter")
require("dotenv").config()

const app = express()
const port = process.env.PORT

app.use(express.json())//JSON middleware
app.use('/dailyTips', dailyTips)
app.use('/doctor', doctorRoute)
connectSQLdb()

//catch errors middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({message: 'something broke', error: err});
});

app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})