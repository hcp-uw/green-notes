import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { db } from "./config/firebase-config.js"


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;


/** Needs to be given route of doc in "Users/{userEmail}/Notes/{folderID}/content/{name}"
 * See db for how data is structured to ensure you are giving a proper route.
 * Gets note data from db.
*/
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

/** Type to store thumbnail info of folders and notes */
type ThumbnailInfo = {name: string, iD: string, kind: "folder" | "doc" | "placeholder", content: string}

/** Gets all folders and docs inside given route to a collection
 * See route parameters in get doc function above
*/
export async function getFolderContents(req: SafeRequest, res: SafeResponse) {

    const route = req.query.route;

    if (typeof route !== "string") {
        res.status(400).send('missing or invalid "route" parameter');
        return;
    }

    const collectionRef = db.collection(route);
    const snapshot = await collectionRef.orderBy("name").get();

    const info: ThumbnailInfo[] = [];


    snapshot.forEach(item => {
        const iD: string = item.id;
        const data = item.data();

        // if (typeof data.name !== "string") {
        //     res.status(500).send("db error");
        //     return;
        // }

        const name: string = data.name;
        const typeUnchecked: string = data.type;

        if (typeUnchecked !== "folder" && typeUnchecked !== "doc" && typeUnchecked !== "placeholder") {
            res.status(500).send("db error");
             return;
        }


        const type: "folder" | "doc" | "placeholder" = typeUnchecked;
        if (type === "doc") {
            const obj: ThumbnailInfo = {name: name, iD: iD, kind: type, content: data.body};
            info.push(obj);
        }

        if (type === "folder") {
            const obj: ThumbnailInfo = {name: name, iD: iD, kind: type, content: ""};
            info.push(obj);
        }

    })
    res.send({data: info})
    return;
}

/** Creates a new account in the db with a given email. */
export async function createAccount(req: SafeRequest, res: SafeResponse) {
    const emailUpper = req.body.email;
    if (typeof emailUpper !== "string") {
        res.status(400).send('missing or invalid "email" parameter');
        return;
    }

    const email = emailUpper.toLowerCase();

    // Currently we have no user data to be stored. If we do and we need basic default
    // values, we can set them here.
    const data = {
        dataAndThings: "random example stuff" 
    };

    db.collection("Users").doc(email).set(data)
        .then(() => {
            db.collection("Users").doc(email).collection("Notes").add({type: "placeholder"})
                .then(() => {
                    db.collection("Users").doc(email).collection("Templates").add({type: "placeholder"})
                        .then(() => res.status(200).send("fetch succesful"))
                        .catch(() => res.status(400).send("error in making template folder"))
                })
                .catch(() => res.status(400).send("error in making notes folder"))
        })
        .catch(() => res.status(400).send("error in adding account to db"))
}

/** Placeholder code for when we want to make updates to account data,
 * such as prefered name and profile picture
*/
export async function updateAccount(req: SafeRequest, res: SafeResponse) {
    /* Example code for getting body parameters and checking them to be strings */
    // const data = req.body.data;
    // if (typeof data !== "string") {
    //     res.status(400).send('missing or invalid "data" parameter');
    //     return;
    // }

    // We will need an email to find the user in the db
    const emailUpper = req.body.email;
    if (typeof emailUpper !== "string") {
        res.status(400).send('missing or invalid "email" parameter');
        return;
    };
    const email: string = emailUpper.toLowerCase();

    // Example data that we can populate with body params
    const data = {
        example: "example data"
    }

    // Firebase call to update the "email" doc in the "users" collection with "data"
    await db.collection("Users").doc(email).set(data)
        .then(() => res.status(200).send("account succesfully added"))
        .catch(() => res.status(400).send("error in adding account to db"))
}

