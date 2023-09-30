from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import uuid  # To generate unique filenames
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

# Load your pre-trained model
model = load_model('Without_Pretrained_Model.keras')

# Define the folder where uploaded images will be saved
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the UPLOAD_FOLDER directory exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def generate_unique_filename(filename):
    # Generate a unique filename to avoid overwriting existing files
    ext = filename.rsplit('.', 1)[1]
    unique_filename = str(uuid.uuid4()) + '.' + ext
    return unique_filename

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if an image file is in the request
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']

        # Check if the file has a valid filename
        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        # Generate a unique filename to avoid overwriting existing files
        unique_filename = generate_unique_filename(file.filename)

        # Save the uploaded image to the UPLOAD_FOLDER
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(file_path)

        # Load the saved image using keras' image.load_img
        img = image.load_img(file_path, target_size=(180, 180))

        # Convert the image to a numpy array
        img_array = image.img_to_array(img)

        # Expand dimensions to match model input shape
        img_array = np.expand_dims(img_array, axis=0)

        # Preprocess the image (e.g., normalize pixel values)
        img_array = img_array / 255.0

        # Make a prediction using your pre-trained model
        prediction = model.predict(img_array)

        # Assuming binary classification (0 or 1)
        if prediction[0][0] >= 0.5:
            result = 'Positive'
        else:
            result = 'Negative'

        return jsonify({'prediction': result})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
