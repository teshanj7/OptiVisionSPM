import React from "react"
import { useState, useContext } from "react"
// import axios from "axios";
import { useNavigate } from "react-router-dom"

import UserContexxt from '../ContextComponents/ContextComponent';

export default function CreateGlaucomaForm(){

    const {user} = useContext(UserContexxt);
    const userID = user._id

    const his = useNavigate()

    const[files,setFiles] = useState('')
    const[redirect,setRedirect] = useState('')

    async function sendData(event) {

        const newGlaucoma = new FormData();

        newGlaucoma.set('userID',userID)
        newGlaucoma.set('files',files[0])

        event.preventDefault();
        console.log(files);
        const response = await fetch('http://localhost:8040/Glaucoma/addGlaucoma',{
            method: 'POST',
            body: newGlaucoma,
        });
        if(response.ok){
            setRedirect(true);
        }
    }

    if(redirect){
        return his(`/PatientHome/${userID}`)
    }


    return(
        <div className="CataractFormBackground">
            <br/>
            <div className="rectangleCat">
                <h1 className="CataractHeading">Glaucoma Application</h1>
            </div>
            <br/>
            <form className="CataractForm" onSubmit={sendData}>

                    <label for="image" className="CataractFormHeading">Image: &nbsp;&nbsp;&nbsp;</label>            
                    <input type="file" name="file"  className="CataractFormImg" onChange={(event) => {
                        setFiles(event.target.files);
                    }} /><br/><br/>

                    <button className="CataractFormCancelbtn" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/PatientHome/${userID}`;
                    }}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="submit" className="CataractFormSubmitbtn">SUBMIT</button>                    
            </form>
            <br/><br/><br/>
        </div>
    )
}