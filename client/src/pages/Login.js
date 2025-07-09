// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/Temp';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      login(res.data); // assume res.data contains user object
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
  try {
    const decoded = jwtDecode(credentialResponse.credential);
    const user = {
  name: decoded.name,
  email: decoded.email, // make sure this exists
  picture: decoded.picture,
};
localStorage.setItem('user', JSON.stringify(user));

login(user);
navigate('/');// redirect
  } catch (err) {
    console.error('JWT Decode error:', err);
  }
};



  return (
    <div className="vh-100 d-flex align-items-center justify-content-center login-wrapper">
      <ParticleBackground />

      <motion.div
        className="glass-card p-4 shadow-lg"
        style={{ maxWidth: '420px', width: '100%' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="mb-4 text-center text-light">🔐 Login to CryptoDash</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">Email</label>
            <input
              type="email"
              className="form-control bg-dark text-light border-0"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control bg-dark text-light border-0"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary">🚀 Login</button>
          </div>
        </form>

        <div className="text-center text-light mb-2">or</div>

        <div className="d-flex justify-content-center">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => alert('Google login failed')}
            theme="filled_blue"
            size="medium"
            width="300"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
