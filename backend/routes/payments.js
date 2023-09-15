const router = require("express").Router();
let Payment = require("../models/payment");

//create payment
router.route("/add").post((req, res) => {
    const { userId, amount, cardNo, expiryMonth, expiryYear, cardholderName, CVV } = req.body;

    const newPayment = new Payment({
        userId,
        amount,
        cardNo,
        expiryMonth,
        expiryYear,
        cardholderName,
        CVV
    })

    newPayment.save().then(() => {
        //validations
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be positive' })
        }
        if (!amount || !cardNo || !expiryMonth || !expiryYear || !cardholderName || !CVV) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        if (expiryYear < 23){
            return res.status(400).json({message: 'Invalid expiry date!'})
        }
        else{
            res.json("Payment made succesfully!")
        }
        
    }).catch((error) => {
        console.log(error);
    })
})

//view payments
router.route("/").get((req, res) => {

    Payment.find().then((payments) => {
        res.json(payments)
    }).catch((error) => {
        console.log(error);
    })
})

module.exports = router;