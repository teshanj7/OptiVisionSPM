import React, {useContext} from "react";
import { useLocation, useParams } from 'react-router-dom';
import UserContext from "../ContextComponents/ContextComponent";
import "../DoctorHeader/DoctorHeader.css";

function Header(props) {

    const location = useLocation();
    const params = useParams();
    const id = props.id

    const { user } = useContext(UserContext);

    //Log out function
    function logOut() {
        localStorage.clear();
        window.location.href = `/login`
    }

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
            if (user.UserType === "Doctor") {
                window.location.href = `/DoctorHome/${user._id}`;
            }
        }

    }

    return (

        <nav className="navbar navbar-expand-lg" style={{ background: "#008080" }} id="docNavfont">
            <div className="container-fluid" id="DocNavBar"> 
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <b><a className="navbar-brand" onClick={HomepagesHandle} style={{ color: "#ffffff" }} id="DocHomebtn">OptiVision</a></b>
                {/* change */}
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="DoctorNavitem">
                        <li className="nav-item">
                            <a className="nav-link" href="/ViewAllCataract" style={{ marginLeft: "3rem", color: "#ffffff" }}>ALL CATARACT APPLICATION&nbsp;&nbsp;&nbsp;&nbsp;</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/DRelatedAppoinment" style={{ color: "#ffffff" }}>ALL DOCTOR APPOINTMENT&nbsp;&nbsp;&nbsp;&nbsp;</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/DCreatedRecoveryPlans" style={{ color: "#ffffff" }}>CREATED RECOVERY PLANS&nbsp;&nbsp;&nbsp;&nbsp;</a>
                        </li>
                        
                        <li className="nav-item">
                            <a className="nav-link" href="/financialperformance" style={{ marginRight: "15rem", color: "#ffffff" }}>HELP&nbsp;&nbsp;&nbsp;&nbsp;</a>
                        </li>

                        <li>
                            <div className="NavigationBarBarDropdown dropdown" id="docDrop">
                                <button className="NavigationBarB btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                    {user.Username}
                                </button>

                                <ul className="NavigationBarB dropdown-menu dropdown-menu-dark">
                                    <li><a className="NavigationBarB dropdown-item DocProfilebtn" onClick={(e) => {
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
    )
}

export default Header;