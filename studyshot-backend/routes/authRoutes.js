// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController'); // Import controller logic
const router = express.Router();

// Route to register a new user
router.post('/register', register);

// Route to log in an existing user
router.post('/login', login);

module.exports = router;
