import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);

  if (!isAuthenticated) {
    // Not logged in — redirect to login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Logged in but does not have required role — redirect to home
    return <Navigate to="/home" replace />;
  }

  // Authorized — render the child component(s)
  return children;
};

export default PrivateRoute;
