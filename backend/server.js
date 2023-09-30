const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const path = require("path")

//image upload
app.use(express.static(path.join(__dirname)))
app.use(express.json())
app.use("/images",express.static(path.join(__dirname+"/images")))

//images glaucoma
app.use(express.static(path.join(__dirname)))
app.use(express.json())
app.use("/glaucomaImages",express.static(path.join(__dirname+"/glaucomaImages")))

const port = process.env.PORT || 8040;

// app middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

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

//Cataract router
const cataract = require("./routes/cataractApplication.js");
app.use("/CataractApplication",cataract);

//Galucoma router
const glaucoma = require("./models/glaucoma.js");
app.use("/Glaucoma",glaucoma);

const meditationPrescriptionRouter = require('./routes/MeditationPrescription'); // Import the meditationPrescriptionRoute file
app.use("/meditationPrescription", meditationPrescriptionRouter); // Use the meditationPrescriptionRouter for the "/meditationPrescription" route



