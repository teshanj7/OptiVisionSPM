import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import '../PatientHomePage/Phomepage.css';
// import NavigationBarB from '../NavigationBarB/NavigationBarB'
import UserContext from '../ContextComponents/ContextComponent';
import dashboardpic from '../PatientHomePage/DashboardPic.png';
import cataract from '../PatientHomePage/cataract.png';
import appointment from '../PatientHomePage/appointment.png';
import glaucoma from '../PatientHomePage/glaucoma.png';
import recovery from '../PatientHomePage/recovery.png';
import patientpic from '../PatientHomePage/patient.jpg';

export default function PatientHome() {

    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams();

    const { user } = useContext(UserContext);
    // console.log(user)

    //Log out function
    function logOut() {
        localStorage.clear();
    }

    return (
        <div className="PatientHomePage">

            <br />
            <h1 className="PatientHomeHeading">Welcome to OptiVision</h1>

            <p className="PHPara1">Our motivation is to separate ourseleves as a medical procedure that give far-reaching ophthalmology.</p>

            <img src={dashboardpic} className="PHDashBoardPic" />
            <br /><br />
            <p className="PHPara2">We always thrive to provide you the best services for all your visual needs!</p>
            <p className="PHPara3">Our services are mentioned below</p>

            <div className="PatientHomePageSecondPart">
                <br />
                <div className="PatientDiv1">
                    <img src={cataract} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Eye Test</h2>
                    <p className="PatientDivPara">All Patient can upload their details in this button. Also they can upload their eye picture in this form.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/EyeTestMgmt`;
                    }}>Eye Test</button>

                </div>

                <div className="PatientDiv2">
                    <img src={appointment} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Appoinments</h2>
                    <p className="PatientDivPara">All Patient can upload their details in this button. Also they can upload their eye picture in this form.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/AppointmentMgmt`;
                    }}>Appoinments</button>

                </div>

                <div className="PatientDiv3">
                    <img src={glaucoma} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Glaucoma Detection</h2>
                    <p className="PatientDivPara">All Patient can upload their details in this button. Also they can upload their eye picture in this form.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/GlaucomaForm`;
                    }}>Glaucoma Detection</button>

                </div>

                <div className="PatientDiv4">
                    <img src={recovery} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Recovery Plans</h2>
                    <p className="PatientDivPara">All Patient can upload their details in this button. Also they can upload their eye picture in this form.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/PRecoveryView`;
                    }}>Recovery Schedule</button>
                        
                </div>
                <br />
            </div>

            <div className="PatientHomePageThirdPart">
                <img src={patientpic} className="PHDashBoardPic2" />
                <div className="ph3div">
                    <h2 className="PatientHomeHeading2"> Find OptiVision at;</h2>
                    <p className="PH3Para"> 🚩123/A, <br /> Sir Manula Gunatilleke Av, <br /> Manugama. <br /></p>
                    <p className="PH3Para"> ☎ Telephone: </p>
                    <p className="PH3Para2">+9411-2375843 / +9411-57584543</p>
                    <p className="PH3Para"> @ Email: </p>
                    <p className="PH3Para2">contact@optivision.lk</p>
                </div>

                <br />
            </div>
            <br /><br />
        </div>
    )
}