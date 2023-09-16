import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import { Document, Page, Text, View, StyleSheet, PDFViewer, pdf } from "@react-pdf/renderer";

export default function PrescriptionDetailsPage() {
  const { patientName, appointmentReason } = useParams();
  const [prescription, setPrescription] = useState([]);
  const navigate = useNavigate();

  const [showPdf, setShowPdf] = useState(false);

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
        alert("Still no prescription Created for the appointment.");
        navigate('/PRecoveryView');
      });
  }, [patientName, appointmentReason]);

  if (!prescription || prescription.length === 0) {
    return <div>Still no prescription Created for the appointment.</div>;
  }

  const prescriptionPlan = prescription[0]; // Assuming only one prescription is displayed

  const PdfDocument = ({ prescriptionPlan }) => {
    const styles = StyleSheet.create({
      page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: "0cm",
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 0,
      },
      title: {
        fontSize: 16,
        fontWeight: "bold",
      },
      subtitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginVertical: 5,
      },
      text: {
        fontSize: 12,
        marginVertical: 5,
      },
    });

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>View Meditation Prescription</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subtitle}>Patient Name: {prescriptionPlan.patientName}</Text>
            <Text style={styles.subtitle}>Appointment Reason: {prescriptionPlan.appointmentReason}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subtitle}>Medicine Details</Text>
            <Text style={styles.text}>Medicine Name: {prescriptionPlan.medicineName}</Text>
            <Text style={styles.text}>Medicine Dosage: {prescriptionPlan.medicineDosage}</Text>
            <Text style={styles.text}>Medicine Duration: {prescriptionPlan.medicineDuration}</Text>
            <Text style={styles.text}>Medicine Frequency: {prescriptionPlan.medicineFrequency}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subtitle}>Exercise Plan</Text>
            {prescriptionPlan.exercisePlan.map((day, dayIndex) => (
              <View key={dayIndex}>
                <Text style={styles.subtitle}>Day {dayIndex + 1}</Text>
                {day.map((exercise, exerciseIndex) => (
                  <View key={exerciseIndex}>
                    <Text style={styles.subtitle}>Exercise {exerciseIndex + 1}</Text>
                    <Text style={styles.text}>Exercise Name: {exercise.exerciseName}</Text>
                    <Text style={styles.text}>Exercise Duration: {exercise.exerciseDuration}</Text>
                    <Text style={styles.text}>Exercise Frequency: {exercise.exerciseFrequency}</Text>
                    <Text style={styles.text}>Exercise Instruction: {exercise.exerciseInstruction}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );
  };

  const handleTogglePdf = () => {
    setShowPdf(!showPdf);
  };

  const downloadPdf = () => {
    pdf(<PdfDocument prescriptionPlan={prescriptionPlan} />).toBlob(function (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "prescription.pdf";
      a.click();
    });
  };

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
      <Button style={{ margin: "8px" }} variant="primary" onClick={handleTogglePdf}>
        {showPdf ? "Hide PDF" : "Show PDF"}
      </Button>
      {showPdf && (
        <>
          <PDFViewer style={{ width: "100%", height: "500px" }}>
            <PdfDocument prescriptionPlan={prescriptionPlan} />
          </PDFViewer>
        </>
      )}
    </Container>
  );
}