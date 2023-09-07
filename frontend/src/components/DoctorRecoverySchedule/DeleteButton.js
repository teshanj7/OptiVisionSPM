import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function DeleteButton(props) {
  const navigate = new useNavigate();
  const [deleteId, setDeleteId] = useState("");

  const handleDelete = (deleteId) => {
    axios
      .delete(`http://localhost:8040/meditationPrescription/${deleteId}`)
      .then(() => {
        setDeleteId("");
        navigate(`/DCreatedRecoveryPlans`);
        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={() => {
          handleDelete(props.id);
        }}
      >
        Delete Plan
      </Button>
    </>
  );
}