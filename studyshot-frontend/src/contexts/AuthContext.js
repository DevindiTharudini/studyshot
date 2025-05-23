import React, { createContext, useState, useEffect } from 'react';

// Create the context object
export const AuthContext = createContext();

// Provider component to wrap your app and provide auth state
export const AuthProvider = ({ children }) => {
  // Load initial auth state from localStorage (if any)
  const [userToken, setUserToken] = useState(() => localStorage.getItem('userToken'));
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!userToken);

  // Update isAuthenticated when token changes
  useEffect(() => {
    setIsAuthenticated(!!userToken);
    if (!userToken) {
      setUserRole(null);
    }
  }, [userToken]);

  // Function to log in (set token and role)
  const login = (token, role) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userRole', role);
    setUserToken(token);
    setUserRole(role);
  };

  // Function to log out (clear token and role)
  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    setUserToken(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ userToken, userRole, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
