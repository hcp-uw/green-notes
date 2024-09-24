import { route, concat, nil } from "../file-navigation/routes"
import { useState, useEffect, ChangeEvent } from "react"
import { auth } from "../../config/firebase"
import { FetchRoute } from "../file-navigation/routes"

/** Parameters for New Folder Modal */
type FolderModalProps = {
    isMakingFolder: boolean;

    onMakeFolder: React.Dispatch<React.SetStateAction<boolean>>;

    givenPath: route;

    eRoute: string;
}

/** Modal for making a new folder */
const FolderModal = ({isMakingFolder, onMakeFolder, givenPath, eRoute} : FolderModalProps): JSX.Element => {

    // Current path the client is in
    const [currPath, setCurrPath] = useState<string>("");

    // state of name field
    const [name, setName] = useState<string>("");

    /** Updates name field */
    const changeName = (evt: ChangeEvent<HTMLInputElement>): void => {
        setName(evt.target.value);
    }

    // Updates the path whenever the client changes location
    useEffect(() => {
        let temp: string = "";

        let tempPath: route = concat(nil, givenPath);

        while (tempPath.kind !== "nil") {
            temp = temp + tempPath.hd + "/";
            tempPath = tempPath.tl;
        }

        setCurrPath(temp);
    }, [givenPath])

    /** Calls the server to make a new folder at the client's location.
     * Refreshes the page after successful
     */
    const doMakeClick = async (givenName: string, route: string): Promise<void> => {
        const trimmed: string = givenName.trim();
        if (trimmed !== "") {
            try {
                const user = auth.currentUser;
                const token = user && (await user.getIdToken());

                const body = {
                    route: route,
                    name: givenName
                }
          
                const payloadHeader = {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  method: "POST",
                  body: JSON.stringify(body)
                };
        
                fetch(FetchRoute+"/createFolder", payloadHeader)
                    .then(() => window.location.reload())
                    .catch(() => console.error("Error fetching /createFolder: Failed to connect to server"));
                
        
              } catch (e) {
                console.log(e);
              }
        }
    }


    if (!isMakingFolder) { // If modal is closed
        return <></>
    } else {
        return (
            <div>
                <label className="backdrop">
                    <input type="checkbox" checked={isMakingFolder} onChange={() => onMakeFolder(!isMakingFolder)}/>
                </label>
                <div className="make">
                    <p className="make-header"> Make New Folder</p>
                    <button className="make-exit" onClick={() => onMakeFolder(!isMakingFolder)}>X</button>
                    <div className="maketxt-wrap">
                        <p className= "make-text">Location: {currPath}</p>
                    </div>
                    <div className="maketxt-wrap">
                        <p className="make-text">Name:</p>
                        <input className="name-input" required pattern=".*\S+.*" type="text" value={name} onChange={changeName}></input>
                    </div>
                    <div className="maketxt-wrap">
                        <p>You can't change the name later</p>
                    </div>
                    <div className="maketxt-wrap">
                        <button className="create-button" onClick={() => doMakeClick(name, eRoute)}>Create</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default FolderModal;
