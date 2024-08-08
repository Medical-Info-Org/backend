const express = require("express")
const {connectSQLdb} = require("./database/mySQLdb")
const connectMongodb = require("./database/mongodb")
const dailyTips = require("./Routes&Controllers/Dailytips/dailytipsController")
const doctorRoute = require("./Authentication/Doctor/doctorRouter")
const patientRoute = require("./Authentication/Patient/patientRouter")
const diseases = require("./Routes&Controllers/Ailment Archive/ailmentArchciveController")
const forgotPasswordRoute = require("./Authentication/ForgotPassword")
const passport = require("passport")
const session = require("express-session")
require("dotenv").config()

const app = express()
const port = process.env.PORT

app.use(express.json())//JSON middleware
app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: 'suii',
    resave: false,
    saveUninitialized: true,
  }))
  app.use(passport.authenticate('session'))
  app.use(passport.initialize())
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

app.use('/dailyTips', dailyTips)
app.use('/doctor', doctorRoute)
app.use('/api/patient', patientRoute)
app.use('/diseases', diseases)
app.use('/forgotpassword', forgotPasswordRoute)
// connectSQLdb()
connectMongodb()

app.get("/login", (req, res)=>{
    //  res.send("welcome")
     res.redirect("https://google.com")
})

require('./utils/googleAuthenticate.js')
app.get('/auth/google',passport.authenticate('google', { scope:[ 'email', 'profile' ] }));
app.get('/auth/google/callback', 
passport.authenticate('google', {
    failureRedirect: '/login'
  }), (req,res)=>{
    res.redirect("https://medical-info.vercel.app")
  })


//catch errors middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({message: 'something broke', error: err});
});

app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})
