import './UpdateMedicinePrescription.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../DoctorRecoverySchedule/DeleteButton";

export default function UpdateMedicinePrescription() {
  const [prescription, setPrescription] = useState(null);
  const { id } = useParams();
  const [medicineName, setMedicineName] = useState("");
  const [medicineDosage, setMedicineDosage] = useState("");
  const [medicineDuration, setMedicineDuration] = useState("");
  const [medicineFrequency, setMedicineFrequency] = useState("");
  const [exercisePlan, setExercisePlan] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    function fetchPrescription() {
      axios
        .get(`http://localhost:8040/meditationPrescription/${id}`)
        .then((res) => {
          setPrescription(res.data);
          setMedicineName(res.data.medicineName);
          setMedicineDosage(res.data.medicineDosage);
          setMedicineDuration(res.data.medicineDuration);
          setMedicineFrequency(res.data.medicineFrequency);
          setExercisePlan(res.data.exercisePlan);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchPrescription();
  }, [id]);

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

  const updatePrescription = () => {
    axios
      .put(`http://localhost:8040/meditationPrescription/update/${id}`, {
        medicineName,
        medicineDosage,
        medicineDuration,
        medicineFrequency,
        exercisePlan,
      })
      .then(() => {
        navigate(`/SingleMedicinePrescription/${id}`);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
    
    return (
    <div className="UpdateMedicinePrescription" style={{ backgroundColor: "#1F1F1F" }}>
      <br/>
      <div className="container-md UpdateMedicinePrescription">
        <div className="row justify-content-center UpdateMedicinePrescription">
          <div className="col-md-8 col-lg-10 col-xl-12 UpdateMedicinePrescription">
            {prescription ? (
              <div className="card shadow UpdateMedicinePrescription card w-100 cardoutline" >
                <div className="card w-100 UpdateMedicinePrescription">
                  <div className="card-body UpdateMedicinePrescription">
                    <h1 className="card-title UpdateMedicinePrescription">Update Medicine Prescription</h1>
                    <div className="mb-3 UpdateMedicinePrescription">
                      <label htmlFor="medicineName" className="form-label UpdateMedicinePrescription">Medicine Name</label>
                      <input type="text" className="form-control UpdateMedicinePrescription outline" id="medicineName" value={medicineName} onChange={handleMedicineNameChange} />
                    </div>
                    <div className="mb-3 UpdateMedicinePrescription">
                      <label htmlFor="medicineDosage" className="form-label UpdateMedicinePrescription">Medicine Dosage</label>
                      <input type="text" className="form-control UpdateMedicinePrescription outline" id="medicineDosage" value={medicineDosage} onChange={handleMedicineDosageChange} />
                    </div>
                    <div className="mb-3 UpdateMedicinePrescription">
                      <label htmlFor="medicineDuration" className="form-label UpdateMedicinePrescription">Medicine Duration</label>
                      <input type="text" className="form-control UpdateMedicinePrescription outline" id="medicineDuration" value={medicineDuration} onChange={handleMedicineDurationChange} />
                    </div>
                    <div className="mb-3 UpdateMedicinePrescription">
                      <label htmlFor="medicineFrequency" className="form-label UpdateMedicinePrescription">Medicine Frequency</label>
                      <input type="text" className="form-control UpdateMedicinePrescription outline" id="medicineFrequency" value={medicineFrequency} onChange={handleMedicineFrequencyChange} />
                    </div>
                    <div className="mb-3 UpdateMedicinePrescription">
                      <h3 class="card-title UpdateMedicinePrescription">Exercise Plan</h3>
                      {exercisePlan.map((day, dayIndex) => (
                        <div key={dayIndex} className="day-container mb-6 UpdateMedicinePrescription">
                          <hr/>
                          <div className="d-flex justify-content-between align-items-center mb-2 UpdateMedicinePrescription">
                            <h3 class="card-subtitle UpdateMedicinePrescription">Day {dayIndex + 1}</h3>
                            {exercisePlan.length > 1 && (
                              <button type="button" className="btn btn-danger UpdateMedicinePrescription" onClick={() => removeDay(dayIndex)}>
                                Remove Day
                              </button>
                            )}
                          </div>
                          <hr/>
                          <div className="exercise-container UpdateMedicinePrescription">
                            {day.map((exercise, exerciseIndex) => (
                              <div key={exerciseIndex} className="exercise mb-2 UpdateMedicinePrescription">
                                <div className="d-flex justify-content-between align-items-center mb-2 UpdateMedicinePrescription">
                                  <h4 class="card-subtitle UpdateMedicinePrescription">Exercise {exerciseIndex + 1}</h4>
                                  <button type="button" className="btn btn-danger UpdateMedicinePrescription" onClick={() => removeExercise(dayIndex, exerciseIndex)}>
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
                                <hr/>
                            </div>
                          ))}
                          <div className="d-flex justify-content-center UpdateMedicinePrescription">
                          <button type="button" className="btn btn-primary UpdateMedicinePrescription" onClick={() => addExercise(dayIndex)}>
                            Add Exercise
                          </button>
                          </div>
                        </div>
                        
                      </div>
                      
                      
                    ))}
                    <hr/>
                    <div className="d-flex justify-content-center UpdateMedicinePrescription">
                    <button type="button" className="btn btn-primary UpdateMedicinePrescription" onClick={addDay}>
                      Add Day
                    </button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center UpdateMedicinePrescription">
                  <button type="button" className="btn btn-primary UpdateMedicinePrescription" onClick={updatePrescription}>
                    Update Prescription
                  </button>
                  </div>
                  <br></br>
                  <div className="d-flex justify-content-center UpdateMedicinePrescription">
                  <DeleteButton id = {id}/>
                  </div>
                </div>
                
                </div>
                
              </div>
              
            ) : (
              <p>Loading...</p>
            )}
            
          </div>
          
        </div>
        
      </div>
      <br/>
      </div>
    
  );
}