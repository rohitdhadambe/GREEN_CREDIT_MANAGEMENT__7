import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import Navbar from './Navbar';
import Footer from './Footer'; // Import the Footer component
import { onAuthStateChanged } from 'firebase/auth';

const CameraSection = ({ photoURL, setPhotoURL, startCamera, capturePhoto, videoRef, canvasRef }) => (
  <div className="camera-section mb-6 p-4 border-2 border-solid border-gray-300 rounded-lg shadow-lg hover:shadow-2xl hover:border-gray-500 transition-shadow duration-300">
    {photoURL ? (
      <div>
        <img src={photoURL} alt="Captured" className="w-48 h-48 mx-auto rounded-lg border-2 border-gray-300 shadow-lg" />
        <button
          onClick={() => setPhotoURL(null)}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          Retake Photo
        </button>
      </div>
    ) : (
      <div>
        <video ref={videoRef} className="w-48 h-48 mx-auto rounded-lg mb-2 border-2 border-gray-300 shadow-lg" autoPlay playsInline />
        <canvas ref={canvasRef} className="hidden"></canvas>
        <button
          onClick={startCamera}
          className="mr-2 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          Start Camera
        </button>
        <button
          onClick={capturePhoto}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          Capture Photo
        </button>
      </div>
    )}
  </div>
);

const StatusSelection = ({ status, setStatus }) => (
  <div className="mb-6 p-4 border-2 border-solid border-gray-300 rounded-lg shadow-lg hover:shadow-2xl hover:border-gray-500 transition-shadow duration-300">
    <label className="block mb-2 text-lg font-bold">ACTIVITY SUBMISSION STATUS -</label>
    <select
      onChange={(e) => setStatus(e.target.value)}
      className="select w-full p-2 border-2 border-gray-300 rounded-lg shadow-inner"
      value={status}
    >
      <option value="before">Before</option>
      <option value="during">During</option>
      <option value="after">After</option>
    </select>
  </div>
);

const CreditSelection = ({ selectedCreditType, handleCreditSelection }) => (
  <div className="mb-6 p-4 border-2 border-solid border-gray-300 rounded-lg shadow-lg hover:shadow-2xl hover:border-gray-500 transition-shadow duration-300">
    <label className="block mb-2 text-lg font-bold"> SELECT A TYPE OF CREDIT YOU WANT -</label>
    <select
      onChange={(e) => handleCreditSelection(e.target.value)}
      className="select w-full p-2 border-2 border-gray-300 rounded-lg shadow-inner"
      value={selectedCreditType}
    >
      <option value="">Select Credit Type</option>
      <option value="Carbon Credit">Carbon Credit</option>
      <option value="Green Credit">Green Credit</option>
    </select>
  </div>
);

const GreenCreditQuestions = ({ responses, handleChange }) => (
  <div className="mb-6 p-4 border-2 border-solid border-gray-300 rounded-lg shadow-lg hover:shadow-2xl hover:border-gray-500 transition-shadow duration-300">
    <h4 className="text-lg font-bold mb-4">ENTER YOUR REGIONAL DETAILS -</h4>
    <div className="mb-4">
      <label className="block font-medium text-gray-700">1.Enter the hectare you covered during tree planting.</label>
      <input
        type="text"
        name="city"
        value={responses.city}
        onChange={handleChange}
        className="mt-1 p-2 border-2 border-gray-300 rounded-lg w-full shadow-inner"
      />
    </div>
    <div className="mb-4">
      <label className="block font-medium text-gray-700">2.Enter the number of saplings you planted on that particular land.
      </label>
      <input
        type="text"
        name="locality"
        value={responses.locality}
        onChange={handleChange}
        className="mt-1 p-2 border-2 border-gray-300 rounded-lg w-full shadow-inner"
      />
    </div>
    <div className="mb-4">
      <label className="block font-medium text-gray-700">3.Enter your actual landmark.</label>
      <input
        type="text"
        name="region"
        value={responses.region}
        onChange={handleChange}
        className="mt-1 p-2 border-2 border-gray-300 rounded-lg w-full shadow-inner"
      />
    </div>
    <div className="mb-4">
      <label className="block font-medium text-gray-700">4. Was this activity carried out individually or by a group (ANY NGO).</label>
      <input
        type="text"
        name="country"
        value={responses.country}
        onChange={handleChange}
        className="mt-1 p-2 border-2 border-gray-300 rounded-lg w-full shadow-inner"
      />
    </div>
  </div>
);

const LocationInfo = ({ latitude, longitude, locationDetails, fetchingLocation }) => (
  <div className="mb-6 p-4 border-2 border-solid border-gray-300 rounded-lg shadow-lg hover:shadow-2xl hover:border-gray-500 transition-shadow duration-300">
    <h4 className="text-lg font-bold mb-4">LOCATION DETAILS -</h4>
    {fetchingLocation ? (
      <p>Fetching location...</p>
    ) : (
      <div className="space-y-1">
        <p><strong>Latitude:</strong> {latitude}</p>
        <p><strong>Longitude:</strong> {longitude}</p>
        <p><strong>City:</strong> {locationDetails.locality || ''}</p>
        <p><strong>Locality:</strong> {locationDetails.city || ''}</p>
        <p><strong>Region:</strong> {locationDetails.region || ''}</p>
        <p><strong>Country:</strong> {locationDetails.country || ''}</p>
      </div>
    )}
  </div>
);

