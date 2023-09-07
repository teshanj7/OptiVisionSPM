import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from '../ContextComponents/ContextComponent';
import './NewMeditationPrescription.css'; 

export default function NewMeditationPrescription() {
  const { user } = useContext(UserContext);
  const userID = user._id;
  const [medicineName, setMedicineName] = useState("");
  const [medicineDosage, setMedicineDosage] = useState("");
  const [medicineDuration, setMedicineDuration] = useState("");
  const [medicineFrequency, setMedicineFrequency] = useState("");
  const [exercisePlan, setExercisePlan] = useState([]);

  const handleCreateMeditationPrescription = () => {
    if (!medicineName) {
      alert("Please enter a medicine name");
      return;
    }

    const newMeditationPrescription = {
      userID,
      medicineName,
      medicineDosage,
      medicineDuration,
      medicineFrequency,
      exercisePlan,
    };

    axios.post("http://localhost:8040/meditationPrescription/addMeditationPrescription", newMeditationPrescription)
      .then(() => {
        alert("Meditation Prescription Added");
        navigate(`/MyMeditationPrescriptions`);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleMedicineNameChange = (event) => {
    setMedicineName(event.target.value);
  };

  const handleMedicineDosageChange = (event) => {
    setMedicineDosage(event.target.value);
  };

  const handleMedicineDurationChange = (event) => {
    setMedicineDuration(event.target.value);
  };

  const handleMedicineFrequencyChange = (event) => {
    setMedicineFrequency(event.target.value);
  };

  const handleExercisePlanChange = (event, dayIndex, exerciseIndex) => {
    const { name, value } = event.target;
    const list = [...exercisePlan];
    list[dayIndex][exerciseIndex][name] = value;
    setExercisePlan(list);
  };

  const addDay = () => {
    const list = [...exercisePlan];
    list.push([]);
    setExercisePlan(list);
  };

  const addExercise = (index) => {
    const list = [...exercisePlan];
    list[index].push({ exerciseName: "", exerciseDuration: 0, exerciseFrequency: 0 });
    setExercisePlan(list);
  };

  const removeDay = (index) => {
    const list = [...exercisePlan];
    list.splice(index, 1);
    setExercisePlan(list);
  };

  const removeExercise = (dayIndex, exerciseIndex) => {
    const list = [...exercisePlan];
    list[dayIndex].splice(exerciseIndex, 1);
    setExercisePlan(list);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="NewMeditationPrescription">
        <br />
        <div className="container-md">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-10 col-xl-12">
              <div className="card shadow NewMeditationPrescription card w-100 cardoutline">
                <div className="card w-100" >
                  <div className="card-body ">
                    <h1 className="card-title">Create a new Meditation Prescription</h1>
                    <div className="mb-3">
                      <label htmlFor="medicineName" className="form-label">Medicine Name</label>
                      <input type="text" className="form-control NewMeditationPrescription outline" id="medicineName" value={medicineName} onChange={handleMedicineNameChange} autoComplete="off" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="medicineDosage" className="form-label">Medicine Dosage</label>
                      <input type="text" className="form-control NewMeditationPrescription outline" id="medicineDosage" value={medicineDosage} onChange={handleMedicineDosageChange} autoComplete="off" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="medicineDuration" className="form-label">Medicine Duration</label>
                      <input type="text" className="form-control NewMeditationPrescription outline" id="medicineDuration" value={medicineDuration} onChange={handleMedicineDurationChange} autoComplete="off" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="medicineFrequency" className="form-label">Medicine Frequency</label>
                      <input type="text" className="form-control NewMeditationPrescription outline" id="medicineFrequency" value={medicineFrequency} onChange={handleMedicineFrequencyChange} autoComplete="off" required />
                    </div>
                    <div className="mb-3">
                      <h3 className="card-title ">Exercise Plan</h3>
                      {exercisePlan.map((day, dayIndex) => (
                        <div key={dayIndex} className="day-container mb-6">
                          <hr /> 
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h3 id ="custom-text" className="card-subtitle">Day {dayIndex + 1}</h3>
                            {exercisePlan.length > 0 && (
                              <button id= "custom-radius" type="button" className="btn btn-danger" onClick={() => removeDay(dayIndex)}>
                                Remove Day
                              </button>
                            )}
                          </div>
                          <div className="exercise-container">
                          
                            {day.map((exercise, exerciseIndex) => (
                              <div key={exerciseIndex} className="exercise mb-2">
                                
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                
                                  <h4 id ="custom-text" className="card-subtitle ">Exercise {exerciseIndex + 1}</h4>
                                  <button id= "custom-radius" type="button" className="btn btn-danger" onClick={() => removeExercise(dayIndex, exerciseIndex)}>
                                    Remove Exercise
                                  </button>
                                </div>
                                <div className="mb-2">
                                  <label htmlFor={`exerciseName-${dayIndex}-${exerciseIndex}`} className="form-label">Exercise Name</label>
                                  <input type="text" className="form-control NewMeditationPrescription outline" id={`exerciseName-${dayIndex}-${exerciseIndex}`} name="exerciseName" defaultValue={exercise.exerciseName} onChange={(event) => handleExercisePlanChange(event, dayIndex, exerciseIndex)} autoComplete="off" />
                                </div>
                                <div className="mb-2">
                                  <label htmlFor={`exerciseDuration-${dayIndex}-${exerciseIndex}`} className="form-label">Exercise Duration</label>
                                  <input type="number" className="form-control NewMeditationPrescription outline" id={`exerciseDuration-${dayIndex}-${exerciseIndex}`} name="exerciseDuration" defaultValue={exercise.exerciseDuration} onChange={(event) => handleExercisePlanChange(event, dayIndex, exerciseIndex)} />
                                </div>
                                <div className="mb-2">
                                  <label htmlFor={`exerciseName-${dayIndex}-${exerciseIndex}`} className="form-label">Exercise Frequency</label>
                                  <input type="text" className="form-control NewMeditationPrescription outline" id={`exerciseFrequency-${dayIndex}-${exerciseIndex}`} name="exerciseFrequency" defaultValue={exercise.exerciseFrequency} onChange={(event) => handleExercisePlanChange(event, dayIndex, exerciseIndex)} autoComplete="off" />
                                </div>
                                <div className="mb-2">
                                  <label htmlFor={`exerciseInstruction-${dayIndex}-${exerciseIndex}`} className="form-label">Exercise Instruction</label>
                                  <input type="text" className="form-control NewMeditationPrescription outline" id={`exerciseInstruction-${dayIndex}-${exerciseIndex}`} name="exerciseInstruction" defaultValue={exercise.exerciseInstruction} onChange={(event) => handleExercisePlanChange(event, dayIndex, exerciseIndex)} autoComplete="off" />
                                </div>
                              </div>))}
                              <div className="d-flex justify-content-center ">
                          <button type="button" className="btn btn-primary" onClick={() => addExercise(dayIndex)}>
                            Add Exercise
                          </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <hr/>
                    <div className="d-flex justify-content-center ">
                    <button type="button" className="btn btn-primary" onClick={addDay}>
                      Add Day
                    </button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center ">
                  <button type="button" className="btn btn-primary" onClick={handleCreateMeditationPrescription}>
                    Confirm Workout Plan
                  </button>
                  </div>
                </div>
                </div>
              </div>
              
{/*            
            <DeleteButton id = {id}/> */}
          </div>
          
        </div>
      </div>
      <br/>
      </div>
    </>
  );
}
