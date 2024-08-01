import { useState, useEffect } from 'react';
import TemplateToggleButton from '../../components/personal/TemplateToggleButton';
import AddNote from "../../components/personal/AddNote";
import Folders from "../../components/file-navigation/Folders";
import NoteThumbnails from "../../components/file-navigation/NoteThumbnails";
// import SearchBar from "../../components/file-navigation/SearchBar";
import Create from "../../components/personal/Create";
import NewFolder from '../../components/personal/NewFolder';
import FolderModal from '../../components/personal/FolderModal';
import { auth } from "../../config/firebase";
import { route, nil, cons, ThumbnailInfo, isRecord, rev, concat } from '../../components/file-navigation/routes';
import { User } from "firebase/auth";
import DeleteFolderButton from '../../components/personal/DeleteFolderButton';
import DeleteFolderModal from '../../components/personal/DeleteFolderModal';

export function Notes(): JSX.Element {

    // isTemp represents the state of the templates button
    const [isTemp, setIsTemp] = useState<boolean>(false);

    // isMaking represents state of whether user is making note/temp.
    const [isMaking, setIsMaking] = useState<boolean>(false);

    // isMakingFolder represents state of whether user is making folder
    const [isMakingFolder, setMakingFolder] = useState<boolean>(false);

    const [isDeletingFolder, setDeletingFolder] = useState<boolean>(false);

    const params: URLSearchParams = new URLSearchParams(window.location.search);
    const search: string | null = params.get("search");
    // const routeParam: string | null = params.get("route");

    // TO-DO: Make updateable
    const [isAdvanced, setIsAdvanced] = useState<boolean>(false);

    // Keeps track of names of the folder route user is in
    const [currRouteName, setCurrRouteName] = useState<route>(nil);

    // Keeps track of the IDs of the folder route user is in
    const [currRouteId, setCurrRouteId] = useState<route>(nil);

    // Keeps track of when the notes page is loading
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Keeps track of current content to display
    const [currContent, setCurrContent] = useState<ThumbnailInfo[]>([]);

    // stored data
    const [storedContent, setStoredContent] = useState<Map<string, ThumbnailInfo[]>>(new Map())

    const [eRoute, setERoute] = useState<string>("");


    useEffect(() => { 

        const user = auth.currentUser;
        if (user === null) {
            throw new Error("User isn't logged in");
        }
        if (user.email === null) {
            throw new Error("User doesn't have associated email");
        }
        const email: string = user.email;

        const fetchHome = async (email: string): Promise<void> => {
            setIsLoading(true);

            doFolderClick("", "NotesHome", "Users/" + email +"/Notes", setIsLoading, folderResponse, storedContent)
            
        }

        fetchHome(email).then(() => getTemps(email))

        

        
    }, [auth.currentUser])

    // Gets user object from auth in order to get user info
    const user = auth.currentUser;
    if (user) { // If user is logged in
        if (user.email === null) { // if user doesn't have email (shouldn't be possible)
            return<p>error</p>
        }
    } else { // If user isn't logged in (should be impossible on this page)
        return<p>error</p>
    }

    // Method that is called when folder is clicked and data is fetched
    const folderResponse = (iD: string, route: string, name: string, folderContent: ThumbnailInfo[]): void => {

        const user = auth.currentUser;
        if (user) {
            if (user.email !== null) {
                setERoute(getExtendedRoute(cons(iD, currRouteId), user.email));
            }
        }

        setCurrRouteId(cons(iD, currRouteId));
        setCurrRouteName(cons(name, currRouteName));

        setStoredContent(map => new Map(map.set(route, folderContent.slice(0))))

        setCurrContent(folderContent.slice(0));
        if (user) {
            if (user.email !== null) {
                if (storedContent.has("Users/"+user.email+"/Templates")) {
                    setIsLoading(false);
                }
            }
        }

    }

    // Method that is called when back button is clicked
    const backResponse = (email: string): void => {
        if (currRouteId.kind !== "nil" && currRouteName.kind !== "nil") {
            const route = getExtendedRoute(currRouteId.tl, email);

            const data: ThumbnailInfo[] | undefined = storedContent.get(route);

            if (data === undefined) {
                console.log("error");
            } else {
                setCurrContent(data);
            }

            const user = auth.currentUser;
            if (user) {
                if (user.email !== null) {
                    setERoute(getExtendedRoute(currRouteId.tl, user.email));
                }
            }

            setCurrRouteId(currRouteId.tl);
            setCurrRouteName(currRouteName.tl);
        }
    }

    const getTemps = async (email: string): Promise<void> => {
        setIsLoading(true);
        try {
            const user = auth.currentUser;
            const token = user && (await user.getIdToken());
        
            const payloadHeader = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              method: "GET"
            };

            const route: string = "Users/"+email+"/Templates";
        
            // Fetches the /getFolderContents. The string in the encodeURIComponent is the route
            // and the payload header is necessary stuff for server authentication
            fetch("http://localhost:3001/getFolderContents?route="+encodeURIComponent(route), payloadHeader)
                .then((res) => {
                    res.json().then((val) => doTempResponse(val, route))}) 
                .catch(() => console.error("Error fetching /getFolderContents: Failed to connect to server"));
            
          } catch (e) {
            console.log(e);
          }
    }

    // Method that is called when the template toggle button is clicked
    const doTempClick = (email: string): void => {
        setIsTemp(!isTemp);
        if (isTemp) {
            const temp: ThumbnailInfo[] | undefined = storedContent.get("Users/"+email+"/Notes");
            if (temp === undefined) {
                console.error("stored content can't be found");
                return;
            }
            setCurrContent(temp);

        } else {
            const temp: ThumbnailInfo[] | undefined = storedContent.get("Users/"+email+"/Templates");
            if (temp !== undefined) {
                setCurrContent(temp);
            } else {
                // setIsLoading(true);
                // try {
                //     const user = auth.currentUser;
                //     const token = user && (await user.getIdToken());
              
                //     const payloadHeader = {
                //       headers: {
                //         "Content-Type": "application/json",
                //         Authorization: `Bearer ${token}`,
                //       },
                //     };
    
                //     const route: string = "Users/"+email+"/Templates";
              
                //     // Fetches the /getFolderContents. The string in the encodeURIComponent is the route
                //     // and the payload header is necessary stuff for server authentication
                //     fetch("http://localhost:3001/getFolderContents?route="+encodeURIComponent(route), payloadHeader)
                //         .then((res) => {
                //             res.json().then((val) => doTempResponse(val, route))}) 
                //         .catch(() => console.error("Error fetching /getFolderContents: Failed to connect to server"));
                    
                //   } catch (e) {
                //     console.log(e);
                //   }
                console.log("bad bad");
            }
        }
    }

    // Method that is called after the fetch for templates is successful
    const doTempResponse = (val: unknown, route: string): void => {
        if (!isRecord(val) || !Array.isArray(val.data)) { // if given data from server is invalid JSON
            console.error('Invalid JSON from /getFolderContents', val);
            return;
        }

        const docs: ThumbnailInfo[] = [];

        for (const info of val.data) {

            if (typeof info.name !== "string") { // Checks that the element has a vaild name field
                console.error('Invalid JSON from /getFolderContents', info.name);
                return;
            }
    
            if (typeof info.iD !== "string") { // Checks that the element has a valid iD field
                console.error('Invalid JSON from /getFolderContents', info.iD);
                return;
            }
    
            if (info.kind !== "folder" && info.kind !== "doc") { // Checks that the elment has a vaild kind field
                console.error('Invalid JSON from /getFolderContents', info.iD);
                return;
            }

            if (typeof info.content !== "string") {
                console.error('Invalid JSON from /getFolderContents', info.content);
                return;
            }
    
            // Pushes the relavent info as a ThumbnailInfo to the main array to be returned
            const temp: ThumbnailInfo = {name: info.name, iD: info.iD, kind: info.kind, content: info.content};
            // Organizes them by doc or folder kind
            if (temp.kind === "doc") {
                docs.push(temp);
            } 

        }

        setIsLoading(false);
        // setCurrContent(docs);
        setStoredContent(map => new Map(map.set(route, docs.slice(0))));
    }

    if (isLoading) { // If page is loading
        return(
            <div className="page green-background nav-page">
                {/* <SearchBar isAdvanced={isAdvanced} onAdvance={() => setIsAdvanced(true)} collaboration={false}/> */}
                <div className="nav-area flex">
                    <h1>Loading...</h1>
                </div>
            </div>
        )
    }

    if (currRouteName.kind === "nil" || currRouteId.kind === "nil") { // Should be impossible
        return(<>Error</>)
    }

    const templates: ThumbnailInfo[] | undefined = storedContent.get("Users/"+user.email+"/Templates")

    if (isTemp) { // is in Templates
        return(
            <div className="page green-background nav-page">
                {/* <SearchBar isAdvanced={isAdvanced} onAdvance={() => setIsAdvanced(true)} collaboration={false}/> */}
                <div className='flex'>
                    <h1>Your <TemplateToggleButton isToggled={isTemp} doTempClick={doTempClick} email={user.email} /></h1>                </div>
                <div className="nav-area flex">
                    <AddNote isMaking={isMaking} onMake={() => setIsMaking(!isMaking)}/>
                    <NoteThumbnails data={currContent} location={eRoute} areTemps={isTemp} email={user.email}/>
                    <Create isMaking={isMaking} onMake={() => setIsMaking(!isMaking)} isTemp={isTemp} 
                        givenPath={rev(currRouteName)} eRoute={eRoute} email={user.email} temps={templates}/>
                    <FolderModal givenPath={rev(currRouteName)} isMakingFolder={isMakingFolder} onMakeFolder={setMakingFolder} eRoute={eRoute}/>
                </div>
            </div>
        )
    }

    if (currRouteName.tl.kind === "nil" || currRouteId.tl.kind === "nil") { // If user isn't in a folder ** folder functionality hasn't been implemented yet
        return (
            <div className="page green-background nav-page">
                {/* <SearchBar isAdvanced={isAdvanced} onAdvance={() => setIsAdvanced(true)} collaboration={false}/> */}
                <div className='flex'>
                    <h1>Your <TemplateToggleButton isToggled={isTemp} doTempClick={doTempClick} email={user.email}/></h1>
                    <NewFolder onClick={setMakingFolder}/>
                </div>
                <div className="nav-area flex">
                    <AddNote isMaking={isMaking} onMake={() => setIsMaking(!isMaking)}/>
                    <Folders  oldData={storedContent} data={currContent} setLoad={setIsLoading} resp={folderResponse} location={eRoute}/>
                    <NoteThumbnails data={currContent} location={eRoute}  areTemps={isTemp} email={user.email}/>
                    <Create isMaking={isMaking} onMake={() => setIsMaking(!isMaking)} isTemp={isTemp} 
                        givenPath={rev(currRouteName)} eRoute={eRoute} email={user.email} temps={templates}/>
                    <FolderModal givenPath={rev(currRouteName)} isMakingFolder={isMakingFolder} onMakeFolder={setMakingFolder} eRoute={eRoute}/>
                </div>
            </div>
        );  
    } else { // If user is in a folder
        return (
            <div className="page green-background nav-page">
                {/* <SearchBar isAdvanced={isAdvanced} onAdvance={() => setIsAdvanced(true)} collaboration={false}/> */}
                    <div className='flex'>
                        <PreviousFolder email={user.email} name={currRouteName.hd} doBackClick={backResponse}></PreviousFolder>
                        <NewFolder onClick={setMakingFolder}/>
                        <DeleteFolderButton onClick={setDeletingFolder}/>
                    </div>                <div className="nav-area flex">
                    <AddNote isMaking={isMaking} onMake={() => setIsMaking(!isMaking)}/>
                    <Folders oldData={storedContent} data={currContent} setLoad={setIsLoading} resp={folderResponse} location={eRoute}/>
                    <NoteThumbnails data={currContent} location={eRoute}  areTemps={isTemp} email={user.email}/>
                    <Create isMaking={isMaking} onMake={() => setIsMaking(!isMaking)} isTemp={isTemp}
                        givenPath={rev(currRouteName)} eRoute={eRoute} email={user.email} temps={templates}/>
                    <FolderModal givenPath={rev(currRouteName)} isMakingFolder={isMakingFolder} onMakeFolder={setMakingFolder} eRoute={eRoute}/>
                    <DeleteFolderModal isDeleting={isDeletingFolder} setIsDeleting={setDeletingFolder} location="Not done yet"/>
                </div>
            </div>
        );  
    }
};

