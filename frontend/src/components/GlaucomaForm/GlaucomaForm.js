import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../ContextComponents/ContextComponent";
import funduspic from "./funduspic.png";
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
      <h1 className="GFHeading">Glaucoma Detection</h1>
      <div className="GFImgDesc">
        <p>fssgsfgsfgsfgsgsgsrgsgsrgsrgsgsfgsgsgsgsfgsfgsgsfrewwwtwrtwrtwr
          <br/>fadfsdfsgsgsgsfgsgsgsgsgsgsgsgsfgsgsgsgsgsgsgwrtwrtrwtwrt
          <br/>sdgsfgsfgsfgsrfgsgrgsgsfgsfgsfgsfgsgsgsgsgsgstwrtewrhdhyrjt
        </p>
        <br/>
      </div>
      <br /><br/>
      <div className="GFPicDiv">
        <img src={funduspic} className="GFPic" />
      </div> <br/><br/>
      <div className="mb-3">
      <div className="GFPara">
      <label htmlFor="formFile" className="form-label" style={{ fontFamily: "'Jost', sans-serif", fontSize: "30px", fontWeight: "bold" }}>
          Insert a Retinal Fundus image for the evaluation
        </label> <br />
        <label htmlFor="formFile" className="form-label" style={{ fontFamily: "'Jost', sans-serif", fontSize: "20px",fontWeight: "bold" }}>
          Fundus images can be taken using a condenser lens.
        </label>
      </div><br />
        <input
          className="form-control"
          type="file"
          id="formFile"
          accept="image/*"
          onChange={handleFileChange}
          style={{ width: "500px", marginLeft: "420px", fontFamily: "'Jost', sans-serif" }}
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
                <a href="/AppointmentMgmt" >Make an appointment</a>
              </div>
            ) : null
          )
        )}
      </div>
      <div className="container-sm">
        <button onClick={handlePredictClick} className="GFbutton">
          Predict
        </button>
      </div> <br/>
    </div>
  );
}
