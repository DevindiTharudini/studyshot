// routes/performanceRoutes.js
const express = require('express');
const { storePerformance } = require('../controllers/performanceController');  // Import controller logic
const router = express.Router();

// Route to store performance data (e.g., quiz results)
router.post('/storePerformance', storePerformance);

module.exports = router;
