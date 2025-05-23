import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../contexts/AuthContext'; // Import context
import './style.css';

const Login = () => {
  const { login } = useContext(AuthContext); // Use auth context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Hardcoded admin check
    if (email === 'admin@example.com' && password === 'admin123') {
      login('admin-token-placeholder', 'admin'); // You can put a dummy token here
      navigate('/admin-dashboard');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const idToken = await user.getIdToken();

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();

      if (response.ok) {
        login(idToken, data.role); // Save token and role globally
        if (data.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/home');
        }
      } else {
        setErrorMsg(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setErrorMsg('Login failed. Please try again later.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="form-container sign-in">
        <form onSubmit={handleSignIn}>
          <h1>Sign In</h1>
          <span>or use your email and password</span>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {errorMsg && <p style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
