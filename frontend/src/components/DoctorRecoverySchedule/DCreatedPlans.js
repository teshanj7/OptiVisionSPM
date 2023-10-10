import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./DCreatedRecoveryPlans.css"; // Create a DCreatedPlans.css file for styling
//import "bootstrap/dist/css/bootstrap.css";
import DeleteButton from "../DoctorRecoverySchedule/DeleteButton";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import UserContext from "../ContextComponents/ContextComponent";
import axios from "axios";
import UpdateButton from "../DoctorRecoverySchedule/UpdateButton";
import image from "../DoctorRecoverySchedule/images.jpg";

export default function DCreatedPlans() {
  const { user } = useContext(UserContext);
  const userID = user._id;

  const [allRecoveryPlans, setRecoveryPlans] = useState(null);
  const [selectedRecoveryPlanId, setSelectedRecoveryPlanId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  function fetchRecoveryPlans() {
    axios
      .get(`http://localhost:8040/meditationPrescription/getMeditationPrescriptions/${userID}`)
      .then((res) => {
        console.log(res.data);
        setRecoveryPlans(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    fetchRecoveryPlans();
  }, []);

  let navigate = useNavigate();

  const viewRecoveryPlan = (recoveryPlanId) => {
    console.log(recoveryPlanId);
    setSelectedRecoveryPlanId(recoveryPlanId);
    let path = `/SingleRecoveryPlan/${recoveryPlanId}`;
    navigate(path);
  };

  const createNewRecoveryPlan = () => {
    let path = `/DRelatedAppoinment`;
    navigate(path);
  };

  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);
    let key = event.target.value;
    if (key) {
      let result = await fetch(
        `http://localhost:8040/meditationPrescription/search/${key}`
      );
      result = await result.json();

      if (result) {
        console.log(result);
        setRecoveryPlans(result);
      }
    } else {
      fetchRecoveryPlans();
    }
  };

  return (
    <>
      <div  id = "custom-color">
        <section
          className="h-100 DCreatedPlans"
          style={{ backgroundColor: "white" }}
        >
          <Container className="h-100 py-5 DCreatedPlans">
            <Row className="d-flex justify-content-start align-items-center h-100 DCreatedPlans" id = "custom-card">
              <Col>
                <div className="d-flex justify-content-between align-items-left mb-4 DCreatedPlans" >
                <h1 className="fw-normal mb-0 text-black text-white DCreatedPlans" style={{ fontFamily: 'Secular One, sans-serif', fontWeight: '300' }}>
                    My Recovery Plans
                  </h1>
                  <div className="d-flex justify-content-end DCreatedPlans">
                    <Form className="d-flex DCreatedPlans">
                      <Form.Control
                        type="text"
                        placeholder="Search Recovery Plan"
                        aria-label="Search Recovery Plan"
                        aria-describedby="button-addon2"
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      <Button
                        variant="outline-success ms-3"
                        id="button-addon2"
                      >
                        Search
                      </Button>
                    </Form>
                  </div>
                </div>

                <div className="recovery-plans DCreatedPlans">
                  {allRecoveryPlans ? (
                    allRecoveryPlans.map((recoveryPlan) => (
                      <Card
                      
                        id = 'doctorimg2'
                        className="rounded-3 mb-4 "
                        style={{ backgroundColor: "#FFFFFF",boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)", animation: "fadeIn 2s ease-in-out" }}
                        key={recoveryPlan._id}
                        // style={{borderColor: "black", borderWidth: "5px"}}
                      >
                        {/* #778899 */}
                        <Card.Body className="p-4 DCreatedPlans">
                          <Row className="d-flex justify-content-between align-items-center DCreatedPlans" >
                            <Col md={2} lg={2} xl={2}>
                              <div
                              
                                className="Clickable DCreatedPlans"
                                onClick={() =>
                                  viewRecoveryPlan(recoveryPlan._id)
                                }
                              >
                                <Card.Img
                                  
                                  variant="top"
                                  src={image}
                                  className="img-fluid rounded-3 DCreatedPlans"
                                  alt="Recovery Plan"
                                  
                                />
                              </div>
                            </Col>
                            <Col md={3} lg={3} xl={3}>
                              <div
                                className="Clickable DCreatedPlans"
                                onClick={() =>
                                  viewRecoveryPlan(recoveryPlan._id)
                                }
                              >
                                <Card.Title className="lead fw-normal mb-2 DCreatedPlans" style={{ fontSize: "25px", fontWeight: '300' }}>
                                  {recoveryPlan.patientName}
                                </Card.Title>
                              </div>
                              <div
                                className="Clickable DCreatedPlans"
                                onClick={() =>
                                  viewRecoveryPlan(recoveryPlan._id)
                                }
                              >
                                <Card.Text >
                                  <span className="text-muted DCreatedPlans" style={{ fontFamily: 'Jost, sans-serif', fontSize: "25px", fontWeight: '300' }}>
                                    {recoveryPlan.appointmentReason}
                                  </span>
                                </Card.Text>
                              </div>
                            </Col>
                            <Col md={2} lg={2} xl={2} className="text-end DCreatedPlans">
                              <UpdateButton variant="primary" id={recoveryPlan._id} />
                            </Col>
                            <Col md={1} lg={1} xl={2} className="text-end DCreatedPlans">
                              <DeleteButton variant="danger" id={recoveryPlan._id} />
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>

                <Card id = 'doctorimg2' className="mb-4 DCreatedPlans" style={{ backgroundColor: "#FFFFFF", animation: "fadeIn 2s ease-in-out", borderColor: "black", borderWidth: "5px"}}>
                  <Card.Body className="p-4 d-flex flex-row DCreatedPlans">
                    <div className="form-outline flex-fill DCreatedPlans">
                      <Card.Title as="h3">
                        Want to create a new Recovery Plan?
                      </Card.Title>
                    </div>
                    <Button
                      id = 'doctorimg2'
                      variant="outline-success btn-lg ms-3"
                      onClick={createNewRecoveryPlan}
                    >
                      Create Recovery Plan
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
}
