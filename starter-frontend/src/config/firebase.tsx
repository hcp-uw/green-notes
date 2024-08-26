import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// All sensitive data is in .env file that isn't part of
// the github repo for obvious reasons.
const firebaseConfig = {
    apiKey:process.env.REACT_APP_API_KEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_APP_ID,
    measurementId:process.env.REACT_APP_MEASUREMENT_ID
  };


// Starts the firebase app in the frontend, seperate from firebase in the backend
const app = initializeApp(firebaseConfig);

// Starts and exports the auth part of firebase
const auth = getAuth(app);

// Starts and exports the database part of firebase
const db = getFirestore(app);

const storage = getStorage(app);
  

export { auth, db, storage };