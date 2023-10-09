import React, { useState } from "react";
import '../AddUser/AddUser.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    function sendData(e) {
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
            confirmpassword
        }

        if (Password !== confirmpassword) {
            toast.error('Passwords do not match...!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        axios.post("http://localhost:8040/user/add", newUser).then(() => {
            alert("User Added")
            window.location.href = `/login`;
        }).catch((err) => {
            alert(err)
        })
    }


    return (
        <div className="reg_page">
            <div className="heading">
                <a href="/" className="SignupCompanyName"><h1 className="name" >OptiVision</h1></a>
                <ul class="nav justify-content-end nav-underline" id="IndexHeading">
                    <li class="nav-item1" id="Login">
                        <a class="nav-link" href="/login" id="LoginLink">LOGIN</a>
                    </li>
                    <li class="nav-item1" id="Signup">
                        <a class="nav-link" href="/add" id="SignupLink">SIGNUP</a>
                    </li>
                </ul>
            </div>

            <div className="loginDev1">
                <img src={signup_logo} className="signupImg" width="30%" />
                <img src={signup_logo_1} className="signupImg1" width="30%" />
                <img src={signup_logo_2} className="signupImg2" width="30%" />
                <br /><br />

                <div className="reg_form">
                    <form onSubmit={sendData}>
                        <div>
                            <h1 className="signup">Signup</h1>
                        </div>
                        <label for="fullname" className="signupheading">Full Name: </label><br />
                        <input type="text" className="signupforminput" placeholder="Full Name" onChange={(e) => {
                            setName(e.target.value);
                        }} required /><br />

                        <label for="email" className="signupheading">Email: </label><br />
                        <input type="email" className="signupforminput" placeholder="Email" onChange={(e) => {
                            setEmail(e.target.value);
                        }} required /><br />

                        <label for="address" className="signupheading">Address: </label><br />
                        <input type="text" className="signupforminput" placeholder="Address" onChange={(e) => {
                            setAddress(e.target.value);
                        }} required /><br />

                        <label for="phonenumber" className="signupheading">Telephone Number: </label><br />
                        <input type="number" className="signupforminput" placeholder="Telephone Number" onChange={(e) => {
                            setTelephoneNumber(e.target.value);
                        }} required /><br />

                        <label for="usertype" className="signupheading">User Type: </label><br />
                        <input type="radio" className="usertyperadio" name="usertype" value="Patient" onChange={(e) => {
                            setUserType(e.target.value);
                        }} required />&nbsp;&nbsp;
                        <label for="Registered User" className="signupheading">Patient</label>
                        <br />
                        <label for="gender" className="signupheading">Gender: </label><br />
                        <input type="radio" className="genderradio" name="gender" value="Male" onChange={(e) => {
                            setGender(e.target.value);
                        }} required />&nbsp;&nbsp;
                        <label for="Male" className="signupheading">Male</label>
                        &nbsp;&nbsp;&nbsp;
                        <input type="radio" className="genderradio" name="gender" value="Female" onChange={(e) => {
                            setGender(e.target.value);
                        }} required />&nbsp;&nbsp;
                        <label for="Female" className="signupheading">Female</label><br />

                        <label for="username" className="signupheading">Username: </label><br />
                        <input type="text" className="signupforminput" placeholder="Username" onChange={(e) => {
                            setUsername(e.target.value);
                        }} required /><br />

                        <label for="password" className="signupheading">Password: </label><br />
                        <input type="password" className="signupforminput" placeholder="Password" onChange={(e) => {
                            setPassword(e.target.value);
                        }} required /><br />

                        <label for="password" className="signupheading">Confirm Password: </label><br />
                        <input type="password" className="signupforminput" placeholder="Confirm Password" onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }} required /><br />

                        <input type="checkbox" className="signupcheckbox" required />&nbsp;&nbsp;
                        <label for="checkbox" className="signupheading">Accept Privacy Policy and Terms</label><br /><br />

                        <button type="submit" className="signupsubmit">SUBMIT</button>
                        <label for="loginpage" className="signupheading">If you have already an account?</label><br />
                        <label for="redirect" className="signupheading1">please</label>&nbsp;&nbsp;
                        <a href="/login">Login</a>&nbsp;&nbsp;
                        <label for="redirect" className="signupheading1">here.</label>
                    </form>
                </div>
            </div>
            <br/><br/><br/>
            <p className='FNFooterBottom' style={{ color: "black" }}>
                © 2023 OptiVision All Rights Reserved.
            </p>
            <ToastContainer />
        </div>
    )
}