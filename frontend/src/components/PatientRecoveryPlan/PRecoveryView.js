import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../ContextComponents/ContextComponent";
import { Card, Container, Button, Form, FormControl } from "react-bootstrap"; // Assuming you're using Bootstrap
import '../PatientHomePage/Phomepage.css';

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
      <h1 style={{ margin: "2rem", fontSize: "3rem" }} className="PatientDivHeading">View Meditation Prescriptions</h1>
      <Form className="my-3" style={{ margin: "20rem"}}>
        <FormControl
          type="text"
          placeholder="Search by Appointment Reason"
          value={searchTerm}
          onChange={handleSearch}

        />
      </Form>
      {filteredPrescriptions.map((prescriptionPlan, index) => (
      <div className="d-flex justify-content-center align-items-center">  
        <Card key={index} className="my-3" id="patientimg" style={{ width: "700px", height: "250px", padding: "1rem", margin: "2rem", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)", borderRadius: "10px", backgroundColor: "#008080" }}>
          <Card.Body style={{ margin: "2rem", borderRadius: "10px", backgroundColor: "#008080" }}>
          <Card.Title className="text-white" style={{ fontFamily: 'Jost, sans-serif', fontSize: '25px', fontWeight: 700, fontStyle: 'normal' }}>Patient Name: {prescriptionPlan.patientName}</Card.Title>
          <Card.Text  className="text-white" style={{ fontFamily: 'Jost, sans-serif', fontSize: '20px', fontWeight: 300 }}>Appointment Reason: {prescriptionPlan.appointmentReason}</Card.Text>
            <Link to={`/prescription/${prescriptionPlan.patientName}/${prescriptionPlan.appointmentReason}`} className="btn btn-primary"style={{boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)" }}>
              View Prescription Details
            </Link>
          </Card.Body>
        </Card>
      </div>
      ))}
    </Container>
  );
}
