import React from "react";
import './TJAppointmentDashboard.css';
import dashboardpic from "./eye.png";

function Dashboard(){

    return(
<div className="TJDashboardBG">
            <br/>
            <h1 className="TJDashboardHeading">APPOINTMENT MANAGEMENT SYSTEM</h1>
            <br/><br/><br/>
            <div className="TJDashboardPara">
                <p className="TJsecondPara"><i>"Everyone deserves to see"</i></p>
                <p> Welcome to OptiVision's Appointment Centre! <br/>
                    You can view the doctors for your , <br/>
                    relevant needs and schedule an appointment<br/>
                    at your own ease. <br/>
                </p>
            </div>
            <div>
                <img src={dashboardpic} className="TJDashboardPic"/>
            </div>
            <br/><br/>
            <div className="TJDashboardSqr1">
                <br/>
                <h2 className="TJSqrHeading">View Opticians</h2>
                <p className="TJSqrDesc">View all the reputed opticians available here at OptiVision. </p>
                
                
                    <button className="TJDashboardButton" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            window.location.href=`/ViewAllOpticians`;
                                                                            }}>VIEW DOCTORS</button>
                
            </div>

            <div className="TJDashboardSqr2">
                <br/>
                <h2 className="TJSqrHeading">View My Appointments</h2>
                <p className="TJSqrDesc">View all your scheduled appointments accordingly here. </p>
                
                <button className="TJDashboardButton"onClick={(e) => {
                                                                    e.preventDefault();
                                                                    window.location.href=`/viewAllAppointments`;
                                                                    }}>VIEW ALL</button>

            </div>

            <div className="TJDashboardSqr3">
                <br/>
                <h2 className="TJSqrHeading">View FAQ's</h2>
                <p className="TJSqrDesc">View frequently asked questions regarding appointments here. </p>
              
                <button className="TJDashboardButton" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        window.location.href=`/AppointmentFaq`;
                                                                        }}>VIEW FAQs</button>

            </div>

            <br/><br/>
        </div>
    )
}

export default Dashboard;