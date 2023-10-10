import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DeleteButton(props) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDelete = (deleteId) => {
    axios
      .delete(`http://localhost:8040/meditationPrescription/${deleteId}`)
      .then(() => {
        handleClose(); // Close the confirmation dialog
         // Force a full page refresh
        navigate("/DCreatedRecoveryPlans");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  

  return (
    <>
      <Button id = "custom-radius" variant="danger" onClick={handleShow}>
        Delete Plan
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this plan?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete(props.id);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
