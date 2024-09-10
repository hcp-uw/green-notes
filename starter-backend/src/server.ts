import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { VerifyToken } from "./middlewears/VerifyToken.js";

import { unknownEndpoint } from "./middleware.js";

import { getNote, getFolderContents, createAccount, 
    createNote, createFolder, saveDoc, saveDetails, shareDoc,
    deleteDoc, getShared, deleteFolder, getFolders,
    updateBio, getBio} from "./routes.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middlewear that checks to ensure user is logged in
app.use(VerifyToken);


dotenv.config();



// Gets data for a note
app.get("/getNote", getNote);

// Gets the data for the contents of a folder
app.get("/getFolderContents", getFolderContents);

// Sets up db for a newly created account
app.post("/createAccount", createAccount);

// Creates a new note
app.post("/createNote", createNote);

// Creates a new folder
app.post("/createFolder", createFolder);

// Saves the body content of a note
app.put("/saveDoc", saveDoc);

// Saves the details of a note
app.put("/saveDetails", saveDetails);

// Makes a copy of a note that is publicly shared
app.post("/shareDoc", shareDoc);

// Deletes a note
app.delete("/deleteDoc", deleteDoc);

// Returns publicly shared notes based on parameters
app.get("/getShared", getShared);

// Deletes a folder
app.delete("/deleteFolder", deleteFolder);

// Gets basic info of folders in a folder
app.get("/getFolders", getFolders);

app.put("/updateBio", updateBio);

app.get("/getBio", getBio);

// error handling
app.use(unknownEndpoint);

// set port to listen on
const PORT = process.env.PORT || 8080;

// start your server
app.listen(PORT, () => {
    console.log(`Server running on port test ${PORT}`);
});
