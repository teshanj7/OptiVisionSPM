import React, { useEffect, useState } from "react";
import '../TJUpdateAppointment/TJUpdateAppointment.css';
import { useParams } from "react-router-dom";
import moment from "moment";

const UpdateAppointment = () => {

    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [telephoneNo, setTelephoneNo] = useState("");
    const [reasonOfApp, setReasonOfApp] = useState("");
    const [docName, setDocName] = useState("");
    const [date, setDate] = useState("");

    const params = useParams();

    useEffect(() => {
        getAppointmentDetails();
    }, [])

    const getAppointmentDetails = async () => {
        let result = await fetch(`http://localhost:8040/Appointment/get/${params.id}`);
        result = await result.json();

        setFullName(result.appointment.fullName)
        setAge(result.appointment.age)
        setEmail(result.appointment.email)
        setTelephoneNo(result.appointment.telephoneNo)
        setReasonOfApp(result.appointment.reasonOfApp)
        setDocName(result.appointment.docName)
        setDate(result.appointment.date)
    }

    const updateAppointment = async () => {
        let result = await fetch(`http://localhost:8040/Appointment/update/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ fullName, age, email, telephoneNo, reasonOfApp, docName }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });

        result = await result.json()

        if (result) {
            alert("Appointment Updated Successfully!")

            window.location.href = `/viewAllAppointments`;
        }
    }

    return (
        <div className="TJUpdatePage">
            <br/>
            <h1 className="TJUpdateHeading">APPOINTMENT - UPDATE</h1>
            <div className="TJUpdateForm">
                <br />
                <label for="subject" className="TJUpdateFormHeading">Full Name: </label><br />
                <input type="text" className="TJUpdateFormInput" value={fullName} onChange={(e) => {
                    setFullName(e.target.value)
                }} />
                <br /><br />
                <label for="subject" className="TJUpdateFormHeading">Age: </label><br />
                <input type="Number" className="TJUpdateFormInput" value={age} onChange={(e) => {
                    setAge(e.target.value)
                }} />
                <br /><br />
                <label for="subject" className="TJUpdateFormHeading">Email: </label><br />
                <input type="text" className="TJUpdateFormInput" value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }} />
                <br /><br />
                <label for="subject" className="TJUpdateFormHeading">Telephone Number: </label><br />
                <input type="Number" className="TJUpdateFormInput" value={telephoneNo} onChange={(e) => {
                    setTelephoneNo(e.target.value)
                }} />
                <br /><br />
                <label for="message" className="TJUpdateFormHeading">Reason for Appointment: </label><br />
                <textarea className="TJUpdateTextArea" placeholder="Enter Transaction message here" value={reasonOfApp} rows={4} cols={40} required onChange={(e) => {
                    setReasonOfApp(e.target.value);
                }} />
                <br /><br />
                <label for="subject" className="TJUpdateFormHeading">Doctor's Name: </label><br />
                <input type="text" className="TJUpdateFormInput" value={docName} onChange={(e) => {
                    setDocName(e.target.value)
                }} />
                <br /><br />
                <label for="subject" className="TJUpdateFormHeading">Date: </label><br />
                <input type="date" className="TJUpdateFormInput" value={moment(date).format('YYYY-MM-DD')} onChange={(e) => {
                    setDate(e.target.value)
                }} />
                <br /><br />

                <button className="TJUpdateSubmit" onClick={updateAppointment}>Update</button>&nbsp;&nbsp;&nbsp;
                <button className="TJButtonCancel" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/viewAllAppointments`;
                }}>Cancel</button> <br />

            </div>
            <br /><br />
        </div>
    )
}

export default UpdateAppointment;