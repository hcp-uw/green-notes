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

// Needs to be given route of doc in "userEmail/notes/folder/subfolder/name"
export async function getNote(req, res) {

    const route = req.query.route;

    if (typeof route !== "string") {
        res.status(400).send('missing or invalid "route" parameter');
        return;
    }

    // Also add in a way to check that the given user is properly logged in

    const noteRef = db.doc(route);
    const doc = await noteRef.get();
    if (!doc.exists) {
        res.send("no doc found :(");
        return;
    } else {
        res.send({data: doc.data()});
        return;
    }

}