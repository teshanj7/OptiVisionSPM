const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

// Regsiter a User
router.post("/add", registerUser);

// Login user
router.post("/login", loginUser);

module.exports = router;