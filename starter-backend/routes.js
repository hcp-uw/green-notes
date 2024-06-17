// import { Request, Response } from "express";
// import { ParamsDictionary } from "express-serve-static-core";
import { db } from "./config/firebase-config.js"

export async function test(req, res)  {

    // // goes into/makes the collectoin "test"
    // const docRef = db.collection('test').doc('omg it worked');

    // // Gives the doc fields
    // await docRef.set({
    //     greeting: "hello",
    //     exclamation: "this is great",
    //     happy: "true",
    //     favoriteNumber: 2
    // });

    res.send("added hopefully");
}