import { useState } from 'react';
import TemplateToggleButton from '../../components/personal/TemplateToggleButton';
import AddNote from "../../components/personal/AddNote";
import Folders from "../../components/file-navigation/Folders";
import NoteThumbnails from "../../components/file-navigation/NoteThumbnails";
import SearchBar from "../../components/file-navigation/SearchBar";
import Create from "../../components/personal/Create";
import { auth } from "../../config/firebase";
import { route, nil, cons, ThumbnailInfo, isRecord, NoteInfo } from '../../components/file-navigation/routes';

export function Notes(): JSX.Element {

    // isToggled represents the state of the templates button
    // false is notes, true is templates
    // setIsToggled is used to update the isToggled value
    const [isToggled, setIsToggled] = useState<boolean>(false);
    // isMaking represents state of whether user is making note.
    // Plan is to add element that only shows up and is clickable when isMaking
    // is true. Clicking on x or outside of pop-up closes the pop-up.
    const [isMaking, setIsMaking] = useState<boolean>(false);

    const params: URLSearchParams = new URLSearchParams(window.location.search);
    const search: string | null = params.get("search");

    // TO-DO: Make updateable
    const [isAdvanced, setIsAdvanced] = useState<boolean>(false);

    // Keeps track of folder route user is in
    const [currRoute, setCurrRoute] = useState<route>(nil);

    // Starts empty since we haven't checked what user id they are yet.
    const [currLocation, setcurrLocation] = useState<string>("");


    const test: ThumbnailInfo[] = [];

    // Gets user object from auth in order to get user info
    const user = auth.currentUser;
    if (user) { // If user is logged in
        if (user.email === null) { // if user doesn't have email (shouldn't be possible)
            return<p>error</p>
        }
    } else { // If user isn't logged in (should be impossible on this page)
        return<p>error</p>
    }

    /* TODO:
        Make a way to store server side data for contents in folders
        so we don't need to make a new call every single time someone
        clicks on a folder, only when they click on the folder for 
        the first time in the window.
        
        Perhaps use a map with strings as the keys and jsx.element arrays
        as the locations and use "current location" as a way find it.
        "current location" would be in "home/folder/folder" format to ensure
        that it still works even if there are several folders with the same name
        in different places. There cant be 2 folders of the same name in the
        same location*/

    if (currLocation === "") { // If user isn't in a folder ** folder functionality hasn't been implemented yet
        return (
            <body className="page green-background nav-page">
                <SearchBar isAdvanced={isAdvanced} onAdvance={() => setIsAdvanced(true)} collaboration={false}/>
                <h1>Your <TemplateToggleButton isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} /></h1>
                <div className="nav-area flex">
                    <AddNote isMaking={isMaking} onMake={() => setIsMaking(!isMaking)}/>
                    <Folders data={test}/>
                    <NoteThumbnails />
                    <Create isMaking={isMaking} onMake={() => setIsMaking(!isMaking)} isTemp={isToggled} /*onTemp={() => setIsToggled(!isToggled)}*//>
                </div>
            </body>
        );  
    } else { // If user is in a folder
        return (
            <body className="page green-background nav-page">
                <SearchBar isAdvanced={isAdvanced} onAdvance={() => setIsAdvanced(true)} collaboration={false}/>
                <PreviousFolder name={currLocation}></PreviousFolder>
                <div className="nav-area flex">
                    <AddNote isMaking={isMaking} onMake={() => setIsMaking(!isMaking)}/>
                    <Folders data={test}/>
                    <NoteThumbnails />
                    <Create isMaking={isMaking} onMake={() => setIsMaking(!isMaking)} isTemp={isToggled} /*onTemp={() => setIsToggled(!isToggled)}*//>
                </div>
            </body>
        );  
    }
};

type PreviousFolderProps = {name: string};
// Back button for when in folder
const PreviousFolder = ({name}: PreviousFolderProps): JSX.Element => {
    return(
        <div>
            <button>&lt; {name}</button>
        </div>
    )
};

