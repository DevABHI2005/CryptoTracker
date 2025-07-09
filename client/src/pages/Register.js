// ✅ Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Registered successfully!");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data || "Registration failed.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow fade-in card-hover" style={{ maxWidth: '420px', width: '100%' }}>
        <h3 className="text-center mb-3 section-title">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary w-100 btn-animate">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