type PreviousFolderProps = {name: string, doBackClick: (email: string) => void, email: string};
// Back button for when in folder
const PreviousFolder = ({name, doBackClick, email}: PreviousFolderProps): JSX.Element => {
    return(
        <div>
            <button className="back-button" onClick={() => doBackClick(email)}>&lt; {name}</button>
        </div>
    )
};


type FolderCallback = (contents: ThumbnailInfo[], iD: string, route: string, name: string,
    resp: (folderId: string, route: string, name: string, folderContent: ThumbnailInfo[]) => void) => void;

// Exported method for folders to have in order to have clicking functionality
export const doFolderClick = (iD: string, name: string, location: string, setLoad: React.Dispatch<React.SetStateAction<boolean>>,
    resp: (folderId: string, route: string, name: string, folderContent: ThumbnailInfo[]) => void,
    oldData: Map<string, ThumbnailInfo[]>): void => {
    setLoad(true);
    let route: string = "";
    if (iD === "") {
        route = location;
    } else {
        route = location+"/"+iD+"/content"
    }
    if (oldData.has(route)) {
        const data: ThumbnailInfo[] | undefined = oldData.get(route);
        if (data === undefined) { // Should be impossible
            console.log("map contains route but doesn't?")
            getFolderContents(route, iD, name, doFolderResponse, resp);
        } else {
            doFolderResponse(data, iD, route, name, resp);
        }
    } else {
        getFolderContents(route, iD, name, doFolderResponse, resp);
    }
};

