import React, { useState, useEffect } from "react";
import './TJViewAllAppointment.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';
import moment from "moment";

function ViewAll() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAppointments();
    }, [])

    const getAppointments = async () => {
        const response = await axios.get("http://localhost:8040/Appointment");

        if (response.status === 200) {
            setData(response.data);
        }
    }

    //delete
    const onDeleteAppointment = async (_id) => {
        if (window.confirm("Are you sure that you want to delete this appointment?")) {
            const response = await axios.delete(`http://localhost:8040/Appointment/delete/${_id}`);
            if (response.status === 200) {
                toast.success("Appointment deleted!");
                getAppointments();
            }
        }
    }

    //search
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8040/Appointment/search/${key}`);
            result = await result.json()

            if (result) {
                setData(result)
            }

        } else {
            getAppointments();
        }
    }

    console.log(data);
    return (

        <div className="TJViewAppointmentPage">
            <br />
            <h1 className="TJViewHeading">MY APPOINTMENTS</h1>
            {/* Search Appointment*/}
            <input type="" placeholder="Search Transaction" className="TJViewSearch" onChange={searchHandle} /><FaSearch className="TJSearchIcon" />
            <br /><br />

            <button type="submit" className="TJViewCreateBtn" onClick={(e) => {
                e.preventDefault();
                window.location.href = `/ViewAllOpticians`;
            }}>CREATE AN APPOINTMENT</button> <br /><br />

            <table className="TJViewTable">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>Full Name</th>
                        <th style={{ textAlign: "center" }}>Age</th>
                        <th style={{ textAlign: "center" }}>Email</th>
                        <th style={{ textAlign: "center" }}>Reason of Appoinment</th>
                        <th style={{ textAlign: "center" }}>Doctor Name</th>
                        <th style={{ textAlign: "center" }}>Date</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {

                        return (

                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.fullName}</td>
                                <td>{item.age}</td>
                                <td>{item.email}</td>
                                <td>{item.reasonOfApp}</td>
                                <td>{item.docName}</td>
                                <td>{moment(item.date).format('YYYY-MM-DD')}</td>
                                <td>
                                    <button className="TJButton TJButton-update" variant="primary" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/updateAppointment/${item._id}`;
                                    }}>Update</button><br />

                                    <button className="TJButton TJButton-delete" onClick={() => onDeleteAppointment(item._id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br /><br />
            <ToastContainer />
        </div>
    )

}

export default ViewAll;