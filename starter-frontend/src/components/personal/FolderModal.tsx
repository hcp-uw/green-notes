import { route, concat, nil } from "../file-navigation/routes"
import { useState, useEffect, ChangeEvent } from "react"
import { auth } from "../../config/firebase"

type FolderModalProps = {
    isMakingFolder: boolean;

    onMakeFolder: React.Dispatch<React.SetStateAction<boolean>>;

    givenPath: route;

    eRoute: string;
}

// Uses css from Create.css
const FolderModal = ({isMakingFolder, onMakeFolder, givenPath, eRoute} : FolderModalProps): JSX.Element => {


    const [currPath, setCurrPath] = useState<string>("");
    const [name, setName] = useState<string>("");

    const changeName = (evt: ChangeEvent<HTMLInputElement>): void => {
        setName(evt.target.value);
    }

    useEffect(() => {
        let temp: string = "";

        let tempPath: route = concat(nil, givenPath);

        while (tempPath.kind !== "nil") {
            temp = temp + tempPath.hd + "/";
            tempPath = tempPath.tl;
        }

        setCurrPath(temp);
    }, [givenPath])


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
        
          
                // Fetches the /getFolderContents. The string in the encodeURIComponent is the route
                // and the payload header is necessary stuff for server authentication
                fetch("http://localhost:3001/createFolder", payloadHeader)
                    .then(() => window.location.reload())
                    .catch(() => console.error("Error fetching /createFolder: Failed to connect to server"));
                
        
              } catch (e) {
                console.log(e);
              }
        }
    }


    if (!isMakingFolder) {
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
                        <input type="text" value={name} onChange={changeName}></input>
                    </div>
                    <div className="maketxt-wrap">
                        <p className="make-text">Create: </p>
                        <button onClick={() => doMakeClick(name, eRoute)}>Make</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default FolderModal;