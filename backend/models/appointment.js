const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telephoneNo: {
        type: Number,
        required: true
    },
    reasonOfApp: {
        type: String,
        required: true
    },
    docName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;