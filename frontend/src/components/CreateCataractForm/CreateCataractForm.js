import React from "react"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import "../CreateCataractForm/CreateCataractForm.css";

import UserContexxt from '../ContextComponents/ContextComponent';

export default function CreateCataractForm(){

    const {user} = useContext(UserContexxt);
    const userID = user._id

    const his = useNavigate()

    const[Fullname,setFullname] = useState('')
    const[Email,setEmail] = useState('')
    const[Address,setAddress] = useState('')
    const[TelephoneNumber,setTelephoneNumber] = useState('')
    const[Age,setAge] = useState('')
    const[Gender,setGender] = useState('')
    const[files,setFiles] = useState('')
    const[redirect,setRedirect] = useState('')

    async function sendData(event) {

        const newCataract = new FormData();

        newCataract.set('userID',userID)
        newCataract.set('Fullname',Fullname)
        newCataract.set('Email',Email)
        newCataract.set('Address',Address)
        newCataract.set('TelephoneNumber',TelephoneNumber)
        newCataract.set('Age',Age)
        newCataract.set('Gender',Gender)
        newCataract.set('files',files[0])

        event.preventDefault();
        console.log(files);
        const response = await fetch('http://localhost:8040/CataractApplication/addCataract',{
            method: 'POST',
            body: newCataract,
        });
        if(response.ok){
            setRedirect(true);
        }
    }

    if(redirect){
        alert("Cataract Created Successfully..!")
        return his(`/ViewCataractData/${userID}`)
    }


    return(
        <div className="CataractFormBackground">
            <br/>
            <div className="rectangleCat">
                <h1 className="CataractHeading">Cataract Application</h1>
            </div>
            <br/>
            <form className="CataractForm" onSubmit={sendData}>
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

                    <label for="Age"  className="CataractFormHeading">Age: </label><br/>
                    <input type="radio"  className="ageradio" name="age" value="Under 18" onChange={(event) => {
                        setAge(event.target.value);
                    }} required />&nbsp;&nbsp;
                    <label for="Under 18" className="CataractFormHeading">Under 18</label>
                    &nbsp;&nbsp;&nbsp;
                    <input type="radio" className="ageradio" name="age" value="18-30" onChange={(event) => {
                        setAge(event.target.value);
                    }} required />&nbsp;&nbsp;
                    <label for="18-30" className="CataractFormHeading">18-30</label>&nbsp;&nbsp;&nbsp;
                    <input type="radio"  className="ageradio" name="age" value="31-50" onChange={(event) => {
                        setAge(event.target.value);
                    }} required />&nbsp;&nbsp;
                    <label for="31-50" className="CataractFormHeading">31-50</label>
                    &nbsp;&nbsp;&nbsp;
                    <input type="radio" className="ageradio" name="age" value="Above 50" onChange={(event) => {
                        setAge(event.target.value);
                    }} required />&nbsp;&nbsp;
                    <label for="Above 50" className="CataractFormHeading">Above 50</label><br />

                    <label for="Gender"  className="CataractFormHeading">Gender: </label><br/>
                    <input type="radio"  className="genderradio" name="gender" value="Male" onChange={(event) => {
                        setGender(event.target.value);
                    }} required />&nbsp;&nbsp;
                    <label for="Male" className="CataractFormHeading">Male</label>
                    &nbsp;&nbsp;&nbsp;
                    <input type="radio" className="genderradio" name="gender" value="Female" onChange={(event) => {
                        setGender(event.target.value);
                    }} required />&nbsp;&nbsp;
                    <label for="Female" className="CataractFormHeading">Female</label><br />

                    <label for="image" className="CataractFormHeading">Image: &nbsp;&nbsp;&nbsp;</label>            
                    <input type="file" name="file"  className="CataractFormImg" onChange={(event) => {
                        setFiles(event.target.files);
                    }} /><br/><br/>

                    <button className="CataractFormCancelbtn" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/EyeTestMgmt`;
                    }}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="submit" className="CataractFormSubmitbtn">SUBMIT</button>                    
            </form>
            <br/><br/><br/>
        </div>
    )
}