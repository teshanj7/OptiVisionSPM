import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../ContextComponents/ContextComponent";
import "./GlaucomaForm.css"; // Import the CSS file

export default function CreateGlaucomaForm() {
  const { user } = useContext(UserContext);
  const userID = user._id;

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    // Display a preview of the selected image
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
          // Handle the prediction result here
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
    <div class="container-md ML">
        <div class="mb-3">
          <label for="formFile" class="form-label">
            Select an Image
          </label>
          <input
            class="form-control"
            type="file"
            id="formFile"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="preview-image" />
        )}
        <button onClick={handlePredictClick} className="predict-button">
          Predict
        </button>
        </div>
    </>
  );
}