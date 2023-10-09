import React, { useContext } from "react";
import { useLocation, useNavigate, useParams, } from "react-router-dom";
import '../DoctorHome/DoctorHomePage.css';
import UserContext from '../ContextComponents/ContextComponent';
import Docimg1 from "../DoctorHome/Dochomeimg1.jpg";
import Docimg2 from "../DoctorHome/Dochomeimg6.jpg";
import Docimg3 from "../DoctorHome/Dochomeimg5.jpg";
import Docimg4 from "../DoctorHome/Dochomeimg3.jpg";
import Docimg5 from "../DoctorHome/Dochomeimg2.jpg";
import Docimg6 from "../DoctorHome/Dochomeimg7.jpg";

export default function DoctorHome() {

    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams();

    const { user } = useContext(UserContext);

    //Log out function
    function logOut() {
        localStorage.clear();
    }

    return (
        <div className="doctor_page">
            <div>
                <br />
                <h1 className="doctorHomeHeading">Welcome to OptiVision Doctor Home</h1>
                <br />
                <div className="DoctorHomeImgPart1">
                    <table border="0" align="center">
                        <tr>
                            <td><img src={Docimg4} id="Docimg4" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td><img src={Docimg6} className="Docimg6" /></td>
                        </tr>
                    </table>
                </div>
                <br /><br />
                <p className="doctorHomePara">Welcome to the Doctor's corner! All the Doctors can access their respective management systems through here. Work Smart!</p>
                <br /><br />
                <div className="DoctorHomeImgPart">
                    <table border="0" align="center">
                        <tr>
                            <td><img src={Docimg1} className="Docimg1" />&nbsp;&nbsp;</td>
                            <td><img src={Docimg2} className="Docimg2" />&nbsp;&nbsp;</td>
                            <td><img src={Docimg3} className="Docimg3" /></td>
                        </tr>
                    </table>
                </div>
                <br /><br />
                <div className="DoctorHomePageSecond">
                    <br />
                    <div className="doctorDivDesc1">
                        <br />
                        <h2 className="doctorDivHeading"> Cataract Application </h2>
                        <p className="doctorDivPara">Trainers can access the recipe management system from here. All of the data related to recipes can be viewed by them at any time.</p>
                        <button className="doctorButton" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/ViewAllCataract`;
                        }}>Cataract Application</button>
                    </div>

                    <div className="doctorDivDesc2">
                        <br />
                        <h2 className="doctorDivHeading"> View Appointment </h2>
                        <p className="doctorDivPara">Trainers can access the educational content management system from here.</p>
                        <br />
                        <button className="doctorButton" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/DRelatedAppoinment`;
                        }}>View Appointment</button>
                    </div>

                    <div className="doctorDivDesc3">
                        <br />
                        <h2 className="doctorDivHeading"> Recovery Plan </h2>
                        <p className="doctorDivPara">Doctors can access there published prescriptions from here. They can view every prescription and related exercises they post from here.</p>

                        <button className="doctorButton" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/DCreatedRecoveryPlans`;
                        }}>Recovery Plan</button>
                    </div>
                    <br />
                </div>
                <div className="PatientHomePageThirdPart">
                    <img src={Docimg5} className="Docimg5" />
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
        </div>
    )
}