import React from "react";
import "../UserFooter/FNfooter.css";
import FNfootericon from "../UserFooter/footerpic.png";
import { useLocation } from "react-router-dom";


function Footer() {

    const location = useLocation()

    const hideFooter = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/add';

    if (hideFooter) {
        return null; // Render nothing if header should be hidden
    }

    return (
        <div className="FNFooterDiv">
            <footer className="FNExactFooter">
                <div>

                    <img src={FNfootericon} className="FNFooterPic" />
                </div>
                <div className="FNFooterHeading">
                    <p>OptiVision</p>
                </div>
                <div>
                    <p className="FNFooterHead1" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `#`;
                    }}>HOME</p>


                    <p className="FNFooterHead2" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `#`;
                    }}>EYE TESTS</p>

                    <p className="FNFooterHead3" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `#`;
                    }}>GLAUCOMA DETECTION</p>

                    <p className="FNFooterHead4" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/AppointmentMgmt`;
                    }}>APPOINTMENTS</p>

                    <p className="FNFooterHead5" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `#`;
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