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
            <h1 className="PatientHomeHeading">Don't Stop Till <br /> You Drop</h1>
            <br /><br />
            <p className="PatientHomePara1">The best way to</p>
            <p className="PatientHomePara2">make sure your body and mind</p>
            <p className="PatientHomePara3">are ready for</p>
            <p className="PatientHomePara4">work is to wake them up with a good workout.</p>
            <br />
            <p className="PatientHomeDescription">Welcome to our fitness website! Discover a wide range <br /> of resources, including workout plans, nutrition advice, and <br />expert tips, to help you achieve your health and wellness goals. <br /><b style={{ color: "rgb(242, 121, 8)" }}>Join our community and start your fitness journey today!</b></p>
            <br /><br /><br />

            <div className="PatientHomePageSecondPart">
                <br /><br />
                <div className="PatientDiv1">
                    <img src={myworkouticon} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">My Workout</h2>
                    <p className="PatientDivPara">All Registered Users, Trainers, Sellers and Administrators are listed here. All of the data related to them can be viewed by an administrator at any time.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/MyWorkouts`;
                    }}>MY WORKOUTS</button>

                </div>

                <div className="PatientDiv2">
                    <img src={exerciseicon} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Exercises</h2>
                    <p className="PatientDivPara">All Registered Users, Trainers, Sellers and Administrators are listed here. All of the data related to them can be viewed by an administrator at any time.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/userDashboard`;
                    }}>EXERCISES</button>

                </div>

                <div className="PatientDiv3">
                    <img src={Marketicon} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">MarketPlace</h2>
                    <p className="PatientDivPara">All Registered Users, Trainers, Sellers and Administrators are listed here. All of the data related to them can be viewed by an administrator at any time.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/buyer`;
                    }}>MARKETPLACE</button>

                </div>

                <div className="PatientDiv4">
                    <img src={Edcontenticon} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Educational Content</h2>
                    <p className="PatientDivPara">All Registered Users, Trainers, Sellers and Administrators are listed here. All of the data related to them can be viewed by an administrator at any time.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/Bview`;
                    }}>EDUCATIONAL CONTENT</button>

                </div>

                <div className="PatientDiv5">
                    <img src={Nutritionicon} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Nutrition Plans</h2>
                    <p className="PatientDivPara">All Registered Users, Trainers, Sellers and Administrators are listed here. All of the data related to them can be viewed by an administrator at any time.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/mainNT`;
                    }}>NUTRITION PLANS</button>

                </div>

                <div className="PatientDiv6">
                    <img src={Recipesicon} className="PatientDivIcon" />
                    <h2 className="PatientDivHeading">Recipes</h2>
                    <p className="PatientDivPara">All Registered Users, Trainers, Sellers and Administrators are listed here. All of the data related to them can be viewed by an administrator at any time.</p>
                    <button className="PatientHomeButton" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/RUVA`;
                    }}>RECIPES</button>

                </div>
                <br /><br />
            </div>
        </div>
    )
}