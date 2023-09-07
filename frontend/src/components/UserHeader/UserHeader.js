import React, {  useContext } from 'react';
import '../UserHeader/UserHeader.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserContext from "../ContextComponents/ContextComponent";

export default function UserHeader(props) {

    const location = useLocation()
    const params = useParams();
    const id = props.id

    const { user } = useContext(UserContext);
    console.log(user)

    
    const hideHeader = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/add';

    if (hideHeader) {
        return null; // Render nothing if header should be hidden
    }

    //Log out function
    function logOut() {
        localStorage.clear();
    }

    //Home pages Control
    const HomepagesHandle = async () => {
        if (user.Fullname) {
            if (user.UserType === "Patient") {
                window.location.href = `/PatientHome/${user._id}`;
            }
            // else if (user.UserType === "Doctor") {
            //     // history(`/trainer_home/${user._id}`, { state: { id:user.Fullname } })
            //     window.location.href = `/trainer_home/${user._id}`;
            // }
        }

    }

    return (
        <>
            <div className='NavigationBarB'>
                <nav className="NavigationBarB navbar navbar-expand-lg bg-body-tertiary">
                    <div className="NavigationBarB container-fluid" id='PatientNavbar'>
                        <a className="NavigationBarB navbar-brand" id='PatientNavHeading' onClick={HomepagesHandle}>OptiVision</a>
                        <button className="NavigationBarB navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="NavigationBarB navbar-toggler-icon"></span>
                        </button>
                        <div className="NavigationBarB collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="NavigationBarB navbar-nav" id='PatientNav'>
                                <li className="NavigationBarB nav-item" id="PatientNavitem">
                                    <a className="NavigationBarB nav-link" style={{ color: "#ffffff" }} onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/CreateCataractForm`
                                    }}>CATARACT APPLICATION</a>
                                </li>
                                <li className="NavigationBarB nav-item" id='PatientNavitem'>
                                    <a className="NavigationBarB nav-link" style={{ color: "#ffffff" }} onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/ViewCataractData/${user._id}`
                                    }}>VIEW CATARACT DETAILS</a>
                                </li>
                                <li className="NavigationBarB nav-item" id='PatientNavitem'>
                                    <a className="NavigationBarB nav-link" style={{ color: "#ffffff" }} onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/AppointmentMgmt`
                                    }}>APPOINTMENT</a>
                                </li>
                                <li className="NavigationBarB nav-item" id='PatientNavitem'>
                                    <a className="NavigationBarB nav-link" style={{ color: "#ffffff" }} onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/Quiz`
                                    }}>QUIZ</a>
                                </li>
                                <li className="NavigationBarB nav-item" id='PatientNavitem'>
                                    <a className="NavigationBarB nav-link" style={{ color: "#ffffff" }} onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/mainNT`
                                    }}>GLAUCOMA DETECTION</a>
                                </li>
                                <li className="NavigationBarB nav-item" id='PatientNavitem'>
                                    <a className="NavigationBarB nav-link" style={{ color: "#ffffff" }} onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/RUVA`
                                    }}>RECOVERY PLAN</a>
                                </li>

                                <li className='Patientdropdown'>
                                    <div className="NavigationBarBarDropdown dropdown">
                                        <button className="NavigationBarB btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                            {user.Username}
                                        </button>

                                        <ul className="NavigationBarB dropdown-menu dropdown-menu-dark">
                                            <li><a className="NavigationBarB dropdown-item" onClick={(e) => {
                                                e.preventDefault();
                                                window.location.href = `/profile/${user._id}`
                                            }}>My Profile</a></li>
                                            <li><a className="NavigationBarB dropdown-item" href="/login">Log out</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
        </>
    );
}

