import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { db } from "./config/firebase-config.js"

// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;

export async function test(req: SafeRequest, res: SafeResponse)  {

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


// Needs to be given route of doc in "Users/{userEmail}/Notes/{folderID}/content/{name}"
// See db for how data is structured to ensure you are giving a proper route
// Curly brackets mean that the text is just an example. All text outside of
// curly brackets is necessary for every call (a "/content" is required after
// every subfolder in "Notes" due to how firebase works).
// You may have any number of subfolders in the route, but each must be followed by a "/content"
export async function getNote(req: SafeRequest, res: SafeResponse) {

    const route = req.query.route;

    if (typeof route !== "string") {
        res.status(400).send('missing or invalid "route" parameter');
        return;
    }

    // Also add in a way to check that the given user is properly logged in
    // Maybe do this through firestore db permissions, but it might not have
    // that power

    const noteRef = db.doc(route);
    const doc = await noteRef.get();
    if (!doc.exists) {
        res.send("no doc found :(");
        return;
    } else {
        res.send({data: doc.data()});
        return;
    }
};

type thumbnailInfo = {name: string, iD: string, kind: "folder" | "note"}

// Gets all folders and docs inside given route to a collection
// See route parameterse in get doc function above
export async function getFolderContents(req: SafeRequest, res: SafeResponse) {

    const route = req.query.route;

    if (typeof route !== "string") {
        res.status(400).send('missing or invalid "route" parameter');
        return;
    }

    const collectionRef = db.collection(route);
    const snapshot = await collectionRef.get();

    const info: any[] = [];

    // Should return an array? of objects where each obj is the data for a folder/doc
    // Need to send back names and IDs and obj type
    snapshot.forEach(item => {
        const iD: string = item.id;
        const data = item.data;
        // if (typeof data.name !== "string") {
        //     res.status(500).send("error with db");
        //     return;
        // }
        info.push(data);
    })
    
    res.send({data: info})
    return;

}