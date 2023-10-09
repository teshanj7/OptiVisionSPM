import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../ContextComponents/ContextComponent";
import "./GlaucomaForm.css"; 

export default function CreateGlaucomaForm() {
  const { user } = useContext(UserContext);
  const userID = user._id;

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [predictedResult, setPredictedResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredictClick = () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.prediction);
          setPredictedResult(data.prediction);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="container-xl ml prediction-form">
      <h1>Glaucoma Detection</h1>
      <div className="mb-3"> 
        <label htmlFor="formFile" className="form-label">
          Insert a Retinal Fundus image for the evaluation
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {imagePreview && (
        <img src={imagePreview} alt="Preview" className="preview-image" />
      )}
      <div className="container-sm">
        {predictedResult && (
          predictedResult === "Negative" ? (
            <p>the eye doesn't have glaucoma</p>
          ) : (
            predictedResult === "Positive" ? (
              <div>
              <p>you have glaucoma</p>
              <a href = "/AppointmentMgmt" >Make an appointment</a>
              </div>
            ) : null
          )
        )}
      </div>
      <div className="container-sm">
        <button onClick={handlePredictClick} className="ml-predict-button">
          Predict
        </button>
      </div>
    </div>
  );
}
