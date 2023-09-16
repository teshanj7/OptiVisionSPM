import React, { useState, useContext, useEffect } from "react";
import './TJPaymentPortal.css';
import axios from "axios";
import UserContext from '../ContextComponents/ContextComponent';
import { useParams } from 'react-router-dom';

function CreatePayment() {

    const { user } = useContext(UserContext);
    const userId = user._id

    const [amount, setAmount] = useState("");
    const [cardNo, setCardNo] = useState("");
    const [expiryMonth, setExpiryMonth] = useState("");
    const [expiryYear, setExpiryYear] = useState("");
    const [cardholderName, setCardHolderNo] = useState("");
    const [CVV, setCvv] = useState("");

    
    useEffect(()=>{
        setAmount(2500);
    })

    function sendData(e) {
        e.preventDefault();
        const newPayment = {
            userId,
            amount,
            cardNo,
            expiryMonth,
            expiryYear,
            cardholderName,
            CVV
        }

        if (amount <= 0 || !amount === 'number') {
            alert("Amount must be positive")
        }
        if (!amount || !cardNo || !expiryMonth || !expiryYear || !cardholderName || !CVV) {
            alert("All fields are required!")
        }
        if (expiryYear < 23){
            alert("Invalid expiry date!")
        }

        setTimeout(() => {
            axios.post("http://localhost:8040/payment/add", newPayment).then(() => {
                alert("Payment Successful!")
                window.location.href = `/viewAllAppointments`
            }).catch((error) => {
                alert("Payment failed try again after some time!")
            })
        }, 4000); 
    }

    return (
        <div className="TJAddPaymentPage">
            <br />
            <h1 className="TJPaymentHeading">Payment Portal</h1>
            <h2 className="TJPaymentSubHeading">OptiVision®</h2>
            <br /><br/><br/>
            <div className="TJAddPaymentForm">
                <form onSubmit={sendData}>
                    <br/>
                    <label for="subject" className="TJCreateFormHeading">Payment Amount: </label><br />
                    <input type="number" className="TJCreateFormInput" id="TJAddAmount"  placeholder="Your payment amount" value={amount}
                 required />
                    <br /><br />

                    <label for="subject" className="TJCreateFormHeading">Card Number: </label><br />
                    <input type="number" className="TJCreateFormInput" id="TJAddAmount" placeholder="Enter your card number here " onChange={(e) => {
                        setCardNo(e.target.value);
                    }} required />
                    <br /><br />

                    <label for="subject" className="TJCreateFormHeading">Expiry Details: </label><br />
                    <label for="subject" className="TJExpHeading">Exp.Month: </label>&nbsp;
                    <input type="number" className="TJCreateExpDetails" id="TJAddExpMonth" onChange={(e) => {
                        setExpiryMonth(e.target.value);
                    }} required /> &nbsp;
                    <label for="subject" className="TJExpHeading"> / </label>&nbsp;
                    <label for="subject" className="TJExpHeading">Exp.Year: </label>&nbsp;
                    <input type="number" className="TJCreateExpDetails" id="TJAddExpYear" onChange={(e) => {
                        setExpiryYear(e.target.value);
                    }} required />
                    <br /><br />

                    <label for="subject" className="TJCreateFormHeading">Card Holder Name: </label><br />
                    <input type="text" className="TJCreateFormInput" id="TJAddName" placeholder="Enter the card holder name here" onChange={(e) => {
                        setCardHolderNo(e.target.value);
                    }} required />
                    <br /><br />

                    <label for="subject" className="TJCreateFormHeading">CVV: </label>&nbsp;
                    <input type="password" className="TJCreateExpDetails2" id="TJAddCVV" onChange={(e) => {
                        setCvv(e.target.value);
                    }} required />
                    <br /><br />
                    <button type="submit" className="TJPaymentSubmit">Submit</button>
                    <br/>
                </form>
            </div>
            <br/><br/><br/>

        </div>
    )



}

export default CreatePayment;