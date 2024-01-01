import './UpdateMedicinePrescription.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DeleteButton from "../DoctorRecoverySchedule/DeleteButton";

export default function UpdateMedicinePrescription() {
  const [prescription, setPrescription] = useState(null);
  const { id } = useParams();
  // const location = useLocation();
  // const {patientName, appointmentReason } = location.state || {};
  const [medicineName, setMedicineName] = useState("");
  const [medicineDosage, setMedicineDosage] = useState("");
  const [medicineDuration, setMedicineDuration] = useState("");
  const [medicineFrequency, setMedicineFrequency] = useState("");
  const [patientName, setPatientName] = useState("");
  const [appointmentReason, setAppointmentReason] = useState("");
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
          setPatientName(res.data.patientName); // Set patientName
          setAppointmentReason(res.data.appointmentReason); // Set appointmentReason

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
        patientName,
        appointmentReason
          
      })
      .then(() => {
        navigate(`/DCreatedRecoveryPlans`);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
    
    return (
    <div className="UpdateMedicinePrescription" style={{ backgroundColor: "white"}}>
      <br/>
      <div className="container-md UpdateMedicinePrescription">
        <div className="row justify-content-center UpdateMedicinePrescription">
          <div className="col-md-8 col-lg-10 col-xl-12 UpdateMedicinePrescription">
            {prescription ? (
              <div className="card shadow w-50 cardoutline mx-auto" >
                <div className="card w-100 card shadow UpdateMedicinePrescription">
                  <div className="card-body UpdateMedicinePrescription">
                    <h1 className="card-title UpdateMedicinePrescription text-white" style={{ fontFamily: 'Secular One, sans-serif', fontSize: "30px", fontWeight: '300' }}>Update Medicine Prescription</h1>
                    <div>
                    <p className="text-white" style={{ fontFamily: 'Jost, sans-serif', fontSize: '20px', fontWeight: 300 }}>Patient Name: {patientName}</p>
                    <p className="text-white" style={{ fontFamily: 'Jost, sans-serif', fontSize: '20px', fontWeight: 300 }}>Appointment Reason: {appointmentReason}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label htmlhtmlFor="medicineName" className="form-label UpdateMedicinePrescription text-white">Medicine Name</label>
                    <input type="text" className="form-control UpdateMedicinePrescription outline" id="medicineName" value={medicineName} onChange={handleMedicineNameChange} style={{ width: '500px' }}/>
                    </div>
                    <div className="mb-3 UpdateMedicinePrescription" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <label htmlhtmlFor="medicineDosage" className="form-label UpdateMedicinePrescription text-white">Medicine Dosage</label>
                      <input type="text" className="form-control UpdateMedicinePrescription outline" id="medicineDosage" value={medicineDosage} onChange={handleMedicineDosageChange} style={{ width: '500px' }} />
                    </div>
                    <div className="mb-3 UpdateMedicinePrescription" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <label htmlhtmlFor="medicineDuration" className="form-label UpdateMedicinePrescription text-white">Medicine Duration</label>
                      <input type="text" className="form-control UpdateMedicinePrescription outline" id="medicineDuration" value={medicineDuration} onChange={handleMedicineDurationChange} style={{ width: '500px' }}/>
                    </div>
                    <div className="mb-3 UpdateMedicinePrescription" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <label htmlhtmlFor="medicineFrequency" className="form-label UpdateMedicinePrescription text-white">Medicine Frequency</label>
                      <input type="text" className="form-control UpdateMedicinePrescription outline" id="medicineFrequency" value={medicineFrequency} onChange={handleMedicineFrequencyChange} style={{ width: '500px' }}/>
                    </div>
                    <div className="mb-3 UpdateMedicinePrescription">
                      <h3 class="card-title UpdateMedicinePrescription text-white" style={{ fontFamily: 'Jost, sans-serif', fontSize: '20px', fontWeight: 300 }}>Exercise Plan</h3>
                      {exercisePlan.map((day, dayIndex) => (
                        <div key={dayIndex} className="day-container mb-6 UpdateMedicinePrescription">
                          <hr/>
                          <div className="d-flex justify-content-between align-items-center mb-2 UpdateMedicinePrescription">
                            <h3 class="card-subtitle UpdateMedicinePrescription text-white">Day {dayIndex + 1}</h3>
                            {exercisePlan.length > 0 && (
                              <button id= "custom-radius" type="button" className="btn btn-danger UpdateMedicinePrescription" onClick={() => removeDay(dayIndex)}>
                                Remove Day
                              </button>
                            )}
                          </div>
                          <hr/>
                          <div className="exercise-container UpdateMedicinePrescription">
                            {day.map((exercise, exerciseIndex) => (
                              <div key={exerciseIndex} className="exercise mb-2 UpdateMedicinePrescription">
                                <div className="d-flex justify-content-between align-items-center mb-2 UpdateMedicinePrescription">
                                  <h4 id ="custom-text" class="card-subtitle UpdateMedicinePrescription text-white">Exercise {exerciseIndex + 1}</h4>
                                  <button id= "custom-radius" type="button" className="btn btn-danger UpdateMedicinePrescription" onClick={() => removeExercise(dayIndex, exerciseIndex)}>
                                    Remove Exercise
                                  </button>
                                </div>
                                <div className="mb-2">
                                  <label htmlhtmlFor={`exerciseName-${dayIndex}-${exerciseIndex}`} className="form-label text-white">Exercise Name</label>
                                  <input type="text" className="form-control NewMeditationPrescription outline" id={`exerciseName-${dayIndex}-${exerciseIndex}`} name="exerciseName" defaultValue={exercise.exerciseName} onChange={(event) => handleExercisePlanChange(event, dayIndex, exerciseIndex)} autoComplete="off" />
                                </div>
                                <div className="mb-2">
                                  <label htmlhtmlFor={`exerciseDuration-${dayIndex}-${exerciseIndex}`} className="form-label text-white">Exercise Duration</label>
                                  <input type="text" className="form-control NewMeditationPrescription outline" id={`exerciseDuration-${dayIndex}-${exerciseIndex}`} name="exerciseDuration" defaultValue={exercise.exerciseDuration} onChange={(event) => handleExercisePlanChange(event, dayIndex, exerciseIndex)} />
                                </div>
                                <div className="mb-2">
                                  <label htmlhtmlFor={`exerciseName-${dayIndex}-${exerciseIndex}`} className="form-label text-white">Exercise Frequency</label>
                                  <input type="text" className="form-control NewMeditationPrescription outline" id={`exerciseFrequency-${dayIndex}-${exerciseIndex}`} name="exerciseFrequency" defaultValue={exercise.exerciseFrequency} onChange={(event) => handleExercisePlanChange(event, dayIndex, exerciseIndex)} autoComplete="off" />
                                </div>
                                <div className="mb-2">
                                  <label htmlhtmlFor={`exerciseInstruction-${dayIndex}-${exerciseIndex}`} className="form-label text-white">Exercise Instruction</label>
                                  <input type="text" className="form-control NewMeditationPrescription outline" id={`exerciseInstruction-${dayIndex}-${exerciseIndex}`} name="exerciseInstruction" defaultValue={exercise.exerciseInstruction} onChange={(event) => handleExercisePlanChange(event, dayIndex, exerciseIndex)} autoComplete="off" />
                                </div>
                                <hr/>
                            </div>
                          ))}
                          <div className="d-flex justify-content-center UpdateMedicinePrescription">
                          <button id= "custom-radius" type="button" className="btn btn-primary UpdateMedicinePrescription" onClick={() => addExercise(dayIndex)}>
                            Add Exercise
                          </button>
                          </div>
                        </div>
                        
                      </div>
                      
                      
                    ))}
                    <hr/>
                    <div className="d-flex justify-content-center UpdateMedicinePrescription">
                    <button id= "custom-radius" type="button" className="btn btn-primary UpdateMedicinePrescription" onClick={addDay}>
                      Add Day
                    </button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center UpdateMedicinePrescription">
                  <button id= "custom-radius" type="button" className="btn btn-primary UpdateMedicinePrescription" onClick={updatePrescription}>
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