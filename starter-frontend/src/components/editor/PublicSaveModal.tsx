import { ChangeEvent, useEffect, useState } from "react";
import { concat, cons, nil, rev, route, len, FetchRoute, isRecord } from "../file-navigation/routes";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

/** Parameters for PublicSaveModal */
type PublicSaveProps = {
    noteName: string;
    isPublicSaving: boolean;
    setIsPublicSaving: React.Dispatch<React.SetStateAction<boolean>>;
    currBody: string;
}

/** Type to store most basic folder information */
type BasicInfo = {name: string, iD: string}

/** Defines callback method for /getFolders related calls */
type FoldersCallback = (data: BasicInfo[], route: string) => void;

/** Modal used to allow clients to save a copy of shared notes */
const PublicSaveModal = ({noteName, isPublicSaving, setIsPublicSaving, currBody}: PublicSaveProps): JSX.Element => {

    const navigate = useNavigate();
    const [currName, setCurrName] = useState<string>(noteName + " (copy)");
    const [currRouteName, setCurrRouteName] = useState<route>(nil);
    const [currRouteId, setCurrRouteId] = useState<route>(nil);
    const [isTemplate, setIsTemplate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currContent, setCurrContent] = useState<BasicInfo[]>([])
    const [storedContent, setStoredContent] = useState<Map<string, BasicInfo[]>>(new Map());

    /** Basic function which updates the name state */
    const changeName = (evt: ChangeEvent<HTMLInputElement>): void => {
        setCurrName(evt.target.value);
    }

    // Initial load of the modal. Fetches home files of user
    useEffect(() => {
        const user = auth.currentUser;
        if (user === null) {
            throw new Error("User isn't logged in");
        }
        if (user.email === null) {
            throw new Error("User doesn't have associated email");
        }
        getFolders("Users/"+user.email+"/Notes", foldersResponse)
        

    }, [])

    /** Response called after parsed folder info from server */
    const foldersResponse = (data: BasicInfo[], route: string): void => {
        setCurrContent(data.slice(0));
        setIsLoading(false);
        setStoredContent(map => new Map(map.set(route, data.slice(0))))
    }

    
    /** HTML element of clickable buttons to allow client
     * to navigate back through folders
     */
    const LocationLinks = (): JSX.Element[] => {
        const locations: JSX.Element[] = [];
        let reversed: route = rev(currRouteName);
        locations.push(
            <button key="NotesHome" className="location-link" onClick={() => doLocationClick(0)}>NotesHome/</button>
        )
        let index: number = 1;
        while (reversed.kind !== "nil") {
            const temp: string = reversed.hd;
            const copy: number = index;
            locations.push (
                <button key={temp} className="location-link" onClick={() => doLocationClick(copy)}>{temp}/</button>
            )
            index ++;
            reversed = reversed.tl;
        }

        return locations;
    }

    /** Navigates and updates current state to match
     * whatever location link was clicked
     */
    const doLocationClick = (index: number): void => { // update currContent with storedContent
        let length: number = len(currRouteName);
        if (index !== length) {
            let tempNames: route = concat(currRouteName, nil);
            let tempIds: route = concat(currRouteId, nil);
            while (index < length && tempNames.kind !== "nil" && tempIds.kind !== "nil") {
                tempNames = tempNames.tl;
                tempIds = tempIds.tl;
                length --;
            }
    
            const user = auth.currentUser;
            if (user === null) {
                throw new Error("User isn't logged in");
            }
            if (user.email === null) {
                throw new Error("User doesn't have associated email");
            }
            const eRoute: string = getExtendedRoute(tempIds, user.email);
            const tempContent = storedContent.get(eRoute);
            if (tempContent !== undefined) {
                setCurrContent(tempContent);
            }
            setCurrRouteName(tempNames);
            setCurrRouteId(tempIds);
        }

    }

    /** Navigates forward through the file system.
     * Checks storedContent if client has already been in this location.
     * If not, fetches relevant data from server
     */
    const folderClick = async (data: string): Promise<void> => { // add a check in stored content

        const user = auth.currentUser;
        if (user === null) {
            console.error("user isn't logged in");
            return;
        }
        if (user.email === null) {
            console.error("user doesn't have email");
            return;
        }
        const index: number = data.indexOf(" ");
        const iD: string = data.substring(0, index);
        const name: string = data.substring(index+1);
        const eRoute: string = getExtendedRoute(currRouteId, user.email) +"/"+ iD + "/content"
        setCurrRouteName(cons(name ,currRouteName));
        setCurrRouteId(cons(iD, currRouteId));


        const temp = storedContent.get(eRoute);
        if (temp !== undefined) {
            setCurrContent(temp)
        } else {
            setIsLoading(true);
            getFolders(eRoute, foldersResponse);
        }
    }

    /** If not loading and name isn't empty, calls server
     * and saves a copy at the folder location based on currRouteId.
     * Then calls saveResponse
     */
    const saveClick = async (): Promise<void> => {
        if (!isLoading) {
            setIsLoading(true);
            let eRoute: string;
            const user = auth.currentUser;
            if (user === null) {
                console.error("user isn't logged in");
                return;
            }
            if (user.email === null) {
                console.error("user doesn't have email");
                return;
            }
            if (isTemplate) {
                eRoute = "Users/" + user.email +"/Templates"
            } else {
                eRoute = getExtendedRoute(currRouteId, user.email);
            }

            const trimmed: string = currName.trim();
            if (trimmed !== "") {
                try {
                    const user = auth.currentUser;
                    const token = user && (await user.getIdToken());
    
                    const body = {
                        route: eRoute,
                        name: trimmed,
                        body: currBody
                    }
              
                    const payloadHeader = {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      method: "POST",
                      body: JSON.stringify(body)
                    };
            
              
                    fetch(FetchRoute+"/createNote", payloadHeader)
                        .then((res) => {
                            res.json().then((val) => saveResponse(val, eRoute))
                              .catch(() => console.error("error fetching /createNote: 200 response"))
                        })
                        .catch(() => console.error("Error fetching /createNote: Failed to connect to server"));
                    
            
                  } catch (e) {
                    console.log(e);
                  }
            } else {
                setIsLoading(false);
            }
        }
    }

    /** Gets the id of the newly created note and navigates there */
    const saveResponse = (data: unknown, route: string): void => {
        if (!isRecord(data)) {
            console.error('Invalid JSON from /createNote', data);
            return;
        }
        
        if (typeof data.id !== "string") {
            console.error('Invalid id given from /createNote', data.id);
            return;
        }

        // navigate("/note?route="+encodeURIComponent(route+"/"+data.id));
        navigate("/note", {state: {route: route+"/"+data.id}});
    }


    /** HTML element of dropdown options for files.
     * Allows clients to navigate forwards through files.
     */
    const SelectFiles = (): JSX.Element => {
        const options: JSX.Element[] = [];

        if (isLoading) {
            options.push(
                <option key="loading" value="">Loading...</option>
            )
        } else {
            options.push(
                <option key="" value=""> </option>
            )
            for (const info of currContent) {
                options.push(
                    <option key={info.iD} value={info.iD + " " + info.name}>{info.name}</option>
                )
            }
        }
        return (
            <select name="files" id="files" onChange={(e) => folderClick(e.target.value)}>
                {options}
            </select>
        )
    }

    // Checks if the modal is open or not
    if (!isPublicSaving) {
        return <></>
    }

    // Checks if the current location is in the templates folder or not
    if (isTemplate) {
        return (
            <div>
            <label className="backdrop">
                <input type="checkbox" checked={isPublicSaving} onChange={() => setIsPublicSaving(!isPublicSaving)}/>
            </label>
            <div className="make">
                <p className="make-header"> Save a Copy</p>
                <button className="make-exit" onClick={() => setIsPublicSaving(!isPublicSaving)}>X</button>
                <div className="maketxt-wrap">
                    <p className="make-text">Name:</p>
                    <input className="name-input" type="text" value={currName} onChange={changeName}></input>
                </div>
                <div className="maketxt-wrap">
                    <p className="make-text">Location: TemplateHome/</p>
                </div>
                <div className="maketxt-wrap">
                    <p className="make-text">Save as template?</p>
                    <input type="checkbox" className="location-template" checked={isTemplate} onChange={() => setIsTemplate(!isTemplate)}></input>
                </div>

                <p>Warning: You can't move this file later!</p>

                <div className="maketxt-wrap">
                        <button className="create-button" onClick={() => saveClick()}>Save</button>
                        <button className="delete-button" onClick={() => setIsPublicSaving(false)}>Cancel</button>
                </div>


            </div>
        </div>
        )
    }


    return (
        <div>
            <label className="backdrop">
                <input type="checkbox" checked={isPublicSaving} onChange={() => setIsPublicSaving(!isPublicSaving)}/>
            </label>
            <div className="make">
                <p className="make-header"> Save a Copy</p>
                <button className="make-exit" onClick={() => setIsPublicSaving(!isPublicSaving)}>X</button>
                <div className="maketxt-wrap">
                    <p className="make-text">Name:</p>
                    <input className="name-input" type="text" value={currName} onChange={changeName}></input>
                </div>
                <div className="maketxt-wrap">
                    <p className="make-text">Location: {LocationLinks()}</p>
                </div>
                <div className="maketxt-wrap">
                    <p className="make-text">Choose a folder?</p>
                    {SelectFiles()}
                </div>
                <div className="maketxt-wrap">
                    <p className="make-text">Save as template?</p>
                    <input type="checkbox" className="location-template" checked={isTemplate} onChange={() => setIsTemplate(!isTemplate)}></input>
                </div>

                <p className="tiny-warning">Warning: You can't move this file later!</p>

                <div className="maketxt-wrap make-centered">
                        <button className="create-button" onClick={() => saveClick()}>Save</button>
                        <button className="delete-button" onClick={() => setIsPublicSaving(false)}>Cancel</button>
                </div>


            </div>
        </div>
    )
}