/** Creates a new note or template at the given route with the
 * given name and body content (if a template is used)
*/
export async function createNote(req: SafeRequest, res: SafeResponse) {
    const route = req.body.route;
    if (typeof route !== "string") {
        res.status(400).send('missing or invalid "route" parameter');
        return;
    }

    const name = req.body.name;
    if (typeof name !== "string") {
        res.status(400).send('missing or invalid "name" parameter');
        return;
    }
    const nameTrimmed: string = name.trim();

    const body = req.body.body;
    if (typeof body !== "string") {
        res.status(400).send('missing or invalid "body" parameter');
        return;
    }

    const data = {
        name: nameTrimmed,
        body: body,
        type: "doc",
        tags: [],
        class: "",
        teacher: "",
        quarter: "",
        year: 0
    }

    db.collection(route).add(data)
        .then((a) => {
            res.status(200).send({id: a.id})})
        .catch(() => res.status(400).send("not all good"))

}

/** Creates a new folder at the given route with the given name */
export async function createFolder(req: SafeRequest, res: SafeResponse) {

    const route = req.body.route;
    if (typeof route !== "string") {
        res.status(400).send('missing or invalid "route" parameter');
        return;
    }

    const name = req.body.name;
    if (typeof name !== "string") {
        res.status(400).send('missing or invalid "name" parameter');
        return;
    }
    const nameTrimmed: string = name.trim();

    const data = {
        name: nameTrimmed,
        type: "folder"
    }

    db.collection(route).add(data)
        .then((response) => {
            const temp = {
                type: "placeholder"
            }
            db.collection(route+"/"+response.id+"/content").add(temp)
                .then(() => res.status(200).send("doc made properly?"))
                .catch(() => res.status(400).send("error in making placeholder"))
        })
        .catch(() => res.status(400).send("error in making folder"))

    
}

/** Saves the body content of the doc at the given route with the given body content */
export async function saveDoc(req: SafeRequest, res: SafeResponse) {

    const route = req.body.route;
    if (typeof route !== "string") {
        res.status(400).send('missing or invalid "route" parameter');
        return;
    }

    const content = req.body.content;
    if (typeof content !== "string") {
        res.status(400).send('missing or invalid "content" parameter');
        return;
    }

    const docRef = db.doc(route);

    docRef.update({body: content})
        .then(() => res.status(200).send("updated"))
        .catch(() => res.status(400).send("failed"))
}

/** Saves the details content of the doc at the given route with all the new given details */
export async function saveDetails(req: SafeRequest, res: SafeResponse) {
    const route = req.body.route;
    if (typeof route !== "string") {
        res.status(400).send('missing or invalid "route" parameter');
        return;
    }

    const name = req.body.name;
    if (typeof name !== "string") {
        res.status(400).send('missing or invalid "name" parameter');
        return;
    }
    const nameTrimmed: string = name.trim();

    const className = req.body.class;
    if (typeof className !== "string") {
        res.status(400).send('missing or invalid "class" parameter');
        return;
    }
    const classTrimmed: string = className.trim();

    const teacher = req.body.teacher;
    if (typeof teacher !== "string") {
        res.status(400).send('missing or invalid "teacher" parameter');
        return;
    }
    const teacherTrimmed: string = teacher.trim();

    const year = req.body.year;
    if (typeof year !== "number") {
        res.status(400).send('missing or invalid "year" parameter');
        return;
    }

    const quarter = req.body.quarter;
    if (typeof quarter !== "string") {
        res.status(400).send('missing or invalid "quarter" parameter');
        return;
    }

    const tags = req.body.tags;
    if (!Array.isArray(tags)) {
        res.status(400).send('missing or invalid "tags" parameter');
        return;
    }
    const tagsTrimmed: string[] = [];
    for (const tag of tags) {
        if (typeof tag !== "string") {
            res.status(400).send('tag wasnt a string');
            return;
        }
        tagsTrimmed.push(tag.trim());
    }

    const docRef = db.doc(route)

    const data = {
        name: nameTrimmed,
        tags: tagsTrimmed,
        class: classTrimmed,
        teacher: teacherTrimmed,
        quarter: quarter,
        year: year
    }

    docRef.update(data)
      .then((e) => res.status(200).send(e))
      .catch((e) => res.status(400).send(e))
}