// Method to be called to grab folder contents from server
const getFolderContents = async (route: string, iD: string, name: string, cb: FolderCallback, 
    resp: (folderId: string, route: string, name: string, folderContent: ThumbnailInfo[])=> void): Promise<void> => {

    try {
        const user = auth.currentUser;
        const token = user && (await user.getIdToken());
  
        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET"
        };

        // Temp string for the route.
        const temp: string = "Users/user@example.com/Notes"
  
        // Fetches the /getFolderContents. The string in the encodeURIComponent is the route
        // and the payload header is necessary stuff for server authentication
        fetch("http://localhost:3001/getFolderContents?route="+encodeURIComponent(route), payloadHeader)
            .then((res) => { // If the intial call works
                if (res.status === 200) { // If the status is good
                    // Currently parseFolderInfo just returns an array of ThumbnailInfo, but doesn't do anything with it yet, no update happens on the page
                    res.json().then((val) => parseFolderInfo(val, iD, route, name, cb, resp))
                      .catch(() => console.error("Error fetching /getFolderContents: 200 response is not JSON"))
                } else { // If the status isn't good
                    console.error(`Error fetching /getFolderContents: bad status code: ${res.status}`)
                }
            }) // If the initial call doesn't connect
            .catch(() => console.error("Error fetching /getFolderContents: Failed to connect to server"));
        

      } catch (e) {
        console.log(e);
      }
};

