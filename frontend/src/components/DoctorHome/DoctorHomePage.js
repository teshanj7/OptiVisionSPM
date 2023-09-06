import React, {useContext} from "react";
import { useLocation, useNavigate, useParams,} from "react-router-dom";
import '../DoctorHome/DoctorHomePage.css';
import UserContext from '../ContextComponents/ContextComponent';

export default function DoctorHome() {

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
        <div className="doctor_page">
            <div>
                <br/>
                <h1 className="doctorHomeHeading">Doctor Home</h1>
                <br/><br/>
                <p className="doctorHomePara">Welcome to the Doctor's corner! All the Doctors can access their respective management systems through here. Work Smart!</p>
                <br/><br/>
                <div className="doctorDivDesc1">
                    <br/>
                    <h2 className="doctorDivHeading"> Cataract Application </h2>
                    <p className="doctorDivPara">Trainers can access the recipe management system from here. All of the data related to recipes can be viewed by them at any time.</p>
                    <button className="doctorButton" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            window.location.href=`/ViewAllCataract`;
                                                                            }}>Cataract Application</button>
                </div>

                <div className="doctorDivDesc2">
                    <br/>
                    <h2 className="doctorDivHeading"> View Appointment </h2>
                    <p className="doctorDivPara">Trainers can access the educational content management system from here.</p>
                    <br/>
                    <button className="doctorButton" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            window.location.href=`/educational`;
                                                                            }}>View Appointment</button>
                </div>

                <div className="doctorDivDesc3">
                    <br/>
                    <h2 className="doctorDivHeading"> Recovery Plan </h2>
                    <p className="doctorDivPara">Trainers can access the exercises management system from here. They can view everything they post from here.</p> 
                    
                    <button className="doctorButton" onClick={(e) => {
                                                                            e.preventDefault();
                                                                            window.location.href=`/trainerFeed`;
                                                                            }}>Recovery Plan</button>
                </div>
                <br/><br/><br/><br/>
            </div>
        </div>
    )
}