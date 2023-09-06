const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 8090;

app.use(cors());
app.use(bodyParser.json());

//database connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL).then(() => {
    app.listen(port, () => {
        console.log(`server is up and running on port number ${port}`)
    })
}).catch((error) => {
    console.log(error)
})

//user management
const userRouter = require("./routes/user.js");
app.use("/user",userRouter);

const User = require("./models/user.js");


//login
app.post("/login", async(req,res)=>{

if(req.body.Password && req.body.Email){
    let user = await User.findOne(req.body)
    if(user){
        res.send(user)
    }else{
        res.send({result:"User not found"})
    }
}else{
    res.send({result:"User not found"})
}
})

//appointment scheduling system

const appointmentRouter = require("./routes/appointments.js");
app.use("/appointment", appointmentRouter);

const paymentRouter = require("./routes/payments.js");
app.use("/payment", paymentRouter);
