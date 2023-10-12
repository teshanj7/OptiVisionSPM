const router = require("express").Router();
let Appointment = require("../models/appointment");

//create appointment
router.route("/add").post((req, res) => {
    const { userId, fullName, age, email, telephoneNo, reasonOfApp, docName, date } = req.body;

    const currentDate = new Date();
    const appointmentDate = new Date(date);

    if (appointmentDate < currentDate) {
        return res.status(400).json({ message: 'Appointment date must be in the future' });
    }

    const newAppointment = new Appointment({
        userId,
        fullName,
        age,
        email,
        telephoneNo,
        reasonOfApp,
        docName,
        date
    })

    newAppointment.save().then(() => {
        //validations
        if (age <= 0 || !age === 'number') {
            return res.status(400).json({ message: 'Age must be positive' })
        }
        if (!fullName || !age || !email || !telephoneNo || !reasonOfApp || !date) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        res.json("Appointment made succesfully!")
    }).catch((error) => {
        console.log(error);
    })
})

//view appointment
router.route("/").get((req, res) => {

    Appointment.find().then((appointments) => {
        res.json(appointments)
    }).catch((error) => {
        console.log(error);
    })
})

//update an appointment
router.route("/update/:id").put(async (req, res) => {
    let appointmentId = req.params.id;
    const { userId, fullName, age, email, telephoneNo, reasonOfApp, docName, date } = req.body;

    const updateAppointment = {
        userId,
        fullName,
        age,
        email,
        telephoneNo,
        reasonOfApp,
        docName,
        date
    }

    const update = await Appointment.findByIdAndUpdate(appointmentId, updateAppointment).then(() => {
        res.status(200).send({ status: "Appointment successfully updated!" })
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Appointment update unsuccessful, try again", error: error.message });
    })
})

//delete appointment
router.route("/delete/:id").delete(async (req, res) => {

    let appointmentId = req.params.id;

    await Appointment.findByIdAndDelete(appointmentId).then(() => {
        res.status(200).send({ status: "Appointment deleted!" });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Appointment deletion unsuccessful!", error: error.message });
    })
})

//view one appointment
router.route("/get/:id").get(async (req, res) => {
    let appointmentId = req.params.id;

    const appointment = await Appointment.findById(appointmentId).then((appointment) => {
        res.status(200).send({ appointment });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error with fetching the appointment!", error: error.message });
    })
})

//search appointment
router.route("/search/:key").get(
    async (req, resp) => {
        let result = await Appointment.find({
            "$or": [
                {
                    docName: { $regex: req.params.key }
                },
                {
                    reasonOfApp: { $regex: req.params.key }
                }
            ]
        });
        resp.send(result);
    })

module.exports = router;