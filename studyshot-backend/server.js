// server.js
const express = require('express');
const cors = require('cors');  // To enable CORS for frontend-backend communication

const { admin, db, auth } = require('./firebase');  // Firebase initialization
const authRoutes = require('./routes/authRoutes');  // Authentication routes
const performanceRoutes = require('./routes/performanceRoutes');  // Performance routes

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for frontend origin (adjust if your frontend URL differs)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Basic health check route
app.get('/', (req, res) => {
  res.send('StudyShot Backend is running!');
});

// Use authentication routes (e.g., /api/auth/register, /api/auth/login)
app.use('/api/auth', authRoutes);

// Use performance routes (e.g., /api/performance/storePerformance)
app.use('/api/performance', performanceRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
