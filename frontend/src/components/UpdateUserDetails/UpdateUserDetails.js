import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../UpdateUserDetails/UpdateUserDetails.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../ContextComponents/ContextComponent";

export default function UpdateUserDetails() {
  const history = useNavigate();
  const { user } = useContext(UserContext);
  const storedUser = localStorage.getItem("User");
  const token = storedUser ? JSON.parse(storedUser).token : null;

  const navigate = useNavigate();

  const [Fullname, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [TelephoneNumber, setTelephoneNumber] = useState("");
  const [UserType, setUserType] = useState("");
  const [Gender, setGender] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const params = useParams();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8040/user/get/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        const userData = await response.json();

        setName(userData.user.Fullname);
        setEmail(userData.user.Email);
        setAddress(userData.user.Address);
        setTelephoneNumber(userData.user.TelephoneNumber);
        setUserType(userData.user.UserType);
        setGender(userData.user.Gender);
        setUsername(userData.user.Username);
        setPassword(userData.user.Password);
      } else if (response.status === 500) {
        toast.error("Error getting details", {
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

  const updateUser = async () => {
    if(
        window.confirm("Are you sure that you want to update the details?")
    )
    try {
      const response = await fetch(
        `http://localhost:8040/user/update/${params.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            Fullname,
            Email,
            Address,
            TelephoneNumber,
            UserType,
            Gender,
            Username,
            Password,
          }),
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(response.status === 200) {
        navigate(`/profile/${user._id}`);
      }else if(response.status === 500){
        toast.error("Update was unsuccessfull", {
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

  //Home pages Control
  const HomepagesHandle = async () => {
    if (Fullname) {
      if (UserType === "Patient") {
        history(`/PatientHome/${params.id}`);
        window.location.href = `/PatientHome/${params.id}`;
      } else if (UserType === "Doctor") {
        history(`/DoctorHome/${params.id}`);
        window.location.href = `/DoctorHome/${params.id}`;
      }
    }
  };

  return (
    <div className="update_page">
      <br />
      <div className="rec">
        <h1 className="updateprofile">User Profile</h1>
      </div>
      <div className="view_form">
        <form>
          <label htmlFor="fullname" className="viewheading">
            Full Name:{" "}
          </label>
          <br />
          <input
            type="text"
            className="viewforminput"
            value={Fullname}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="email" className="viewheading">
            Email:{" "}
          </label>
          <br />
          <input
            type="email"
            className="viewforminput"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <label htmlFor="address" className="viewheading">
            Address:{" "}
          </label>
          <br />
          <input
            type="text"
            className="viewforminput"
            value={Address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <br />
          <label htmlFor="phonenumber" className="viewheading">
            Telephone Number:{" "}
          </label>
          <br />
          <input
            type="number"
            className="viewforminput"
            value={TelephoneNumber}
            onChange={(e) => {
              setTelephoneNumber(e.target.value);
            }}
          />
          <br />
          <label htmlFor="usertype" className="viewheading">
            User Type:{" "}
          </label>
          <br />
          <input
            type="text"
            className="viewforminput"
            value={UserType}
            onChange={(e) => {
              setUserType(e.target.value);
            }}
            readOnly
          />
          <br />
          <label htmlFor="gender" className="viewheading">
            Gender:{" "}
          </label>
          <br />
          <input
            type="text"
            className="viewforminput"
            value={Gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
          <br />
          <label htmlFor="username" className="viewheading">
            Username:{" "}
          </label>
          <br />
          <input
            type="text"
            className="viewforminput"
            value={Username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            readOnly
          />
          <br />
          <label htmlFor="password" className="viewheading">
            Password:{" "}
          </label>
          <br />
          <input
            type="password"
            className="viewforminput"
            value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <button className="userupdatebtn" onClick={updateUser}>
            Update
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="userupdatecancelbtn"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/profile/${params.id}`;
            }}
          >
            Cancel
          </button>
        </form>
        <br />
      </div>
      <ToastContainer />

      <br />
      <br />
    </div>
  );
}
