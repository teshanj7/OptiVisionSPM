import React, {useContext} from "react";
import "../DoctorFooter/DoctorFooter.css";
import { useLocation} from "react-router-dom";
import FNfootericon from "../UserFooter/footerpic.png";
import UserContext from "../ContextComponents/ContextComponent";

function Footer() {

    const location = useLocation()
    const { user } = useContext(UserContext);

    //Home pages Control
    const HomepagesHandle = async () => {
        if (user.Fullname) {
            if (user.UserType === "Doctor") {
                window.location.href = `/DoctorHome/${user._id}`;
            }
        }

    }

    const hideFooter = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/add';

    if (hideFooter) {
        return null; // Render nothing if header should be hidden
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
                    <p className="FNFooterHead1" onClick={HomepagesHandle}>HOME</p>


                    <p className="FNFooterHead2" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/ViewAllCataract`;
                    }}>ALL CATARACT</p>

                    <p className="FNFooterHead3" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/DRelatedAppoinment`;
                    }}>ALL APPOINTMENTS</p>

                    <p className="FNFooterHead4" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/DCreatedRecoveryPlans`;
                    }}>CREATE RECOVERY PLAN</p>

                    <p className="FNFooterHead5" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `#`;
                    }}>HELP</p>
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