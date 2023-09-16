const router = require("express").Router();
const bodyParser = require('body-parser');
const MeditationPrescription = require("../models/MeditationPrescription"); // Import the MeditationPrescription model

router.use(bodyParser.json());

// Create a Meditation Prescription
router.post("/addMeditationPrescription", async (req, res) => {
  try {
    const newMeditationPrescription = new MeditationPrescription(req.body);
    await newMeditationPrescription.save();
    res.json("Meditation Prescription Added");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Get all meditation prescriptions for a specific user
router.get('/getMeditationPrescriptions/:userID', async (req, res) => {
  const userID = req.params.userID;
  try {
    const prescriptions = await MeditationPrescription.find({ userID: userID });
    res.json(prescriptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Endpoint to retrieve existing exercises for a specific user
router.get("/getMeditationPrescriptionsAppoinment/:patientName", async (req, res) => {
  const patientName = req.params.patientName;

  try {
    const prescriptions = await MeditationPrescription.find({ patientName: patientName });
    res.json(prescriptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/getPrescriptionDetails/:patientName/:appointmentReason", async (req, res) => {
  const { patientName, appointmentReason } = req.params;

  try {
    const prescription = await MeditationPrescription.find({ patientName, appointmentReason });
    
    if (!prescription || prescription.length === 0) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    res.json(prescription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});


// Get a single Meditation Prescription by ID
router.get('/:id', async (req, res) => {
  const prescriptionId = req.params.id;
  try {
    const prescription = await MeditationPrescription.findById(prescriptionId);
    if (!prescription) {
      return res.status(404).json({ error: "No such prescription" });
    }
    res.status(200).json(prescription);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error with getting prescription", message: err.message });
  }
});

// Delete a prescription by ID
router.delete('/:id', async (req, res) => {
  const prescriptionId = req.params.id;
  try {
    await MeditationPrescription.findByIdAndDelete(prescriptionId);
    res.status(200).json({ status: "Prescription deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error deleting prescription", error: err.message });
  }
});

// Update a Meditation Prescription by ID
router.put('/update/:id', async (req, res) => {
  const { medicineName, medicineDosage, medicineDuration, medicineFrequency, exercisePlan } = req.body;
  const { id } = req.params;

  try {
    const prescription = await MeditationPrescription.findById(id);

    if (!prescription) {
      return res.status(404).json({ message: 'Meditation prescription not found' });
    }

    prescription.medicineName = medicineName;
    prescription.medicineDosage = medicineDosage;
    prescription.medicineDuration = medicineDuration;
    prescription.medicineFrequency = medicineFrequency;
    prescription.exercisePlan = exercisePlan;

    const updatedPrescription = await prescription.save();
    res.json(updatedPrescription);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Search for prescriptions by a keyword
router.route("/search/:key").get(async (req, res) => {
  try {
    const { key } = req.params;
    let result = await MeditationPrescription.find({
      "$or": [
        { medicineName: { $regex: key, $options: "i" } },
      ]
    });
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Add other routes related to MeditationPrescription as needed

module.exports = router;
