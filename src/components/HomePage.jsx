import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component

const HomePage = () => {
  return (
    <div className="bg-homepage-bg bg-cover bg-center min-h-screen">
      <Navbar /> {/* Include the Navbar component */}
      <div className="flex flex-col justify-center items-center px-4 py-16 bg-black bg-opacity-60 min-h-screen">
        <h1 className="text-4xl font-bold mb-4 text-center text-white animate-bounce">Welcome to Green Credit Management</h1>
        <p className="text-lg text-center text-gray-200 mb-8">Be a hero for the planet! 🌍 Join us in transforming the world into a greener place by participating in meaningful environmental activities. Earn green credits as a reward for your efforts and track your positive impact on the environment. Every action counts—let’s make a difference together, one step at a time! 🌱
        </p>
        <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg text-lg transition-transform transform hover:scale-105">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
