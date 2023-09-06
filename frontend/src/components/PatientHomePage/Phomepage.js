import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import '../PatientHomePage/Phomepage.css';
// import NavigationBarB from '../NavigationBarB/NavigationBarB'
import UserContext from '../ContextComponents/ContextComponent';
import myworkouticon from '../PatientHomePage/Myworkouticon.png';
import exerciseicon from '../PatientHomePage/exerciseicon.png';
import Edcontenticon from '../PatientHomePage/Edcontenticon.png';
import Recipesicon from '../PatientHomePage/recipesicon.png';
import Marketicon from '../PatientHomePage/marketicon.png';
import Nutritionicon from '../PatientHomePage/nutritionicon.png';


export default function PatientHome() {

    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams();

    const { user } = useContext(UserContext);
    console.log(user)

    //Log out function
    function logOut() {
        localStorage.clear();
    }

    return (
        <div className="PatientHomePage">
            
            <br /><br /><br />
            <h1 className="PatientHomeHeading">Everybody deserves to</h1>
            <h1 className="PatientHomeHeading2">see world..!</h1>

            <h3 className="PatientHomeHeading3">Our motivation is to separate</h3> 
            <h3 className="PatientHomeHeading4">ourseleves as a medical </h3>
            <h3 className="PatientHomeHeading5">procedure that give </h3> 
            <h3 className="PatientHomeHeading6">far-reaching ophthalmology.</h3>

            <h1 className="PatientHomeHeading7">We Always Provide The</h1>
            <h1 className="PatientHomeHeading8">Best</h1>
            <h1 className="PatientHomeHeading9">Services</h1>

            <div className="PatientHomePageSecondPart">
                <br /><br />
                <div className="PatientDiv1">
                    <img src={myworkouticon} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Cataract Application</h2>
                    <p className="PatientDivPara">All Patient can upload their details in this button. Also they can upload their eye picture in this form.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/CreateCataractForm`;
                    }}>Application</button>

                </div>

                <div className="PatientDiv2">
                    <img src={exerciseicon} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Appoinment</h2>
                    <p className="PatientDivPara">All Patient can upload their details in this button. Also they can upload their eye picture in this form.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/userDashboard`;
                    }}>Appoinment</button>

                </div>

                <div className="PatientDiv3">
                    <img src={Marketicon} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Galucoma Detection</h2>
                    <p className="PatientDivPara">All Patient can upload their details in this button. Also they can upload their eye picture in this form.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/buyer`;
                    }}>Galucoma Detection</button>

                </div>

                <div className="PatientDiv4">
                    <img src={Edcontenticon} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Recovery Schedule</h2>
                    <p className="PatientDivPara">All Patient can upload their details in this button. Also they can upload their eye picture in this form.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/`;
                    }}>Recovery Schedule</button>

                </div>
                <br /><br />
            </div>
        </div>
    )
}