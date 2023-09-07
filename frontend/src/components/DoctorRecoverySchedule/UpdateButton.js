import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function UpdateButton(props) {
  const navigate = useNavigate();

  const updateWorkout = (workoutId) => {
    let path = `/UpdateRecoveryPlan/${workoutId}`;
    navigate(path);
  };

  return (
    <>
      <Button
        id="custom-radius"
        variant="success"
        onClick={() => updateWorkout(props.id)}
      >
        Update Plan
      </Button>
    </>
  );
}
