import React, {  useContext } from "react";
import "../UserFooter/FNfooter.css";
import FNfootericon from "../UserFooter/footerpic.png";
import { useLocation } from "react-router-dom";
import UserContext from "../ContextComponents/ContextComponent";

function Footer() {

    const location = useLocation()
    const { user } = useContext(UserContext);

    const hideFooter = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/add';

    if (hideFooter) {
        return null; // Render nothing if header should be hidden
    }

    //Home pages Control
    const HomepagesHandle = async () => {
        if (user.Fullname) {
            if (user.UserType === "Patient") {
                window.location.href = `/PatientHome/${user._id}`;
            }
        }

    }

    return (
        <div className="FNFooterDiv">
            <footer className="FNExactFooter">
                <div>

                    <img src={FNfootericon} className="FNFooterPic" onClick={HomepagesHandle}/>
                </div>
                <div className="FNFooterHeading">
                    <p onClick={HomepagesHandle}>OptiVision</p>
                </div>
                <div>
                    <p className="FNFooterHead1" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/PatientHome/${user._id}`;
                    }}>HOME</p>


                    <p className="FNFooterHead2" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/EyeTestMgmt`;
                    }}>EYE TESTS</p>

                    <p className="FNFooterHead3" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/GlaucomaForm`;
                    }}>GLAUCOMA DETECTION</p>

                    <p className="FNFooterHead4" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/AppointmentMgmt`;
                    }}>APPOINTMENTS</p>

                    <p className="FNFooterHead5" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/PRecoveryView`;
                    }}>RECOVERY PLAN</p>
                </div>
                <div>
                    <hr className="FNHr"></hr>
                </div>
                <div className='footer-bottom'>
                    <p className='FNFooterBottom' style={{ color: "white" }}>
                        © 2023 OptiVision All Rights Reserved.
                    </p>

                </div>

            </footer>

        </div>

    )
}

export default Footer;