// Helper method to process given folder data fetched from server
const parseFolderInfo = (data: unknown, iD: string, route: string, name: string, cb: FolderCallback, 
    resp: (folderId: string, route: string, name: string, folderContent: ThumbnailInfo[]) => void): ThumbnailInfo[] => {

    const folders: ThumbnailInfo[] = [];
    const docs: ThumbnailInfo[] = [];

    if (!isRecord(data) || !Array.isArray(data.data)) { // if given data from server is invalid JSON
        console.error('Invalid JSON from /getFolderContents', data);
        return [];
    }

    // Iterates through each element of the given array of server data
    for (const info of data.data) {

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

        if (typeof info.content !== "string") { // Checks that the element has a valid iD field
            console.error('Invalid JSON from /getFolderContents', info.content);
            return [];
        }

        // Pushes the relavent info as a ThumbnailInfo to the main array to be returned
        const temp: ThumbnailInfo = {name: info.name, iD: info.iD, kind: info.kind, content: info.content};
        // Organizes them by doc or folder kind
        if (temp.kind === "doc") {
            docs.push(temp);
        } else {
            folders.push(temp);
        }
    }


    // Returns all the folders and docs organized seperately, where folders are first
    // console.log("getFolders succeeded");
    cb(folders.concat(docs), iD, route, name, resp);
    return folders.concat(docs);
}

