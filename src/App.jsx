import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Ensure you import useAuth
import HomePage from './components/HomePage';
import Register from './components/Register';
import ActivitySubmission from './components/Activitysubmission';
import Finish from './components/Finish';

// Component to handle the routing for logout
const LogoutRedirect = () => {
  const { logout } = useAuth(); // Use logout from AuthContext
  const navigate = useNavigate();

  React.useEffect(() => {
    const performLogout = async () => {
      await logout(); // Await logout completion
      navigate('/'); // Redirect to homepage
    };

    performLogout();
  }, [logout, navigate]);

  return null; // No UI needed
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Default route to HomePage */}
          <Route path="/homepage" element={<HomePage />} /> {/* Add route for HomePage */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activitysubmission" element={<ActivitySubmission />} />
          <Route path="/finish" element={<Finish />} /> {/* Add the new route */}
          <Route path="/logout" element={<LogoutRedirect />} /> {/* Handle logout redirection */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
