import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { VerifyToken } from "./middlewears/VerifyToken.js";

import { unknownEndpoint } from "./middleware.js";

import { test, getNote, getFolderContents, createAccount } from "./routes.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middlewear that checks to ensure user is logged in
app.use(VerifyToken);


dotenv.config();


// Basic test, ignore, probably delete
app.get('/hello', (req, res) => { 
    res.send('Attention HCP Project Team! If you see this, your front end and back end are connected') 
})
// Basic test, ignore, probably delete
app.get("/", (req, res) => {
    res.send("working fine");
});

app.get("/test", test);

app.get("/getNote", getNote);

app.get("/getFolderContents", getFolderContents);

app.post("/createAccount", createAccount);


// error handling
app.use(unknownEndpoint);

// set port to listen on
const PORT = process.env.PORT || 8080;

// start your server
app.listen(PORT, () => {
    console.log(`Server running on port test ${PORT}`);
});
