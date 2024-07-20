import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import Footer from './Footer'; // Import the Footer component

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-homepage-bg bg-cover bg-center text-white">
      <Navbar /> {/* Include the Navbar component */}
      <main className="flex-grow flex flex-col items-center bg-black bg-opacity-50">
        <div className="flex flex-col justify-center items-center px-4 py-16">
          <h1 className="text-4xl font-bold mb-10 text-center animate-bounce">Welcome to Green Credit Management</h1>
          <p className="text-lg text-center text-gray-200 mb-12 max-w-2xxl">
            Be a hero for the planet! 🌍 Join us in transforming the world into a greener place by participating in meaningful environmental activities. Earn green credits as a reward for your efforts and track your positive impact on the environment. Every action counts—let’s make a difference together, one step at a time! 🌱
          </p>

          {/* About Us Section */}
          <section className="bg-homepage-bg bg-cover bg-center p-8 w-full max-w-4xl mx-auto border-4 border-green-500 rounded-lg shadow-lg">
            <div className="flex-grow flex flex-col items-center bg-black bg-opacity-70 border-4 ">
            <h2 className="text-xl font-bold mb-6 text-white">About Us...!</h2>
            <p className="mb-4 text-white">
              <strong>Green Credit Management</strong> is an innovative initiative designed to promote and reward environmental sustainability through a structured credit system. Our project aims to incentivize individuals and organizations to engage in eco-friendly activities that positively impact our planet. By participating in this voluntary program, stakeholders contribute to a greener and more sustainable future.
            </p>
            <p className="mb-4 text-white">
              <strong>Our Vision</strong>: Green Credit refers to a unit of incentive awarded to those who actively engage in practices that benefit the environment. Our goal is to encourage widespread adoption of sustainable practices by recognizing and rewarding efforts that contribute to environmental preservation.
            </p>
            <p className="mb-4 text-white">
              <strong>What We Cover</strong>:
            </p>
            <ul className="list-disc list-inside mb-4 text-white">
              <li><strong>Tree Plantation:</strong> Encouraging the planting of trees to enhance green cover and combat deforestation.</li>
              <li><strong>Water Management:</strong> Implementing strategies to conserve and manage water resources effectively.</li>
              <li><strong>Sustainable Agriculture:</strong> Advocating for eco-friendly and sustainable agricultural practices.</li>
              <li><strong>Air Pollution Reduction:</strong> Initiatives aimed at reducing air pollution and improving air quality.</li>
              <li><strong>Mangrove Conservation and Restoration:</strong> Protecting and restoring mangrove ecosystems to maintain ecological balance.</li>
            </ul>
            <p className="text-white">
              <strong>Addressing Key Concerns</strong>:
            </p>
            <ul className="list-disc list-inside text-white">
              <li><strong>Verification and Validation Complexity:</strong> We are committed to simplifying the process of verifying and validating environmentally-positive actions to minimize administrative burdens.</li>
              <li><strong>Risk of Greenwashing:</strong> To combat the risk of greenwashing, we ensure that credits are awarded based on genuine and impactful environmental contributions.</li>
              <li><strong>Compatibility with Carbon Credits:</strong> Although designed independently, we carefully consider the potential overlaps between Green Credits and carbon credits to ensure clarity and effectiveness.</li>
              <li><strong>Accounting for Regional Differences:</strong> We strive to account for regional variations in environmental impact, making adjustments to establish fair and accurate credit values across different geographical areas.</li>
            </ul>
            <p className="text-white">
              At <strong>Green Credit Management</strong>, we believe that every action counts in our mission to create a sustainable future. Join us in making a difference and earning recognition for your environmental efforts!
            </p>
            </div>
          </section>

          <div className="mb-20">
            <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg text-lg transition-transform transform hover:scale-105">
              Get Started
            </Link>
          </div>
        </div>
      </main>
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default HomePage;
