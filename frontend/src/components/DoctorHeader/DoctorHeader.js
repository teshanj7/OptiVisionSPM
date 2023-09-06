import React, {useContext} from "react";
import { useLocation, useParams } from 'react-router-dom';
import UserContext from "../ContextComponents/ContextComponent";

function Header(props) {

    const location = useLocation();
    const params = useParams();
    const id = props.id

    const { user } = useContext(UserContext);
    console.log(user)

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
            // else if (user.UserType === "Doctor") {
            //     // history(`/trainer_home/${user._id}`, { state: { id:user.Fullname } })
            //     window.location.href = `/trainer_home/${user._id}`;
            // }
        }

    }

    return (

        <nav className="navbar navbar-expand-lg" style={{ background: "#333333" }}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <b><a className="navbar-brand" onClick={HomepagesHandle} style={{ color: "#99FF33" }}>FitCrib</a></b>
                {/* change */}
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/ViewAllCataract" style={{ color: "#99FF33" }}>ALL CATARACT APPLICATION</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/finance" style={{ color: "#99FF33" }}>APPOINTMENT</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/addTransaction" style={{ color: "#99FF33" }}>CREATE A RECOVERY PLAN</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/viewTransaction" style={{ color: "#99FF33" }}>VIEW TRANSACTION</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/financialperformance" style={{ color: "#99FF33" }}>FINANCIAL PERFORMANCE</a>
                        </li>
                        <li>
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
    )
}

export default Header;