import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from 'react-router-dom'; // 👈 fixes Navigate error
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import { useUser } from './context/Temp';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './context/Temp';
import NewsPage from './pages/NewsPage';
const PrivateRoute = ({ children }) => {
  const { user } = useUser(); // 🔁 use context instead of localStorage
  return user ? children : <Navigate to="/login" />;
};


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  } />
  <Route path="/profile" element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  } />
  
  <Route path="/news" element={<NewsPage />} />
</Routes>

    </Router>
  );
}




export default App;
