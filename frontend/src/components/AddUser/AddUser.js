import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AddUser/AddUser.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signup_logo from "../AddUser/signuppic2.jpg";
import signup_logo_1 from "../AddUser/signuppic3.jpg";
import signup_logo_2 from "../AddUser/signuppic4.jpg";

export default function AddUser() {
  const [Fullname, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [TelephoneNumber, setTelephoneNumber] = useState("");
  const [UserType, setUserType] = useState("");
  const [Gender, setGender] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      Fullname,
      Email,
      Address,
      TelephoneNumber,
      UserType,
      Gender,
      Username,
      Password,
      confirmpassword,
    };

    try {
      const response = await fetch("http://localhost:8040/auth/add", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({newUser}),
      });

      if (response.status === 200) {
        toast.success("Account Created Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate("/login");
      } else if (response.status === 403) {
        toast.warn("Email Already in use", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
        toast.error("Server cannot be reached, please try again later.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    }
  };

  return (
    <div className="reg_page">
      <div className="heading">
        <a href="/" className="SignupCompanyName">
          <h1 className="name">OptiVision</h1>
        </a>
        <ul class="nav justify-content-end nav-underline" id="IndexHeading">
          <li class="nav-item1" id="Login">
            <a class="nav-link" href="/login" id="LoginLink">
              LOGIN
            </a>
          </li>
          <li class="nav-item1" id="Signup">
            <a class="nav-link" href="/add" id="SignupLink">
              SIGNUP
            </a>
          </li>
        </ul>
      </div>

      <div className="loginDev1">
        <img src={signup_logo} alt="signup" className="signupImg" width="30%" />
        <img
          src={signup_logo_1}
          alt="signup"
          className="signupImg1"
          width="30%"
        />
        <img
          src={signup_logo_2}
          alt="signup"
          className="signupImg2"
          width="30%"
        />
        <br />
        <br />

        <div className="reg_form">
          <form onSubmit={handleSubmit}>
            <div>
              <h1 className="signup">Signup</h1>
            </div>
            <label htmlFor="fullname" className="signupheading">
              Full Name:{" "}
            </label>
            <br />
            <input
              type="text"
              className="signupforminput"
              placeholder="Full Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <br />
            <label htmlFor="email" className="signupheading">
              Email:{" "}
            </label>
            <br />
            <input
              type="email"
              className="signupforminput"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <br />
            <label htmlFor="address" className="signupheading">
              Address:{" "}
            </label>
            <br />
            <input
              type="text"
              className="signupforminput"
              placeholder="Address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
            <br />
            <label htmlFor="phonenumber" className="signupheading">
              Telephone Number:{" "}
            </label>
            <br />
            <input
              type="number"
              className="signupforminput"
              placeholder="Telephone Number"
              onChange={(e) => {
                setTelephoneNumber(e.target.value);
              }}
              required
            />
            <br />
            <label htmlFor="usertype" className="signupheading">
              User Type:{" "}
            </label>
            <br />
            <input
              type="radio"
              className="usertyperadio"
              name="usertype"
              value="Patient"
              onChange={(e) => {
                setUserType(e.target.value);
              }}
              required
            />
            &nbsp;&nbsp;
            <label htmlFor="Registered User" className="signupheading">
              Patient
            </label>
            <br />
            <label htmlFor="gender" className="signupheading">
              Gender:{" "}
            </label>
            <br />
            <input
              type="radio"
              className="genderradio"
              name="gender"
              value="Male"
              onChange={(e) => {
                setGender(e.target.value);
              }}
              required
            />
            &nbsp;&nbsp;
            <label htmlFor="Male" className="signupheading">
              Male
            </label>
            &nbsp;&nbsp;&nbsp;
            <input
              type="radio"
              className="genderradio"
              name="gender"
              value="Female"
              onChange={(e) => {
                setGender(e.target.value);
              }}
              required
            />
            &nbsp;&nbsp;
            <label htmlFor="Female" className="signupheading">
              Female
            </label>
            <br />
            <label htmlFor="username" className="signupheading">
              Username:{" "}
            </label>
            <br />
            <input
              type="text"
              className="signupforminput"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <br />
            <label htmlFor="password" className="signupheading">
              Password:{" "}
            </label>
            <br />
            <input
              type="password"
              className="signupforminput"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <br />
            <label htmlFor="password" className="signupheading">
              Confirm Password:{" "}
            </label>
            <br />
            <input
              type="password"
              className="signupforminput"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
            />
            <br />
            <br />
            <button type="submit" className="signupsubmit">
              SUBMIT
            </button>
            <label htmlFor="loginpage" className="signupheading">
              If you have already an account?
            </label>
            <br />
            <label htmlFor="redirect" className="signupheading1">
              please
            </label>
            &nbsp;&nbsp;
            <a href="/login">Login</a>&nbsp;&nbsp;
            <label htmlFor="redirect" className="signupheading1">
              here.
            </label>
          </form>
        </div>
      </div>
      <br />
      <br />
      <br />
      <p className="FNFooterBottom" style={{ color: "black" }}>
        © 2023 OptiVision All Rights Reserved.
      </p>
      <ToastContainer />
    </div>
  );
}