export default PublicSaveModal

/** Server call to /getFolders.
 * Calls parseFolders method with relevant and fetched data
 */
const getFolders = async (route: string, cb: FoldersCallback): Promise<void> => {
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

        fetch(FetchRoute+"/getFolders?route="+encodeURIComponent(route), payloadHeader)
            .then((res) => {
                if (res.status === 200) {
                    res.json().then((val) => parseFolders(val, cb, route))
                        .catch(() => console.error("Error fetching /getFolders: 200 response is not JSON"))
                } else {
                    console.error(`Error fetching /getFolders: bad status code: ${res.status}`)
                }
            })
            .catch();
      } catch (e) {
        console.log(e);
      }
}

/** Parses data from getFolders and calls given
 * callback method with relevant data
 */
const parseFolders = (data: unknown, cb: FoldersCallback, route: string): void => {
    const folders: BasicInfo[] = [];

    if (!isRecord(data) || !Array.isArray(data.data)) {
        console.error('Invalid JSON from /getFolders', data);
        return;
    }

    for (const info of data.data) {

        if (typeof info.name !== "string") {
            console.error('Invalid JSON from /getFolders', info.name);
            return;
        }

        if (typeof info.iD !== "string") {
            console.error('Invalid JSON from /getFolers', info.iD);
            return;
        }

        const temp: BasicInfo = {name: info.name, iD: info.iD};
        folders.push(temp);
    }

    cb(folders, route);
}

/** Given a route and email,
 * returns a string used as the route
 * for backend server calls for db
 */
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
