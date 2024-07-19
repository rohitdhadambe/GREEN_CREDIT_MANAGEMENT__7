import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA75IVQ4a8X0QG_PTYq62kQxqiNONQ_GYY",
    authDomain: "tactical-orbit-427514-m7.firebaseapp.com",
    projectId: "tactical-orbit-427514-m7",
    storageBucket: "tactical-orbit-427514-m7.appspot.com",
    messagingSenderId: "797743589380",
    appId: "1:797743589380:web:863d3a92f7734750352d51",
    measurementId: "G-7TNGM0ZT3N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Auth persistence set to LOCAL');
  })
  .catch((error) => {
    console.error('Error setting auth persistence:', error);
  });

export { auth, db, storage };