const ActivitySubmission = () => {
  const [photoURL, setPhotoURL] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationDetails, setLocationDetails] = useState({});
  const [fetchingLocation, setFetchingLocation] = useState(true);
  const [activityType, setActivityType] = useState('');
  const [status, setStatus] = useState('before');
  const [selectedCreditType, setSelectedCreditType] = useState('');
  const [responses, setResponses] = useState({
    city: '',
    locality: '',
    region: '',
    country: '',
  });
  const [userPhone, setUserPhone] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [greenCreditValue, setGreenCreditValue] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const mapContainerRef = useRef(null); // Ref for the map container element

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            const data = await response.json();
            setLocationDetails({
              locality: data.locality || '',
              city: data.city || '',
              region: data.principalSubdivision || '',
              country: data.countryName || '',
            });
            setFetchingLocation(false);
            const greenCredit = getGreenCreditValue(data.locality);
            setGreenCreditValue(greenCredit);
          } catch (error) {
            console.error('Error fetching location details:', error);
            setFetchingLocation(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setFetchingLocation(false);
        }
      );
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (latitude && longitude) {
      // Initialize map when latitude and longitude are available
      initMap();
    }
  }, [latitude, longitude]);

  const initMap = () => {
    const map = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 14,
    });

    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: 'Your Location',
    });
  };

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => console.error('Error accessing camera:', error));
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasRef.current.toBlob(async (blob) => {
      const storageRef = ref(storage, `photos/${Date.now()}.jpg`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      setPhotoURL(url);
    }, 'image/jpeg');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert('You must be logged in to submit an activity.');
      return;
    }
    try {
      const docRef = await addDoc(collection(db, 'activities'), {
        userName: auth.currentUser.displayName,
        userEmail: auth.currentUser.email,
        userPhone,
        latitude,
        longitude,
        locationDetails,
        photoURL,
        activityType,
        status,
        selectedCreditType,
        responses,
        greenCreditValue,
        timestamp: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
      navigate('/finish');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error submitting activity. Please try again.');
    }
  };

  const handleCreditSelection = (type) => {
    setSelectedCreditType(type);
  };

  const handleResponseChange = (e) => {
    const { name, value } = e.target;
    setResponses((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to calculate green credit value based on locality
  const getGreenCreditValue = (locality) => {
    // Add more cases as needed
    switch (locality) {
        case 'Pune':
        return 0.741;
        case 'coimbatore':
        return 1.111;
      default:
        return null; // Return null for other localities, adjust as per your data
    }
  };

  return (
    <div>
      <Navbar user={auth.currentUser} />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-medium mb-4">ACTIVITY SUBMISSION</h2>
        <CameraSection
          photoURL={photoURL}
          setPhotoURL={setPhotoURL}
          startCamera={startCamera}
          capturePhoto={capturePhoto}
          videoRef={videoRef}
          canvasRef={canvasRef}
        />
        <LocationInfo
          latitude={latitude}
          longitude={longitude}
          locationDetails={locationDetails}
          fetchingLocation={fetchingLocation}
        />
        <div ref={mapContainerRef} className="h-96 border-2 border-solid border-gray-300 rounded-lg shadow-lg mb-6"></div>
        <div className="mb-6 p-4 border-2 border-solid border-gray-300 rounded-lg shadow-lg hover:shadow-2xl hover:border-gray-500 transition-shadow duration-300">
          <h4 className="text-lg font-bold mb-4">ACTUAL GREEN CREDIT VALUE ACCORDING TO YOUR LOCATION</h4>
          <p>{greenCreditValue !== null ? `Green Credit Value for ${locationDetails.locality}: ${greenCreditValue}` : 'Fetching green credit value...'}</p>
        </div>
        <div className="mb-6 p-4 border-2 border-solid border-gray-300 rounded-lg shadow-lg hover:shadow-2xl hover:border-gray-500 transition-shadow duration-300">
          <label className="block mb-2 text-lg font-bold">ACTIVITY TYPE</label>
          <select
            onChange={(e) => setActivityType(e.target.value)}
            className="select w-full p-2 border-2 border-gray-300 rounded-lg shadow-inner"
            value={activityType}
          >
            <option value="">Select Activity Type</option>
            <option value="TREE PLANTATION">Tree Planting</option>
            <option value="WATER MANAGEMENT">Water Management</option>
            <option value="AIR POLLUTION">Air Pollution</option>
          </select>
        </div>
        <StatusSelection status={status} setStatus={setStatus} />
        <CreditSelection
          selectedCreditType={selectedCreditType}
          handleCreditSelection={handleCreditSelection}
        />
        <GreenCreditQuestions responses={responses} handleChange={handleResponseChange} />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 font-bold"
          onClick={handleSubmit}
        >
          SUBMIT ACTIVITY
        </button>
      </div>
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
};

export default ActivitySubmission;
