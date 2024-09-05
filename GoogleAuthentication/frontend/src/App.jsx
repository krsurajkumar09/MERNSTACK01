import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GoogleLogin from './components/GoogleLogin';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import { GoogleOAuthProvider } from '@react-oauth/google';
import RefreshHandler from './components/RefreshHandler';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <GoogleOAuthProvider clientId='132351255523-agn4ef8kcdccg9qjg4mf2ct1pt9orgar.apps.googleusercontent.com'>
      <BrowserRouter>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/login" element={<GoogleLogin />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;