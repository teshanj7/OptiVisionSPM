import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../UpdateCataractData/UpdateCataractData.css"

import UserContext from '../ContextComponents/ContextComponent';

export default function UpdateCataractData() {
    const { user } = useContext(UserContext);
    const userID = user._id;

    const { id } = useParams();
    const his = useNavigate();

    const [Fullname, setFullname] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [TelephoneNumber, setTelephoneNumber] = useState('');
    const [Age, setAge] = useState('');
    const [Gender, setGender] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8040/CataractApplication/singleCataract/${id}`).then(response => {
            response.json().then(data => {
                setFullname(data.Fullname);
                setEmail(data.Email);
                setAddress(data.Address);
                setTelephoneNumber(data.TelephoneNumber);
                setAge(data.Age);
                setGender(data.Gender);
                setFiles(data.image);
            });
        });
    }, []);



    async function updateData(event) {
        event.preventDefault();
        const data = new FormData();
        data.set('Fullname', Fullname);
        data.set('Email', Email);
        data.set('Address', Address);
        data.set('TelephoneNumber', TelephoneNumber);
        data.set('Age', Age);
        data.set('Gender', Gender);
        data.set('id', id);
        if (files?.[0]) {
            data.set('files', files?.[0]);
        }

        await fetch(`http://localhost:8040/CataractApplication/updateCataract/${id}`, {
            method: 'PUT',
            body: data,
        });
        setRedirect(true);
    }

    if (redirect) {
        alert("Cataract Updated Successfully..!")
        return his(`/Cataract/${id}`)
    }


    return (
        <div className="UpdateCatBackground">
            <br />
            <div className="rectangleCatUpdate">
                <h1 className="UpdateCataractHeading">Update Cataract Application</h1>
            </div>
            <br />

            <form className="UpdateCataractForm" onSubmit={updateData}>
                <label for="Fullname" className="CataractFormHeading">Full Name: </label><br />
                <input type="text" value={Fullname} className="CataractFormInput" placeholder="Full Name" onChange={(event) => {
                    setFullname(event.target.value);
                }} required /><br />

                <label for="Email" className="CataractFormHeading">Email: </label><br />
                <input type="email" value={Email} className="CataractFormInput" placeholder="Email" onChange={(event) => {
                    setEmail(event.target.value);
                }} required /><br />

                <label for="Address" className="CataractFormHeading">Address: </label><br />
                <input type="text" value={Address} className="CataractFormInput" placeholder="Address" onChange={(event) => {
                    setAddress(event.target.value);
                }} required /><br />

                <label for="TelephoneNumber" className="CataractFormHeading">Telephone Number: </label><br />
                <input type="number" value={TelephoneNumber} className="CataractFormInput" placeholder="Telephone Number" onChange={(event) => {
                    setTelephoneNumber(event.target.value);
                }} required /><br />

                <label for="Age" className="CataractFormHeading">Age: </label><br />
                <input type="text" className="CataractFormInput" value={Age} onChange={(event) => {
                    setAge(event.target.value)
                }} readOnly/><br />

                <label for="gender" className="CataractFormHeading">Gender: </label><br />
                <input type="text" className="CataractFormInput" value={Gender} onChange={(event) => {
                    setGender(event.target.value)
                }} readOnly/><br /><br />

                <label for="image" className="CataractFormHeading">Image: &nbsp;&nbsp;&nbsp;</label>
                <input type="file" name="file" className="CataractFormImg" onChange={(event) => {
                    setFiles(event.target.files);
                }} /><br /><br />

                <button className="CataractFormCancelbtn" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/Cataract/${id}`;
                }}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="submit" className="CataractFormSubmitbtn">SUBMIT</button>
            </form>
            <br /><br /><br />
        </div>
    )


}






