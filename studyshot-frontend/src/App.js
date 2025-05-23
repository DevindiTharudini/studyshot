// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

import './App.css';

import AuthToggle from './components/AuthToggle';
import HomePage from './components/HomePage';
import ModuleSelection from './components/ModuleSelection';
import QuizPage from './components/QuizPage';
import AboutUs from './components/AboutUs';
import AdminDashboard from './components/AdminDashboard';
import UserManagement from './components/UserManagement';
import ModuleManagement from './components/ModuleManagement';
import QuizManagement from './components/AdminQuizManagement';
import FeedbackReview from './components/FeedbackReview';
import CertificateManagement from './components/CertificateManagement';

import './components/AdminDashboard.css';
import './components/UserManagement.css';
import './components/ModuleManagement.css';
import './components/AdminQuizManagement.css';
import './components/FeedbackReview.css';
import './components/CertificateManagement.css';
import '.style.css';
import PrivateRoute from './components/PrivateRoute'; // Import your PrivateRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public login/signup */}
        <Route path="/login" element={<AuthToggle />} />

        {/* Main app routes (require user to be logged in) */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/module-selection"
          element={
            <PrivateRoute>
              <ModuleSelection />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz/:moduleId"
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/about-us"
          element={
            <PrivateRoute>
              <AboutUs />
            </PrivateRoute>
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-management"
          element={
            <PrivateRoute requiredRole="admin">
              <UserManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/module-management"
          element={
            <PrivateRoute requiredRole="admin">
              <ModuleManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz-management"
          element={
            <PrivateRoute requiredRole="admin">
              <QuizManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/feedback-review"
          element={
            <PrivateRoute requiredRole="admin">
              <FeedbackReview />
            </PrivateRoute>
          }
        />
        <Route
          path="/certificate-management"
          element={
            <PrivateRoute requiredRole="admin">
              <CertificateManagement />
            </PrivateRoute>
          }
        />

        {/* Catch-all redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
