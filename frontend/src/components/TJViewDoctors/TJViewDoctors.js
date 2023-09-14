import axios from "axios";
import React, { useState, useEffect } from "react";
import "./TJViewDoctors.css";

function ViewDoctors(){

    const [user, setUser] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, [])

    const getAllUsers = async () => {
        const res = await axios.get("http://localhost:8040/user");
        setUser(res.data);
    }

    const doctors = user.filter(user => user.UserType === 'Doctor');
    console.log(doctors);

    return(
        <div className="TJViewDocPage">
            <br/>
            <h1 className="TJViewHeading">Opticians at OptiVision</h1>
            <p className="TJViewPara">You can schedule an appointment with our reknown opticians at OptiVision for all your visual needs.</p>
            <br/>
            <table className="TJViewDocTable">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>Doctor Name</th>
                        <th style={{ textAlign: "center" }}>Email</th>
                        <th style={{ textAlign: "center" }}>Telephone Number</th>
                        <th style={{ textAlign: "center" }}>Gender</th>
                        <th style={{ textAlign: "center" }}>Schedule your booking</th>
                        <th style={{ textAlign: "center" }}>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors && doctors.map((item, index) => {

                        return (

                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.Fullname}</td>
                                <td>{item.Email}</td>
                                <td>{item.TelephoneNumber}</td>
                                <td>{item.Gender}</td>
                                <td>
                                    <button className="TJDocButton TJDocButton-update" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = "/addAppointment/" + item._id ;
                                    }}>Schedule appointment</button><br />
                                </td>
                                <td>4.5 ★</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br/><br/><br/><br/><br/><br/>
            <p className="TJViewPara">All rights reserved. - OptiVision (PVT-Ltd) </p>
            <br/>
        </div>
    )
}

export default ViewDoctors;