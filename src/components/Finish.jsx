import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import { auth } from '../firebase'; // Import the auth object

const Finish = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={auth.currentUser} />
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-black transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-2xl font-midium mb-4 text-green-500">Activity Submitted Successfully..!</h1>
          <p className="mb-4">Thank you for your submission, Your activity has been recorded.<br></br> Your data is under checking, We will let you soon...</p>
          <b>YOU MAY LOGOUT THE DEVICE</b><br></br>
          <Link to="/activitysubmission" className="text-blue-500 hover:text-blue-700">
            Go back to Activity Submission
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Finish;