/** Makes a new doc with the given body and details in the shared folder */
export async function shareDoc(req: SafeRequest, res: SafeResponse) {

    const body = req.body.body;
    if (typeof body !== "string") {
        res.status(400).send('missing or invalid "body" parameter');
        return;
    }

    const name = req.body.name;
    if (typeof name !== "string") {
        res.status(400).send('missing or invalid "name" parameter');
        return;
    }
    const nameTrimmed: string = name.trim();

    const tags = req.body.tags;
    if (!Array.isArray(tags)) {
        res.status(400).send('missing or invalid "tags" parameter');
        return;
    }
    const tagsTrimmed: string[] = [];
    for (const tag of tags) {
        if (typeof tag !== "string") {
            res.status(400).send('tag wasnt a string');
            return;
        }
        tagsTrimmed.push(tag.trim());
    }

    const className = req.body.class;
    if (typeof className !== "string") {
        res.status(400).send('missing or invalid "class" parameter');
        return;
    }
    const classTrimmed: string = className.trim();

    const teacher = req.body.teacher;
    if (typeof teacher !== "string") {
        res.status(400).send('missing or invalid "teacher" parameter');
        return;
    }
    const teacherTrimmed: string = teacher.trim();

    const quarter = req.body.quarter;
    if (typeof quarter !== "string") {
        res.status(400).send('missing or invalid "quarter" parameter');
        return;
    }

    const year = req.body.year;
    if (typeof year !== "number") {
        res.status(400).send('missing or invalid "year" parameter');
        return;
    }

    const data = {
        name: nameTrimmed,
        body: body,
        class: classTrimmed,
        quarter: quarter,
        tags: tagsTrimmed,
        teacher: teacherTrimmed,
        type: "doc",
        year: year
    }

    db.collection("Shared").add(data)
      .then((a) => res.status(200).send({id: a.id}))
      .catch(() => res.status(400).send("error in sharing"))

}

/** Deletes the doc at the given route */
export async function deleteDoc(req: SafeRequest, res: SafeResponse) {

    const route = req.query.route;
    if (typeof route !== "string") {
        res.status(400).send('missing or invalid "route" parameter');
        return;
    }

    db.doc(route).delete()
        .then((a) => res.send(a))
        .catch((a) => res.status(400).send(a))
}

