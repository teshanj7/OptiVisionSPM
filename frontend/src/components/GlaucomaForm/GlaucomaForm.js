import React, { useState } from "react";
import funduspic from "./funduspic.png";
import "./GlaucomaForm.css";

export default function CreateGlaucomaForm() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [predictedResult, setPredictedResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="container-xl ml prediction-form">
      <h1 className="GFHeading">Glaucoma Detection</h1>
      <div className="GFImgDesc">
        <p>The Glaucoma detection will be done using an AI model</p>
        <br />
      </div>
      <br />
      <br />
      <div className="GFPicDiv">
        <img src={funduspic} alt="Example img" className="GFPic" />
      </div>{" "}
      <br />
      <br />
      <div className="mb-3">
        <div className="GFPara">
          <label
            htmlFor="formFile"
            className="form-label"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Insert a Retinal Fundus image like above for the evaluation
          </label>{" "}
          <br />
          <label
            htmlFor="formFile"
            className="form-label"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Fundus images can be taken using a condenser lens.
          </label>
        </div>
        <br />
        <input
          className="form-control"
          type="file"
          id="formFile"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            width: "500px",
            marginLeft: "420px",
            fontFamily: "'Jost', sans-serif",
          }}
        />
      </div>
      <div className="GFPreviewPic">
      {imagePreview && (
        <img src={imagePreview} alt="Preview" className="preview-image" />
      )}
      </div>
      <div className="container-sm">
        {loading ? (
          <h5>Loading...</h5>
        ) : (
          predictedResult &&
          (predictedResult === "Negative" ? (
            <h5>The eye doesn't have glaucoma</h5>
          ) : predictedResult === "Positive" ? (
            <div>
              <h5>The eye has glaucoma</h5>
              <h6>
                Click <a href="/AppointmentMgmt">here</a> to make an appointment
              </h6>
            </div>
          ) : null)
        )}
      </div>
      <div className="container-sm">
        <button onClick={handlePredictClick} className="GFbutton">
          Predict
        </button>
      </div>{" "}
      <br />
    </div>
  );
}
