import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from '../ContextComponents/ContextComponent';
import './NewMeditationPrescription.css'; 

export default function NewMeditationPrescription() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { patientName, appointmentReason } = location.state || {};
  const userID = user._id;
  const [medicineName, setMedicineName] = useState("");
  const [medicineDosage, setMedicineDosage] = useState("");
  const [medicineDuration, setMedicineDuration] = useState("");
  const [medicineFrequency, setMedicineFrequency] = useState("");
  const [exercisePlan, setExercisePlan] = useState([]);
  const [existingData, setExistingData] = useState([]);

  useEffect(() => {
    // Fetch existing data when the component mounts
    axios
      .get(`http://localhost:8040/meditationPrescription/getMeditationPrescriptionsAppoinment/${patientName}`)
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          // Assuming `res.data` is an array of existing data
          setExistingData(res.data);

          // Check if there is existing data with the same appointmentReason
          const hasData = res.data.some(item => item.appointmentReason === appointmentReason);
          if (hasData) {
            alert("Already Have an exercise");
            navigate('/DRelatedAppoinment');
          }
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [patientName, appointmentReason]);

  const handleCreateMeditationPrescription = () => {

    
    
    if (!medicineName) {
      alert("Please enter a medicine name");
      return;
    }
    if (!medicineDosage) {
      alert("Please enter medicine dosage");
      return;
    }
    if (!medicineDuration) {
      alert("Please enter medicine duration");
      return;
    }
    if (!medicineFrequency) {
      alert("Please enter medicine frequency");
      return;
    }
    

    const newMeditationPrescription = {
      userID,
      medicineName,
      medicineDosage,
      medicineDuration,
      medicineFrequency,
      patientName: patientName,
      appointmentReason: appointmentReason,
      exercisePlan,
    };

    axios.post("http://localhost:8040/meditationPrescription/addMeditationPrescription", newMeditationPrescription)
      .then(() => {
        alert("Meditation Prescription Added");
        navigate(`/DCreatedRecoveryPlans`);
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
        <div className="container-md ">
          <div className="row justify-content-center ">
            <div className="col-md-8 col-lg-10 col-xl-12">
              <div className="card shadow w-50 cardoutline mx-auto ">
                <div className="card w-100 card shadow" >
                  <div className="card-body ">
                    <h1 className="card-title NewMeditationPrescription text-white" style={{ fontFamily: 'Secular One, sans-serif', fontSize: "30px", fontWeight: '300' }}>Create a new Meditation Prescription</h1>
                    <div>
                      <p className="text-white" style={{ fontFamily: 'Jost, sans-serif', fontSize: '20px', fontWeight: 300 }}>Patient Name: {patientName}</p>
                      <p className="text-white" style={{ fontFamily: 'Jost, sans-serif', fontSize: '20px', fontWeight: 300 }}>Appointment Reason: {appointmentReason}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
                      <label htmlFor="medicineName" className="form-label text-white" >Medicine Name</label>
                      <input type="text" className="form-control NewMeditationPrescription outline" id="medicineName" value={medicineName} onChange={handleMedicineNameChange} style={{ width: '500px' }} autoComplete="off" required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
                      <label htmlFor="medicineDosage" className="form-label text-white">Medicine Dosage</label>
                      <input type="text" className="form-control NewMeditationPrescription outline" id="medicineDosage" value={medicineDosage} onChange={handleMedicineDosageChange} style={{ width: '500px' }} autoComplete="off" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
                      <label htmlFor="medicineDuration" className="form-label text-white">Medicine Duration</label>
                      <input type="text" className="form-control NewMeditationPrescription outline" id="medicineDuration" value={medicineDuration} onChange={handleMedicineDurationChange} style={{ width: '500px' }} autoComplete="off" required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
                      <label htmlFor="medicineFrequency" className="form-label text-white">Medicine Frequency</label>
                      <input type="text" className="form-control NewMeditationPrescription outline" id="medicineFrequency" value={medicineFrequency} onChange={handleMedicineFrequencyChange} style={{ width: '500px' }} autoComplete="off" required />
                    </div>
                    <div className="mb-3">
                      <h3 className="card-title text-white">Exercise Plan</h3>
                      {exercisePlan.map((day, dayIndex) => (
                        <div key={dayIndex} className="day-container mb-6">
                          <hr /> 
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h3 id ="custom-text" className="card-subtitle text-white">Day {dayIndex + 1}</h3>
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
                                
                                  <h4 id ="custom-text" className="card-subtitle text-white" >Exercise {exerciseIndex + 1}</h4>
                                  <button id= "custom-radius" type="button" className="btn btn-danger" onClick={() => removeExercise(dayIndex, exerciseIndex)}>
                                    Remove Exercise
                                  </button>
                                </div>
                                <div className="mb-2">
                                  <label htmlFor={`exerciseName-${dayIndex}-${exerciseIndex}`} className="form-label text-white">Exercise Name</label>
                                  <input type="text" className="form-control NewMeditationPrescription outline" id={`exerciseName-${dayIndex}-${exerciseIndex}`} name="exerciseName" defaultValue={exercise.exerciseName} onChange={(event) => handleExercisePlanChange(event, dayIndex, exerciseIndex)} autoComplete="off" />
                                </div>
                                <div className="mb-2">
                                  <label htmlFor={`exerciseDuration-${dayIndex}-${exerciseIndex}`} className="form-label text-white">Exercise Duration</label>
                                  <input type="text" className="form-control NewMeditationPrescription outline" id={`exerciseDuration-${dayIndex}-${exerciseIndex}`} name="exerciseDuration" defaultValue={exercise.exerciseDuration} onChange={(event) => handleExercisePlanChange(event, dayIndex, exerciseIndex)} />
                                </div>
                                <div className="mb-2">
                                  <label htmlFor={`exerciseName-${dayIndex}-${exerciseIndex}`} className="form-label text-white">Exercise Frequency</label>
                                  <input type="text" className="form-control NewMeditationPrescription outline" id={`exerciseFrequency-${dayIndex}-${exerciseIndex}`} name="exerciseFrequency" defaultValue={exercise.exerciseFrequency} onChange={(event) => handleExercisePlanChange(event, dayIndex, exerciseIndex)} autoComplete="off" />
                                </div>
                                <div className="mb-2">
                                  <label htmlFor={`exerciseInstruction-${dayIndex}-${exerciseIndex}`} className="form-label text-white">Exercise Instruction</label>
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
              
          </div>
          
        </div>
      </div>
      <br/>
      </div>
    </>
  );
}
