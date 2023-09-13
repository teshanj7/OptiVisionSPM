// AppointmentsComponent.js

import React, { useState, useEffect, useContext } from "react";
import UserContext from "../ContextComponents/ContextComponent"; // Import your UserContext or context containing the doctor's name
import axios from "axios"; // Assuming you use axios for HTTP requests
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./DCreatedRecoveryPlans.css";
// ...

export default function AppointmentsComponent() {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState(user.Username);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [doctorName, appointments]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8040/appointment");
      if (Array.isArray(response.data)) {
        setAppointments(response.data);
      } else {
        console.error("Appointments data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching appointments: ", error);
    }
  };

  const filterAppointments = () => {
    const filtered = appointments.filter(
      (appointment) => appointment.docName === doctorName
    );
    setFilteredAppointments(filtered);
  };

  const handleCreateRecoveryPlan = (fullName, reasonOfApp) => {
    // Perform any actions or condition checks before navigating
    if (doctorName) {
      navigate('/NewRecoveryPlan');
    } else {
      // Handle other cases or show a message
    }
  };

  return (
    <div>
      <h2 style={{ margin: "2rem", borderRadius: "10px", backgroundColor: "#778899" }}>Appointments for Dr.{doctorName}</h2>
      {filteredAppointments.map((appointment) => (
        <Card key={appointment._id} style={{ margin: "2rem", borderRadius: "10px", backgroundColor: "#C0C0C0" }}>
          <Card.Body className="p-4 DCreatedPlans" style={{ margin: "2rem", borderRadius: "10px" }}>
            <Card.Title className="lead fw-normal mb-2 DCreatedPlans">Patient Name -: {appointment.fullName}</Card.Title>
            <Card.Text>
              Age: {appointment.age}
              <br />
              Email: {appointment.email}
              <br />
              Reason for Appointment: {appointment.reasonOfApp}
              <br />
              Date: {new Date(appointment.date).toLocaleDateString()}
            </Card.Text>
            <Button
              variant="primary"
              onClick={() =>
                handleCreateRecoveryPlan(
                  appointment.fullName,
                  appointment.reasonOfApp
                )
              }
            >
              Create a Recovery Plan
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
