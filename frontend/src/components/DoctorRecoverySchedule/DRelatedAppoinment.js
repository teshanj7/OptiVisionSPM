// AppointmentsComponent.js

import React, { useState, useEffect, useContext } from "react";
import UserContext from "../ContextComponents/ContextComponent"; // Import your UserContext or context containing the doctor's name
import axios from "axios"; // Assuming you use axios for HTTP requests
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"; // Import Form component
import FormControl from "react-bootstrap/FormControl"; // Import FormControl component
import { useNavigate } from "react-router-dom";
import "./DCreatedRecoveryPlans.css";
// ...

export default function AppointmentsComponent() {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState(user.Fullname);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();

    // Update the searchQuery state
    setSearchQuery(query);

    // Call the filterAppointments function to filter the appointments
    filterAppointments(query);
  };

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

  const filterAppointments = (query) => {
    let filtered;

    if (query) {
      filtered = appointments.filter((appointment) => {
        const reasonOfApp = appointment.reasonOfApp.toLowerCase();
        const fullName = appointment.fullName.toLowerCase();
        return (
          (reasonOfApp.includes(query) || fullName.includes(query)) &&
          appointment.docName === doctorName
        );
      });
    } else {
      // When there's no search query, show all appointments
      filtered = appointments.filter(
        (appointment) => appointment.docName === doctorName
      );
    }

    setFilteredAppointments(filtered);
  };



  const handleCreateRecoveryPlan = (fullName, reasonOfApp) => {
    // Perform any actions or condition checks before navigating
    if (doctorName) {
      navigate('/NewRecoveryPlan', {
        state: { patientName: fullName, appointmentReason: reasonOfApp },
      });
    } else {
      // Handle other cases or show a message
    }
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'Secular One, sans-serif', fontSize: "30px", fontWeight: '300', margin: '2rem', color: '#008080' }}>Appointments for {doctorName}</h2>

      <Form className="my-3" style={{ marginLeft: "30rem", marginRight: "30rem", borderRadius: "10px", backgroundColor: "#778899" }}>
        <FormControl
          type="text"
          placeholder="Search by Patient Name or Reason for Appointment"
          value={searchQuery}
          onChange={handleSearch}
        />
      </Form>

      <div className="d-flex flex-wrap justify-content-center">
        {filteredAppointments.map((appointment) => (
          <div key={appointment._id} className="mx-2 mb-4">
            <Card
              id="doctorimg"
              style={{
                margin: "1rem",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)",
                borderRadius: "10px",
                backgroundColor: "#008080",
              }}
            >
              <Card.Body className="p-4 DCreatedPlans" style={{ margin: "2rem", borderRadius: "10px" }}>
                <Card.Title className="lead fw-normal mb-2 DCreatedPlans" style={{ fontWeight: "300" }}>Patient Name -: {appointment.fullName}</Card.Title>
                <Card.Text className="text-white">
                  Age: {appointment.age}
                  <br />
                  Email: {appointment.email}
                  <br />
                  Reason for Appointment: {appointment.reasonOfApp}
                  <br />
                  Date: {new Date(appointment.date).toLocaleDateString()}
                </Card.Text>
                <Button
                  variant="warning"
                  onClick={() =>
                    handleCreateRecoveryPlan(
                      appointment.fullName,
                      appointment.reasonOfApp,
                    )
                  }
                >
                  Create a Recovery Plan
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

    </div>
  );
}
