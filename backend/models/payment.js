const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    amount : {
        type : Number,
        required : true
    },
    cardNo : {
        type : Number,
        required : true
    },
    expiryMonth : {
        type : Number,
        required : true
    },
    expiryYear : {
        type : Number,
        required : true
    },
    cardholderName : {
        type : String,
        required : true
    },
    CVV : {
        type : Number,
        required : true
    }
})

const Payment = mongoose.model("payment", paymentSchema);
module.exports = Payment;