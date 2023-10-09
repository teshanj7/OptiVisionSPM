import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import '../Login/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../ContextComponents/ContextComponent';
import login_logo from "../Login/loginpic2.jpg";


export default function Login() {

    const history = useNavigate();
    const { setUser } = useContext(UserContext);

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [UserType, setUserType] = useState("");

    async function submit(e) {
        e.preventDefault();

        //Users
        let result = await fetch("http://localhost:8040/login", {
            method: 'post',
            body: JSON.stringify({ Email, Password, UserType }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        setUser(result);
        if (result.Fullname) {
            localStorage.setItem('newUser', JSON.stringify(result))
            if (result.UserType === "Patient") {
                history(`/PatientHome/${result._id}`, { state: { name: result.Fullname } })
            }
            else if (result.UserType === "Doctor") {
                history(`/DoctorHome/${result._id}`, { state: { id: result.Fullname } })
            }
        } else {
            toast.warn('Please enter correct details..!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(e);
        }

    }

    return (
        <div className="login_page">
            <div className="heading"><a href="/" className="loginCompanyName"><h1 className="log_sign_heading_name">OptiVision</h1></a>
                <ul class="nav justify-content-end nav-underline" id="IndexHeading">
                    <li class="nav-item1" id="Login">
                        <a class="nav-link" href="/login" id="LoginLink">LOGIN</a>
                    </li>
                    <li class="nav-item1" id="Signup">
                        <a class="nav-link" href="/add" id="SignupLink">SIGNUP</a>
                    </li>
                </ul>
            </div>
            <br /><br />
            <div className="loginDev1">
                <img src={login_logo} className="loginImg"/>
                <div className="login_form">

                    <form action="POST">
                        <div>
                            <h1 className="login">Login</h1>
                        </div>
                        <div>
                            <label for="UserType" className="loginheading">UserType: </label><br />
                            <select className="form-select-lg loginform-select" required={true} id="UserType" name="UserType" onChange={(e) => {
                                setUserType(e.target.value)
                            }} value={UserType} style={{ backgroundColor: "aliceblue", fontWeight: "500" }}>
                                <option defaultValue >Select Type</option>
                                <option value="Patient">Patient</option>
                                <option value="Doctor">Doctor</option>
                            </select>
                        </div>
                        <label for="email" className="loginheading">Email: </label><br />
                        <input type="email" className="loginforminput" placeholder="Email" onChange={(e) => {
                            setEmail(e.target.value)
                        }} value={Email} /><br />

                        <label for="password" className="loginheading">Password: </label><br />
                        <input type="password" className="loginforminput" placeholder="Password" onChange={(e) => {
                            setPassword(e.target.value)
                        }} value={Password} /><br /><br /><br />

                        <button type="submit" className="loginsubmit" onClick={submit}>LOGIN</button><br /><br />

                        <label for="loginpage" className="loginheading1">If you don’t have an account ?</label><br />
                        <label for="redirect" className="loginheading1">please</label>&nbsp;&nbsp;
                        <a href="/add">Signup</a>&nbsp;&nbsp;
                        <label for="redirect" className="loginheading1">here.</label>
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