//@ts-nocheck
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

// const firebase = require('firebase');
// const firebaseui = require('firebaseui');

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
;

  // Starts the firebase app in the frontend, seperate from firebase in the backend
  const app = initializeApp(firebaseConfig);

  // Starts and exports the auth part of firebase
  const auth = getAuth(app);

  // const ui = new firebaseui.auth.AuthUI(firebase.auth());

  // ui.start('#firebaseui-auth-container', {
  //   signInOptions: [
  //     {
  //       provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
  //       signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
  //       requireDisplayName: true
  //     }
  //   ]
  // });
  

  export default auth;
