import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link } from "react-router-dom";
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    const validateEmail = (email) => {
      const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return re.test(String(email).toLowerCase());
    }
    
    const validatePhone = (phone) => {
      const re = /^\d{10}$/; // Simple validation for a 10-digit phone number
      return re.test(String(phone));
    }
    
    const validatePassword = (password) => {
      return password.length >= 8; // Ensure password is at least 8 characters long
    }
    
    if (!name || !phone || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    if (!validatePhone(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    
    // If all validations pass
    setError(''); // Clear any previous errors
    // Proceed with form submission or other logic
    

    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: "/avtar.jpg",
      });

      let photoURL = '';
      if (photo) {
        const photoRef = ref(storage, `photos/${user.uid}`);
        await uploadBytes(photoRef, photo);
        photoURL = await getDownloadURL(photoRef);
      }

      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        phone: phone,
        email: email,
        photoURL: photoURL,
      });

      login(user);
      localStorage.setItem('currentUser', JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        photoURL: photoURL,
      }));

      navigate('/activitysubmission');
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100  border-4 border-green-500">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 animate-fade-in">Register</h2>
        {error && <p className="text-center text-red-500 mb-4 animate-fade-in">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="animate-slide-in">
              <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="animate-slide-in">
              <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="animate-slide-in">
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="animate-slide-in">
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-500 ease-in-out transform hover:scale-105"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600 animate-fade-in">
          Already registered? <Link className="text-green-500 hover:underline" to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
