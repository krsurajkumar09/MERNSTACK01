import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration/Registration.jsx';
import Login from './components/Login/Login.jsx';
import Home from './components/Home/Home.jsx';
import axios from 'axios';

axios.defaults.withCredentials = true; // Enable sending cookies with requests

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:3001/protected');
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  // useEffect(() => {
  //   axios.get('http://localhost:3001/protected')
  //     .then(response => {
  //       setIsAuthenticated(true);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setIsAuthenticated(false);
  //       setLoading(false);
  //     });
  // }, []);
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    axios.get('http://localhost:3001/logout')
      .then(response => {
        setIsAuthenticated(false);
      })
      .catch(error => {
        console.error("Logout failed");
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Registration />} />
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/' element={
          isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
}

export default App;
