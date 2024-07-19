import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AuthProvider from './contexts/AuthContext';
import Home from './Home';
import Register from './components/Register';
import ActivitySubmission from './components/Activitysubmission';
import Finish from './components/Finish'; // Import the Finish component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activitysubmission" element={<ActivitySubmission />} />
          <Route path="/finish" element={<Finish />} /> {/* Add the new route */}
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
