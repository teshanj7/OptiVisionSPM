import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./DCreatedRecoveryPlans.css"; // Create a DCreatedPlans.css file for styling
//import "bootstrap/dist/css/bootstrap.css";
import DeleteButton from "../DoctorRecoverySchedule/DeleteButton";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import UserContext from "../ContextComponents/ContextComponent";
import axios from "axios";
import UpdateButton from "../DoctorRecoverySchedule/UpdateButton";

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
    let path = `/NewRecoveryPlan`;
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
      <div className="DCreatedPlans">
        <section
          className="h-100 DCreatedPlans"
          style={{ backgroundColor: "#1F1F1F" }}
        >
          <Container className="h-100 py-5 DCreatedPlans">
            <Row className="d-flex justify-content-start align-items-center h-100 DCreatedPlans">
              <Col>
                <div className="d-flex justify-content-between align-items-left mb-4 DCreatedPlans">
                  <h3 className="fw-normal mb-0 text-black text-white DCreatedPlans">
                    My Recovery Plans
                  </h3>
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
                        className="rounded-3 mb-4 DCreatedPlans"
                        style={{ backgroundColor: "white" }}
                        key={recoveryPlan._id}
                      >
                        <Card.Body className="p-4 DCreatedPlans">
                          <Row className="d-flex justify-content-between align-items-center DCreatedPlans">
                            <Col md={2} lg={2} xl={2}>
                              <div
                                className="Clickable DCreatedPlans"
                                onClick={() =>
                                  viewRecoveryPlan(recoveryPlan._id)
                                }
                              >
                                <Card.Img
                                  variant="top"
                                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
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
                                <Card.Title className="lead fw-normal mb-2 DCreatedPlans">
                                  {recoveryPlan.medicineName}
                                </Card.Title>
                              </div>
                              <div
                                className="Clickable DCreatedPlans"
                                onClick={() =>
                                  viewRecoveryPlan(recoveryPlan._id)
                                }
                              >
                                <Card.Text>
                                  <span className="text-muted DCreatedPlans">
                                    {recoveryPlan.medicineName}
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

                <Card className="mb-4 DCreatedPlans">
                  <Card.Body className="p-4 d-flex flex-row DCreatedPlans">
                    <div className="form-outline flex-fill DCreatedPlans">
                      <Card.Title as="h3">
                        Want to create a new Recovery Plan?
                      </Card.Title>
                    </div>
                    <Button
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
