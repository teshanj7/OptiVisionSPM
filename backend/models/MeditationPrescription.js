const mongoose = require('mongoose');

const exercisePlanSchema = new mongoose.Schema({
  day: {
    type: String,
    
  },
  exerciseName: {
    type: String,
    required: true
  },
  exerciseDuration: {
    type: String,
    required: true
  },
  exerciseFrequency: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  },
  exerciseInstruction: {
    type: String,
  },
});

const MeditationPrescriptionSchema = new mongoose.Schema({

  userID: {
    type: String,
    required: true
  },

  medicineName: {
    type: String,
    required: true
  },
  medicineDosage: {
    type: String,
    required: true
  },
  medicineDuration : {
    type: String,
    required: true
  },
  medicineFrequency : {
    type: String,
    required: true
  },
  patientName : {
    type: String,
    required: true
  },
  appointmentReason : {
    type: String,
    required: true
  },
  exercisePlan: {
    type: [[exercisePlanSchema]],
    required: true
  }
});

const MeditationPrescription = mongoose.model('MeditationPrescription', MeditationPrescriptionSchema);

module.exports = MeditationPrescription;