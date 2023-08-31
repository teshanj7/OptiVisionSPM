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
