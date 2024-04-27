/*
    Notice that most of the comments are for setting up firebase stuff
    Will get back to backend firebase once firebase in the front end
    is set up, because apparently that's a thing?
*/


// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore"

// const firebase = require("firebase");
const express = require("express");
const cors = require("cors");
const { unknownEndpoint } = require('./middleware');

// create your express application
const app = express();
// enable cors
app.use(cors());
//json parsing
app.use(express.json());


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID
// };

// const analytics = getAnalytics(app);
// firebase.initializeApp(firebaseConfig);
// const db = getFirestore(app);
// initializeApp();

// test endpoint
app.get('/hello', (req, res) => { 
    res.send('Attention HCP Project Team! If you see this, your front end and back end are connected') 
})



// error handling
app.use(unknownEndpoint);

// set port to listen on
const PORT = 3001;

// start your server
app.listen(PORT, () => {
    console.log(`Server running on port test ${PORT}`);
});
