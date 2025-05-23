import React, { useState } from 'react';
import Login from './login';
import Register from './Register';

const AuthToggle = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`}>
      {isSignUp ? <Register /> : <Login />}

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button onClick={handleToggle}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button onClick={handleToggle}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthToggle;
