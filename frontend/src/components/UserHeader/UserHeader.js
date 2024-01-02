/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import "../UserHeader/UserHeader.css";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../ContextComponents/ContextComponent";

export default function UserHeader(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const hideHeader =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/add";

  if (hideHeader) {
    return null;
  }

  function logOut() {
    localStorage.clear();
    navigate("/login");
  }

  const HomepagesHandle = async () => {
    if (user.Fullname) {
      if (user.UserType === "Patient") {
        window.location.href = `/PatientHome/${user._id}`;
      }
    }
  };

  return (
    <>
      <div className="NavigationBarB">
        <nav className="NavigationBarB navbar navbar-expand-lg bg-body-tertiary">
          <div className="NavigationBarB container-fluid" id="PatientNavbar">
            <a
              className="NavigationBarB navbar-brand"
              id="PatientNavHeading"
              onClick={HomepagesHandle}
            >
              OptiVision
            </a>
            <button
              className="NavigationBarB navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="NavigationBarB navbar-toggler-icon"></span>
            </button>
            <div
              className="NavigationBarB collapse navbar-collapse"
              id="navbarNavDropdown"
            >
              <ul className="NavigationBarB navbar-nav" id="PatientNav">
                <li className="NavigationBarB nav-item" id="PatientNavitem">
                  <a
                    className="NavigationBarB nav-link"
                    id="PatientHeaderHd"
                    style={{ color: "#ffffff" }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/EyeTestMgmt`;
                    }}
                  >
                    EYE TEST
                  </a>
                </li>
                <li className="NavigationBarB nav-item" id="PatientNavitem">
                  <a
                    className="NavigationBarB nav-link"
                    id="PatientHeaderHd"
                    style={{ color: "#ffffff" }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/AppointmentMgmt`;
                    }}
                  >
                    APPOINTMENTS
                  </a>
                </li>
                <li className="NavigationBarB nav-item" id="PatientNavitem">
                  <a
                    className="NavigationBarB nav-link"
                    id="PatientHeaderHd"
                    style={{ color: "#ffffff" }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/Quiz`;
                    }}
                  >
                    QUIZ
                  </a>
                </li>
                <li className="NavigationBarB nav-item" id="PatientNavitem">
                  <a
                    className="NavigationBarB nav-link"
                    id="PatientHeaderHd"
                    style={{ color: "#ffffff" }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/GlaucomaForm`;
                    }}
                  >
                    GLAUCOMA DETECTION
                  </a>
                </li>
                <li className="NavigationBarB nav-item" id="PatientNavitem">
                  <a
                    className="NavigationBarB nav-link"
                    id="PatientHeaderHd"
                    style={{ color: "#ffffff" }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/PRecoveryView`;
                    }}
                  >
                    RECOVERY PLANS
                  </a>
                </li>

                <li className="Patientdropdown">
                  <div className="NavigationBarBarDropdown dropdown">
                    <button
                      className="NavigationBarB btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.Username}
                    </button>

                    <ul className="NavigationBarB dropdown-menu dropdown-menu-dark">
                      <li>
                        <a
                          className="NavigationBarB dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/profile/${user._id}`;
                          }}
                        >
                          My Profile
                        </a>
                      </li>
                      <li>
                        <a
                          className="NavigationBarB dropdown-item"
                          onClick={logOut}
                        >
                          Log out
                        </a>
                      </li>
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