/** Gets shared notes based on the parameters */
export async function getShared(req: SafeRequest, res: SafeResponse) {

    const searchUpper = req.query.name;
    if (typeof searchUpper !== "string") {
        res.status(400).send('missing or invalid "name" parameter');
        return;
    }
    const search: string = searchUpper.toLowerCase().trim();

    const tags = req.query.tags;
    if (typeof tags !== "string") {
        res.status(400).send('misisng or invalid "tags" parameter');
        return;
    }

    const classNameUpper = req.query.class;
    if (typeof classNameUpper !== "string") {
        res.status(400).send('misisng or invalid "class" parameter');
        return;
    }
    const className: string = classNameUpper.toLowerCase().trim();

    const teacherUpper = req.query.teacher;
    if (typeof teacherUpper !== "string") {
        res.status(400).send('misisng or invalid "teacher" parameter');
        return;
    }
    const teacher: string = teacherUpper.toLowerCase().trim();

    const quarterUpper = req.query.quarter;
    if (typeof quarterUpper !== "string") {
        res.status(400).send('misisng or invalid "quarter" parameter');
        return;
    }
    const quarter: string = quarterUpper.toLowerCase().trim();

    const yearString = req.query.year;
    if (typeof yearString !== "string") {
        res.status(400).send('misisng or invalid "year" parameter');
        return;
    }

    const year: number = parseInt(yearString);
    if (isNaN(year)) {
        res.status(400).send('invalid "year" parameter');
        return
    }



    const collectionRef = db.collection("Shared");
    const snapshot = await collectionRef.limit(30).get();

    const info: ThumbnailInfo[] = [];


    snapshot.forEach(item => {
        let checksOut = true;
        const iD: string = item.id;
        const data = item.data();
        const name: string = data.name;
        const content: string = data.body;
        const dataClass: string = data.class;
        const dataTeacher: string = data.teacher;
        const dataQuarter: string = data.quarter;
        const dataYear: number = data.year;

        if (search !== "" && search !== name.toLowerCase().trim()) {
            checksOut = false;
        }

        if (className !== "" && className !== dataClass.toLowerCase().trim()) {
            checksOut = false;
        }

        if (teacher !== "" && teacher !== dataTeacher.toLowerCase().trim()) {
            checksOut = false;
        }

        if (quarter !== "" && quarter !== dataQuarter.toLowerCase().trim()) {
            checksOut = false;
        }

        if (year !== 0 && year !== dataYear) {
            checksOut = false;
        }

        const tagsArray: string[] = tags.split(",");
        // for (const asdf of tagsArray) {
        //     console.log('logged: "'+ asdf +'"');
        // }
        for (let i = 0; i < tagsArray.length; i++) {
            if (tagsArray[i].toLowerCase().trim() !== "") {
                let tagValid = false; // Checks if the tag passes, starts as no until it finds a matching tag
                for (let j = 0; j < data.tags.length; j++) {
                    const tempTag2 = data.tags[j];
                    if (typeof tempTag2 === "string") {
                        if (tagsArray[i].toLowerCase().trim() === tempTag2.toLowerCase().trim()) {
                            tagValid = true
                        }
                    }
                }
            if (!tagValid) {
                checksOut = false;
            }
            }
        }


        if (checksOut) {
            const temp: ThumbnailInfo = {
                name: name,
                iD: iD,
                kind: "doc",
                content: content
            }
            info.push(temp);
        }
    })
    res.send({data: info})
    return;
}

/** Deletes folder at the given route if it contains no subfolders */
export async function deleteFolder(req: SafeRequest, res: SafeResponse) {
    const route = req.query.route;
    if (typeof route !== "string") {
        res.status(400).send('missing or invalid "route" parameter');
        return;
    }

    const collectionRef = db.collection(route);
    const snapshot = await collectionRef.get();

    snapshot.forEach(doc => {
        if (doc.data().type === "folder") {
            res.status(409).send("folder contains subfolder");
            return;
        }
    })

    const batch = db.batch();
    snapshot.forEach(doc => {
        batch.delete(doc.ref);
    });

    await batch.commit()
        .then(() => {
            const folderDocRoute: string = route.substring(0, route.length-8);
            db.doc(folderDocRoute).delete()
                .then((e) => res.send(e))
                .catch((e) => res.status(400).send(e))
        })
        .catch((e) => res.status(400).send(e));
}

type BasicInfo = {name: string, iD: string}

/** Returns all folder names + ids from given folder route */
export async function getFolders(req: SafeRequest, res: SafeResponse) {
    const route = req.query.route;
    if (typeof route !== "string") {
        res.status(400).send('missing or invalide "route" parameter');
        return;
    }

    const collectionRef = db.collection(route);
    const snapshot = await collectionRef.get();

    const info: BasicInfo[] = [];


    snapshot.forEach(item => {
        const iD: string = item.id;
        const data = item.data();


        const name: string = data.name;
        const typeUnchecked: string = data.type;

        if (typeUnchecked !== "folder" && typeUnchecked !== "doc" && typeUnchecked !== "placeholder") {
            res.status(500).send("db error");
             return;
        }
        const type: "folder" | "doc" | "placeholder" = typeUnchecked;

        if (type === "folder") {
            const obj: BasicInfo = {name: name, iD: iD};
            info.push(obj);
        }

    })
    res.send({data: info})
    return;
}