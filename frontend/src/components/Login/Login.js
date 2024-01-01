import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../ContextComponents/ContextComponent";
import login_logo from "../Login/loginpic2.jpg";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [UserType, setUserType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8040/auth/login", {
        method: "post",
        body: JSON.stringify({ Email, Password, UserType }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setUser(data.user);

        if (data.user) {
          localStorage.setItem("User", JSON.stringify(data));

          if (data.user.UserType === "Patient") {
            navigate(`/PatientHome/${data.user._id}`, {
              state: { name: data.user.Fullname },
            });
          } else if (data.user.UserType === "Doctor") {
            navigate(`/DoctorHome/${data.user._id}`, {
              state: { id: data.user.Fullname },
            });
          }
        }
      } else if(response.status === 404){
        toast.warn("Email not found", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }else if(response.status === 401){
        toast.warn("Password or User Type incorrect", {
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
    <div className="login_page">
      <div className="heading">
        <a href="/" className="loginCompanyName">
          <h1 className="log_sign_heading_name">OptiVision</h1>
        </a>
        <ul className="nav justify-content-end nav-underline" id="IndexHeading">
          <li className="nav-item1" id="Login">
            <a className="nav-link" href="/login" id="LoginLink">
              LOGIN
            </a>
          </li>
          <li className="nav-item1" id="Signup">
            <a className="nav-link" href="/add" id="SignupLink">
              SIGNUP
            </a>
          </li>
        </ul>
      </div>
      <br />
      <br />
      <div className="loginDev1">
        <img src={login_logo} alt="Login" className="loginImg" />
        <div className="login_form">
          <form onSubmit={handleSubmit}>
            <div>
              <h1 className="login">Login</h1>
            </div>
            <div>
              <label htmlFor="UserType" className="loginheading">
                UserType:{" "}
              </label>
              <br />
              <select
                className="form-select-lg loginform-select"
                required={true}
                id="UserType"
                name="UserType"
                onChange={(e) => {
                  setUserType(e.target.value);
                }}
                value={UserType}
                style={{ backgroundColor: "aliceblue", fontWeight: "500" }}
              >
                <option defaultValue>Select Type</option>
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>
            <label htmlFor="email" className="loginheading">
              Email:{" "}
            </label>
            <br />
            <input
              type="email"
              className="loginforminput"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={Email}
            />
            <br />
            <label htmlFor="password" className="loginheading">
              Password:{" "}
            </label>
            <br />
            <input
              type="password"
              className="loginforminput"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={Password}
            />
            <br />
            <br />
            <br />
            <button type="submit" className="loginsubmit">
              LOGIN
            </button>
            <br />
            <br />
            <label htmlFor="loginpage" className="loginheading1">
              If you don’t have an account ?
            </label>
            <br />
            <label htmlFor="redirect" className="loginheading1">
              please
            </label>
            &nbsp;&nbsp;
            <a href="/add">Signup</a>&nbsp;&nbsp;
            <label htmlFor="redirect" className="loginheading1">
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
