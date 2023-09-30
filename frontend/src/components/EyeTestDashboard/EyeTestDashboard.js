import React, { useContext } from "react";
import "../EyeTestDashboard/EyeTestDashboard.css";
import Dashboardimg from './testimg.jpg';
import UserContext from '../ContextComponents/ContextComponent';

function Dashboard() {

    const { user } = useContext(UserContext);
    const userID = user._id;

    return (
        <div className="TJDashboardBG">
            <br />
            <h1 className="TJDashboardHeading">EYE &nbsp;TEST MANAGEMENT SYSTEM</h1>
            <br /><br /><br />
            <div className="TJDashboardPara">
                <p className="TJsecondPara"><i>"We put your eye health first."</i></p>
                <p> Welcome to OptiVision's Eye Test Centre! <br />
                    You can upload the eye picture for relevant application<br />
                    and check the doctor response.<br />
                    Also, you can identify more eye diseases <br/>
                    by doing the quiz here. <br />
                </p>
            </div>
            <div>
                <img src={Dashboardimg} className="DashboardPic" />
            </div>
            <br /><br />
            <div className="TJDashboardSqr1">
                <br />
                <h2 className="TJSqrHeading">Cataract Application</h2>
                <p className="TJSqrDesc">You can find out if you have cataracts here at OptiVision. </p>


                <button className="TJDashboardButton" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `CreateCataractForm`;
                }}>CATARACT APPLICATION</button>

            </div>

            <div className="TJDashboardSqr2">
                <br />
                <h2 className="TJSqrHeading">View Cataract Details</h2>
                <p className="TJSqrDesc">View all your cataract images and details accordingly here. </p>

                <button className="TJDashboardButton" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/ViewCataractData/${userID}`;
                }}>VIEW CATARACT DETAILS</button>

            </div>

            <div className="TJDashboardSqr3">
                <br />
                <h2 className="TJSqrHeading">Start The Quiz</h2>
                <p className="TJSqrDesc">The quiz here can tell if you have any other eye disease. </p>

                <button className="TJDashboardButton" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/root`;
                }}>START QUIZ</button>

            </div>

            <br /><br />
        </div>
    )
}

export default Dashboard;