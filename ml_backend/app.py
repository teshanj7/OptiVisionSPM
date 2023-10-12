from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import uuid 
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

model = load_model('convnetModel.h5')

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def generate_unique_filename(filename):
    ext = filename.rsplit('.', 1)[1]
    unique_filename = str(uuid.uuid4()) + '.' + ext
    return unique_filename

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        unique_filename = generate_unique_filename(file.filename)

        file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(file_path)

        img = image.load_img(file_path, target_size=(180, 180))

        img_array = image.img_to_array(img)

        img_array = np.expand_dims(img_array, axis=0)

        img_array = img_array / 255.0

        prediction = model.predict(img_array)

        if prediction[0][0] >= 0.5:
            result = 'Positive'
        else:
            result = 'Negative'

        return jsonify({'prediction': result})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
