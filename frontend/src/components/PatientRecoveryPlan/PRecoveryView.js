import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../ContextComponents/ContextComponent";
import { Card, Container, Button, Form, FormControl } from "react-bootstrap"; // Assuming you're using Bootstrap

export default function ViewMeditationPrescription() {
  const [prescription, setPrescription] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const { user } = useContext(UserContext);
  const patientName = user.Fullname;

  useEffect(() => {
    // Fetch the meditation prescription details by ID
    axios
      .get(`http://localhost:8040/meditationPrescription/getMeditationPrescriptionsAppoinment/${patientName}`)
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          // Assuming `res.data` is an array of existing data
          console.log(res.data);
          setPrescription(res.data);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [patientName]);

  if (!prescription) {
    // Loading state while fetching data
    return <div>Loading...</div>;
  }

  // Filter prescriptions based on search term
  const filteredPrescriptions = prescription.filter((prescriptionPlan) =>
    prescriptionPlan.appointmentReason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
      <h1 className="mt-3">View Meditation Prescriptions</h1>
      <Form className="my-3">
        <FormControl
          type="text"
          placeholder="Search by Appointment Reason"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form>
      {filteredPrescriptions.map((prescriptionPlan, index) => (
        <Card key={index} className="my-3" style={{ marginBottom: "5rem", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)", borderRadius: "10px", backgroundColor: "#008080" }}>
          <Card.Body style={{ margin: "2rem", borderRadius: "10px", backgroundColor: "#00B3B3" }}>
            <Card.Title>Patient Name: {prescriptionPlan.patientName}</Card.Title>
            <Card.Text>Appointment Reason: {prescriptionPlan.appointmentReason}</Card.Text>
            <Link to={`/prescription/${prescriptionPlan.patientName}/${prescriptionPlan.appointmentReason}`} className="btn btn-primary">
              View Prescription Details
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
