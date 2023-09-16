import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

function PrescriptionDetailsPage() {

  const { patientName, appointmentReason } = useParams();
  const [prescription, setPrescription] = useState([]);
  const navigate = useNavigate();
//   const encodedPatientName = encodeURIComponent(patientName);
//   const encodedAppointmentReason = encodeURIComponent(appointmentReason);

  useEffect(() => {
    // Fetch the prescription details based on patientName and appointmentReason
    axios
      .get(`http://localhost:8040/meditationPrescription/getPrescriptionDetails/${patientName}/${appointmentReason}`)
      .then((res) => {
        if (res.data) {
          setPrescription(res.data);
        }
      })
      .catch((err) => {
        alert("Still no prescription Created for the appoinment .");
        navigate('/PRecoveryView');
      });
  }, [patientName, appointmentReason]);

  if (!prescription || prescription.length === 0) {
    return <div>Still no prescription Created for the appoinment .</div>;
  }

  const prescriptionPlan = prescription[0]; // Assuming only one prescription is displayed

  return (
    <Container>
      <h1 className="mt-3">View Meditation Prescription</h1>
      <Card className="my-3">
        <Card.Body>
          <Card.Title>Patient Name: {prescriptionPlan.patientName}</Card.Title>
          <Card.Text>Appointment Reason: {prescriptionPlan.appointmentReason}</Card.Text>
          <Card>
            <Card.Body>
              <Card.Title>Medicine Details</Card.Title>
              <Card.Text>Medicine Name: {prescriptionPlan.medicineName}</Card.Text>
              <Card.Text>Medicine Dosage: {prescriptionPlan.medicineDosage}</Card.Text>
              <Card.Text>Medicine Duration: {prescriptionPlan.medicineDuration}</Card.Text>
              <Card.Text>Medicine Frequency: {prescriptionPlan.medicineFrequency}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Exercise Plan</Card.Title>
              {prescriptionPlan.exercisePlan.map((day, dayIndex) => (
                <div key={dayIndex}>
                  <Card.Title>Day {dayIndex + 1}</Card.Title>
                  {day.map((exercise, exerciseIndex) => (
                    <Card key={exerciseIndex} className="my-2">
                      <Card.Body>
                        <Card.Title>Exercise {exerciseIndex + 1}</Card.Title>
                        <Card.Text>Exercise Name: {exercise.exerciseName}</Card.Text>
                        <Card.Text>Exercise Duration: {exercise.exerciseDuration}</Card.Text>
                        <Card.Text>Exercise Frequency: {exercise.exerciseFrequency}</Card.Text>
                        <Card.Text>Exercise Instruction: {exercise.exerciseInstruction}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ))}
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PrescriptionDetailsPage;
