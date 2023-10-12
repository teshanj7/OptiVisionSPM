import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import { Document, Page, Text, View, StyleSheet, PDFViewer, pdf } from "@react-pdf/renderer";
import '../PatientHomePage/Phomepage.css';

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
        padding: "2cm",
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
        marginVertical: 10,
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
      <h1 style={{ margin: "2rem", fontSize: "3rem" }} className="PatientDivHeading">View Meditation Prescription</h1>
      
      <Card style={{ margin: "2rem", borderRadius: "10px", backgroundColor: "#FFFFFF", border: "none" }}>
        <Card.Body style={{ margin: "2rem", borderRadius: "10px", backgroundColor: "#FFFFFF" }}>
          <Card.Title className="PHPara2">Patient Name: {prescriptionPlan.patientName}</Card.Title>
          <Card.Text className="PHPara1">Appointment Reason: {prescriptionPlan.appointmentReason}</Card.Text>
          <Card style={{ margin: "2rem", borderRadius: "10px", backgroundColor: "#008080", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }} >
            <Card.Body style={{ margin: "2rem", borderRadius: "10px", backgroundColor: "#FFFFFF" }}>
              <Card.Title style={{ margin: "2rem", fontSize: "2rem" }} className="PHPara2">Medicine Details</Card.Title>
              <Card.Text className="PatientDivPara2" style={{fontSize: "1rem"}}>Medicine Name -: {prescriptionPlan.medicineName}</Card.Text>
              <Card.Text className="PatientDivPara2" style={{fontSize: "1rem" }}>Medicine Dosage -: {prescriptionPlan.medicineDosage}</Card.Text>
              <Card.Text className="PatientDivPara2" style={{fontSize: "1rem" }}>Medicine Dosage -: {prescriptionPlan.medicineDosage}</Card.Text>
              <Card.Text className="PatientDivPara2" style={{fontSize: "1rem" }}>Medicine Duration -: {prescriptionPlan.medicineDuration}</Card.Text>
              <Card.Text className="PatientDivPara2" style={{fontSize: "1rem" }}>Medicine Frequency -: {prescriptionPlan.medicineFrequency}</Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ margin: "2rem", borderRadius: "10px", backgroundColor: "#008080", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
            <Card.Body style={{ margin: "2rem", borderRadius: "10px", backgroundColor: "#FFFFFF" }}>
              <Card.Title style={{ margin: "2rem", fontSize: "2rem" }} className="PHPara2">Exercise Plan</Card.Title>
              {prescriptionPlan.exercisePlan.map((day, dayIndex) => (
                <div key={dayIndex}>
                <Card.Title style={{ margin: "2rem", fontSize: "1rem" }} className="PHPara2">Day {dayIndex + 1}</Card.Title>
                <div className="d-flex flex-wrap justify-content-center">
                  {day.map((exercise, exerciseIndex) => (
                    <Card key={exerciseIndex} className="my-2" style={{ flex: "1", maxWidth: "600px", maxHeight: "500px", margin: "1rem", borderRadius: "10px", backgroundColor: "#DFEFFA" }} id="patientimg">
                      <Card.Body style={{ margin: "1rem", maxWidth: "600px", maxHeight: "100px" , borderRadius: "10px", backgroundColor: "#DFEFFA" }}>
                        <Card.Title style={{ margin: "1rem", fontSize: "1rem" }} className="PHPara2">Exercise {exerciseIndex + 1}</Card.Title>
                        <Card.Text className="PatientDivPara2" style={{ fontSize: "1rem" }}>Exercise Name: {exercise.exerciseName}</Card.Text>
                        <Card.Text className="PatientDivPara2" style={{ fontSize: "1rem" }}>Exercise Duration: {exercise.exerciseDuration}</Card.Text>
                        <Card.Text className="PatientDivPara2" style={{ fontSize: "1rem" }}>Exercise Frequency: {exercise.exerciseFrequency}</Card.Text>
                        <Card.Text className="PatientDivPara2" style={{ fontSize: "1rem" }}>Exercise Instruction: {exercise.exerciseInstruction}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
              
              ))}
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
      <Button style={{ margin: "25px", backgroundColor: '#008080', color: 'white', width: '200px',  }} variant="warning" onClick={handleTogglePdf}>
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