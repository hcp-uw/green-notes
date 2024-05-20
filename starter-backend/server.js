import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { VerifyToken } from "./middlewears/VerifyToken.js";

import { unknownEndpoint } from "./middleware.js";

// const firebase = require("firebase");
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const { VerifyToken } = require("./middlewears/VerifyToken");
// const { unknownEndpoint } = require('./middleware');

// create your express application
const app = express();
// enable cors
app.use(cors());
//json parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(VerifyToken);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

dotenv.config();


// test endpoint
app.get('/hello', (req, res) => { 
    res.send('Attention HCP Project Team! If you see this, your front end and back end are connected') 
})

app.get("/", (req, res) => {
    res.send("working fine");
});


// error handling
app.use(unknownEndpoint);

// set port to listen on
const PORT = process.env.PORT || 8080;

// start your server
app.listen(PORT, () => {
    console.log(`Server running on port test ${PORT}`);
});