// Method that gets called if the getFolder fetch works properly
const doFolderResponse = (contents: ThumbnailInfo[], iD: string, route: string, name: string,
     resp: (folderId: string, route: string, name: string, folderContent: ThumbnailInfo[]) => void): void => {
    // for (const temp of contents) {
    //     console.log(temp);
    // }
    resp(iD, route, name, contents);
}

// Method exported for NoteThumbnails, allows notes to be clicked on
// Currently does literally nothing other than call another method
export const doNoteClick = async (route: string, cb: NoteCallback): Promise<string> => {

    return getNoteContents(route, cb);
};

// Async method which calls server for a specific note given the route to the note
export const getNoteContents = async (route: string, cb: NoteCallback): Promise<string> => {

    try {
        const user = auth.currentUser;
        const token = user && (await user.getIdToken());
  
        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET"
        };

        // Temp string for the route. Will update to be the given route parameter
        // but first need to add code for that and be able to actually 
        // write to the db, not just read it.
        const temp: string = "Users/user@example.com/Notes/iPus3TmqPh3M30QlkzSM"

  
        // Fetches the /getNote. The string in the encodeURIComponent is the route
        // and the payload header is necessary stuff for server authentication
        fetch("http://localhost:3001/getNote?route="+encodeURIComponent(route), payloadHeader)
            .then((res) => { // If the intial call works
                if (res.status === 200) { // If the status is good
                    // Currently parseNoteInfo just returns the body in a string, but doesn't do anything with it yet, no update happens on the page
                    res.json().then((val) => parseNoteInfo(val, route, cb))
                      .catch(() => console.error("Error fetching /getNote: 200 response is not JSON"))
                } else { // If the status isn't good
                    console.error(`Error fetching /getNote: bad status code: ${res.status}`)
                }
            }) // If the initial call doesn't connect
            .catch(() => console.error("Error fetching /getNote: Failed to connect to server"));
        

      } catch (e) {
        console.log(e);
      }
    return "asdfasdf";
};

// takes JSON from server and gets body of note
// Then calls given callback method. In context of NoteThumbnails, it is the navigate method
const parseNoteInfo = (data: unknown, route: string, cb: NoteCallback): void => {

    if (!isRecord(data)) {
        console.error("Invalid JSON from /getFolderContents", data);
        return;
    };

    if (!isRecord(data.data)) {
        console.error("Invalid JSON from /getFolderContents", data.data);
        return;
    }

    const body = data.data.body;
    if (typeof body !== "string") {
        console.error("Invalid JSON from /getFolderContents", body);
        return;
    }

    const className = data.data.class;
    if (typeof className !== "string") {
        console.error("Invalid JSON from /getFolderContents", className);
        return;
    }

    const name = data.data.name;
    if (typeof name !== "string") {
        console.error("Invalid JSON from /getFolderContents", name);
        return;
    }

    const quarter = data.data.quarter;
    if (typeof quarter !== "string") {
        console.error("Invalid JSON from /getFolderContents", quarter);
        return;
    }

    const tags = data.data.tags;
    if (!Array.isArray(tags)) {
        console.error("Invalid JSON from /getFolderContents", tags);
        return;
    }

    const teacher = data.data.teacher;
    if (typeof teacher !== "string") {
        console.error("Invalid JSON from /getFolderContents", teacher);
        return;
    }

    const year = data.data.year;
    if (typeof year !== "number") {
        console.error("Invalid JSON from /getFolderContents", year);
        return;
    }

    const noteData: NoteData = {
        body: body,
        className: className,
        name: name,
        quarter: quarter,
        tags: tags,
        teacher: teacher,
        year: year
    }



    cb(noteData, route);
    return;
}


// NoteCallback type used to update website state during getNote fetch
export type NoteData = {
    body: string, className: string, name: string, quarter: string, tags: string[], teacher: string, year: number
}
export type NoteCallback = (noteData: NoteData, route: string) => void;

const getExtendedRoute = (locationID: route, email: string): string => {
    let eRoute: string = "Users/" + email +"/Notes";
    let copyRoute: route = rev(locationID);

    if (copyRoute.kind === "nil") {
        return eRoute;
    }

    while (copyRoute.kind !== "nil") {
        if (copyRoute.hd !== "") {
            eRoute = eRoute + "/" + copyRoute.hd + "/content";
        }
        
        copyRoute = copyRoute.tl;
    }

    return eRoute;
}