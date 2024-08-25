import { ChangeEvent, useEffect, useState } from "react";
import { concat, cons, nil, rev, route, len, FetchRoute, isRecord } from "../file-navigation/routes";
import { auth } from "../../config/firebase";


type PublicSaveProps = {
    noteName: string;
    isPublicSaving: boolean;
    setIsPublicSaving: React.Dispatch<React.SetStateAction<boolean>>;
}
type BasicInfo = {name: string, iD: string}
type FoldersCallback = (data: BasicInfo[], name: string, iD: string, route: string) => void;

const PublicSaveModal = ({noteName, isPublicSaving, setIsPublicSaving}: PublicSaveProps): JSX.Element => {

    const [currName, setCurrName] = useState<string>(noteName + " (copy)");
    const [currRouteName, setCurrRouteName] = useState<route>(nil);
    const [currRouteId, setCurrRouteId] = useState<route>(nil);
    const [isTemplate, setIsTemplate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currContent, setCurrContent] = useState<BasicInfo[]>([])
    const [storedContent, setStoredContent] = useState<Map<string, BasicInfo[]>>(new Map());

    const changeName = (evt: ChangeEvent<HTMLInputElement>): void => {
        setCurrName(evt.target.value);
    }


    useEffect(() => {
        // setCurrRouteId(cons("test", nil));
        // setCurrRouteName(cons("test", nil));
        const user = auth.currentUser;
        if (user === null) {
            throw new Error("User isn't logged in");
        }
        if (user.email === null) {
            throw new Error("User doesn't have associated email");
        }
        getFolders("Users/"+user.email+"/Notes", foldersResponse, "", "")
        

    }, [])

    const foldersResponse = (data: BasicInfo[], name: string, iD: string, route: string): void => {
        setCurrContent(data.slice(0));
        setIsLoading(false);
        setStoredContent(map => new Map(map.set(route, data.slice(0))))
    }

    

    const LocationLinks = (): JSX.Element[] => {
        const locations: JSX.Element[] = [];
        let reversed: route = rev(currRouteName);
        locations.push(
            <button key="NotesHome" className="location-link" onClick={() => doLocationClick(0)}>NotesHome/</button>
        )
        let index: number = 1;
        while (reversed.kind !== "nil") {
            const temp: string = reversed.hd;
            locations.push (
                <button key={temp} className="location-link" onClick={() => doLocationClick(index)}>{temp}/</button>
            )
            index ++;
            reversed = reversed.tl;
        }

        return locations;
    }

    const doLocationClick = (index: number): void => { // update currContent with storedContent
        let length: number = len(currRouteName);
        let tempNames: route = concat(currRouteName, nil);
        let tempIds: route = concat(currRouteId, nil);
        while (index < length && tempNames.kind !== "nil" && tempIds.kind !== "nil") {
            tempNames = tempNames.tl;
            tempIds = tempIds.tl;
            length --;
        }
        setCurrRouteName(tempNames);
        setCurrRouteId(tempIds);
    }

    const folderClick = async (data: string): Promise<void> => {

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

        setIsLoading(true);
        getFolders(eRoute, foldersResponse, name, iD);
    }

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
            <select name="files" id = "files" onChange={(e) => folderClick(e.target.value)}>
                {options}
            </select>
        )
    }

    if (!isPublicSaving) {
        return <></>
    }

    if (isTemplate) {
        return (
            <div>
            <label className="backdrop">
                <input type="checkbox" checked={isPublicSaving} onChange={() => setIsPublicSaving(!isPublicSaving)}/>
            </label>
            <div className="modal-body">
                <p className="modal-header"> Save a Copy</p>
                <button className="modal-exit" onClick={() => setIsPublicSaving(!isPublicSaving)}>X</button>
                <div className="modaltxt-wrap">
                    <p className="modal-text">Name:</p>
                    <input className="text-input-major" type="text" value={currName} onChange={changeName}></input>
                </div>
                <div className="modaltxt-wrap">
                    <p className="modal-text">Location: </p>
                    <button className="location-link">TemplateHome/</button>
                </div>
                <div className="modaltxt-wrap">
                    <p className="modal-text">Save as template?</p>
                    <input type="checkbox" className="location-template" checked={isTemplate} onChange={() => setIsTemplate(!isTemplate)}></input>
                </div>

                <p className="warning-text">Warning: You can't move this file later!</p>

                <div className="modaltxt-wrap modal-centered">
                        <button className="input-button" onClick={() => console.log("save time")}>Save</button>
                        <button className="input-button" onClick={() => setIsPublicSaving(false)}>Cancel</button>
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
            <div className="modal-body">
                <p className="modal-header"> Save a Copy</p>
                <button className="modal-exit" onClick={() => setIsPublicSaving(!isPublicSaving)}>X</button>
                <div className="modaltxt-wrap">
                    <p className="modal-text">Name:</p>
                    <input className="text-input-major" type="text" value={currName} onChange={changeName}></input>
                </div>
                <div className="modaltxt-wrap">
                    <p className="modal-text">Location: </p>
                    {LocationLinks()}
                </div>
                <div className="modaltxt-wrap">
                    <p className="modal-text">Choose a file?</p>
                    {SelectFiles()}
                </div>
                <div className="modaltxt-wrap">
                    <p className="modal-text">Save as template?</p>
                    <input type="checkbox" className="location-template" checked={isTemplate} onChange={() => setIsTemplate(!isTemplate)}></input>
                </div>

                <p className="warning-text">Warning: You can't move this file later!</p>


                <div className="modaltxt-wrap modal-centered">
                        <button className="input-button" onClick={() => console.log("save time")}>Save</button>
                        <button className="input-button" onClick={() => setIsPublicSaving(false)}>Cancel</button>
                </div>


            </div>
        </div>
    )
}

export default PublicSaveModal


const getFolders = async (route: string, cb: FoldersCallback, name: string, iD: string): Promise<void> => {
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
                    res.json().then((val) => parseFolders(val, cb, name, iD, route))
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

const parseFolders = (data: unknown, cb: FoldersCallback, name: string, iD: string, route: string): void => {
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

    cb(folders, name, iD, route);
}

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