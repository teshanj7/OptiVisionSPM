import React, { useState, useContext, useEffect } from "react";
import './TJAddAppointment.css';
import axios from "axios";
import UserContext from '../ContextComponents/ContextComponent';
import { useParams } from 'react-router-dom';  

function CreateAppointment() {

    const { user } = useContext(UserContext);
    const userId = user._id

    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [telephoneNo, setTelephoneNo] = useState("");
    const [reasonOfApp, setReasonOfApp] = useState("");
    const [docName, setDocName] = useState("");
    const [date, setDate] = useState("");

    const { id } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:8040/user/get/${id}`).then((res) => {

            setDocName(res.data.user.Fullname);
            
        }).catch((err) => {
            console.log(err);
        })
    },[id]);

    function sendData(e) {
        e.preventDefault();
        const newAppointment = {
            userId,
            fullName,
            age,
            email,
            telephoneNo,
            reasonOfApp,
            docName,
            date
        }

        axios.post("http://localhost:8040/Appointment/add", newAppointment).then(() => {
            alert("Appointment added successfully")
            alert("Now heading to Payment Portal..")
            window.location.href=`/PaymentPortal`
        }).catch((error) => {
            alert("Appointment creation failed!")
        })
    }


    return (
        <div className="TJAddAppointmentPage">
            <br />
            <h1 className="TJCreateHeading">Create an Appointment</h1>
            <br />
            <button type="submit" className="TJCreateBtn" onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    window.location.href=`/viewAllAppointments`;
                                                                                    }}>VIEW ALL APPOINTMENTS</button>
            <div className="TJAddAppointmentForm">
                <form onSubmit={sendData}>
                    <label for="subject" className="TJCreateFormHeading">Patient Full Name: </label><br />
                    <input type="text" className="TJCreateFormInput" id="TJAddName" placeholder="Enter your full name here" onChange={(e) => {
                        setFullName(e.target.value);
                    }} required />
                    <br /><br />
                    <label for="subject" className="TJCreateFormHeading">Patient's Age: </label><br />
                    <input type="number" className="TJCreateFormInput" id="TJAddAge" placeholder="Enter your age here" onChange={(e) => {
                        setAge(e.target.value);
                    }} required />
                    <br /><br />
                    <label for="subject" className="TJCreateFormHeading">Patient's Email Address: </label><br />
                    <input type="text" className="TJCreateFormInput" id="TJAddEmail" placeholder="Enter your email here" onChange={(e) => {
                        setEmail(e.target.value);
                    }} required />
                    <br /><br />
                    <label for="subject" className="TJCreateFormHeading">Patient's Telephone Number: </label><br />
                    <input type="number" className="TJCreateFormInput" id="TJAddTeleNo" placeholder="Enter your telephone no here" onChange={(e) => {
                        setTelephoneNo(e.target.value);
                    }} required />
                    <br /><br />
                    <label for="subject" className="TJCreateFormHeading">Reason of Appoinment: </label><br />
                    <textarea className="TJCreateTextArea" placeholder="Enter Transaction message here" rows={4} cols={40} onChange={(e)=>{
                        setReasonOfApp(e.target.value);
                    }} required/>
                    <br /><br />
                    <label for="subject" className="TJCreateFormHeading">Doctor's Name: </label><br />
                    <input type="text" className="TJUpdateFormInput" id="TJAddDoc" value={docName} placeholder="Enter the name of the transaction recorder here" required readOnly onChange={(e)=>{
                        setDocName(e.target.value);
                    }}  />
                    <br /><br />
                    <label for="date" className="TJCreateFormHeading"> Appointment Date: </label><br />
                    <input type="date" className="TJCreateFormInput" id="FNAddDate" placeholder="Enter Appointment date here" onChange={(e) => {
                        setDate(e.target.value);
                    }} required />
                    <br /><br />

                    <button type="submit" className="TJCreateSubmit">Submit</button>&nbsp;&nbsp;&nbsp;
                    <button className="TJButtonCancel" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/viewAllAppointments`;
                    }}>Cancel</button> <br />
                    <input type="reset" value="Reset" className="TJCreateReset"></input>
                </form>
                
            </div>
            <br /><br />



        </div>
    )

}

export default CreateAppointment;