// Method to be called to grab folder contents from server
const getFolderContents = async (route: string): Promise<ThumbnailInfo[]> => {
    let data: ThumbnailInfo[] = [];

    try {
        const user = auth.currentUser;
        const token = user && (await user.getIdToken());
  
        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        // Temp string for the route. Will update to be the given route parameter
        // but first need to add code for that and be able to actually 
        // write to the db, not just read it.
        const temp: string = "Users/user@example.com/Notes"

        // const res = await fetch("http://localhost:3001/getFolderContents?route=" 
        //             + encodeURIComponent(temp), payloadHeader);
  
        // Fetches the /getFolderContents. The string in the encodeURIComponent is the route
        // and the payload header is necessary stuff for server authentication
        fetch("http://localhost:3001/getFolderContents?route="+encodeURIComponent(temp), payloadHeader)
            .then((res) => { // If the intial call works
                if (res.status === 200) { // If the status is good
                    // Currently parseFolderInfo just returns an array of ThumbnailInfo, but doesn't do anything with it yet, no update happens on the page
                    res.json().then((val) => parseFolderInfo(val))
                      .catch(() => console.error("Error fetching /getFolderContents: 200 response is not JSON"))
                } else { // If the status isn't good
                    console.error(`Error fetching /getFolderContents: bad status code: ${res.status}`)
                }
            }) // If the initial call doesn't connect
            .catch(() => console.error("Error fetching /getFolderContents: Failed to connect to server"));
        

      } catch (e) {
        console.log(e);
      }

    return data;
};

// Helper method to process given folder data fetched from server
const parseFolderInfo = (data: unknown): ThumbnailInfo[] => {

    const folders: ThumbnailInfo[] = [];
    const docs: ThumbnailInfo[] = [];

    if (!isRecord(data) || !Array.isArray(data.data)) { // if given data from server is invalid JSON
        console.error('Invalid JSON from /getFolderContents', data);
        return [];
    }

    // Iterates through each element of the given array of server data
    for (const info of data.data) {
        // if (!isRecord(info) || !Array.isArray(info)) { // Checks that the element is of type record
        //     console.error('Invalid JSON from /getFolderContents asdf', info);
        //     return [];
        // }

        if (typeof info.name !== "string") { // Checks that the element has a vaild name field
            console.error('Invalid JSON from /getFolderContents', info.name);
            return [];
        }

        if (typeof info.iD !== "string") { // Checks that the element has a valid iD field
            console.error('Invalid JSON from /getFolderContents', info.iD);
            return [];
        }

        if (info.kind !== "folder" && info.kind !== "doc") { // Checks that the elment has a vaild kind field
            console.error('Invalid JSON from /getFolderContents', info.iD);
            return [];
        }

        // Pushes the relavent info as a ThumbnailInfo to the main array to be returned
        const temp: ThumbnailInfo = {name: info.name, iD: info.iD, kind: info.kind};
        // Organizes them by doc or folder kind
        if (temp.kind === "doc") {
            docs.push(temp);
        } else {
            folders.push(temp);
        }
    }

    // Returns all the folders and docs organized seperately, where folders are first
    console.log("getFolders succeeded");
    return folders.concat(docs);
}

export const doFolderClick = (iD: string): void => {
    // call getFolderContents and update the current states to
    // show the proper things
    console.log(iD);
    getFolderContents("temp");
};


const getNoteContents = async (route: string, cb: NoteCallback): Promise<string> => {

    try {
        const user = auth.currentUser;
        const token = user && (await user.getIdToken());
  
        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        // Temp string for the route. Will update to be the given route parameter
        // but first need to add code for that and be able to actually 
        // write to the db, not just read it.
        const temp: string = "Users/user@example.com/Notes/iPus3TmqPh3M30QlkzSM"

  
        // Fetches the /getNote. The string in the encodeURIComponent is the route
        // and the payload header is necessary stuff for server authentication
        fetch("http://localhost:3001/getNote?route="+encodeURIComponent(temp), payloadHeader)
            .then((res) => { // If the intial call works
                if (res.status === 200) { // If the status is good
                    // Currently parseNoteInfo just returns the body in a string, but doesn't do anything with it yet, no update happens on the page
                    res.json().then((val) => parseNoteInfo(val, cb))
                      .catch(() => console.error("Error fetching /getNote: 200 response is not JSON"))
                } else { // If the status isn't good
                    console.error(`Error fetching /getNote: bad status code: ${res.status}`)
                }
            }) // If the initial call doesn't connect
            .catch(() => console.error("Error fetching /getNote: Failed to connect to server"));
        

      } catch (e) {
        console.log(e);
      }
    // console.log("note fetched")
    return "asdfasdf";
};

// takes JSON from server and gets body of note
const parseNoteInfo = (data: unknown, cb: NoteCallback): void => {

    if (!isRecord(data)) {
        console.error("Invalid JSON from /getFolderContents", data);
        return;
    };

    if (!isRecord(data.data)) {
        console.error("Invalid JSON from /getFolderContents", data.data);
        return;
    }

    if (typeof data.data.body !== "string") {
        console.error("Invalid JSON from /getFolderContents", data.data.body);
        return;
    }

    // console.log(data.data.body);
    cb("example route", data.data.body);
    return;
}


export const doNoteClick = async (route: string, cb: NoteCallback): Promise<string> => {
    // console.log(iD);

    return getNoteContents(route, cb);

};

export type NoteCallback = (body: string, route: string) => void;