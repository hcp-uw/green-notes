import { route, concat, nil } from "../file-navigation/routes"
import { useState, useEffect } from "react"

type FolderModalProps = {
    isMakingFolder: boolean;

    onMakeFolder: React.Dispatch<React.SetStateAction<boolean>>;

    givenPath: route
}

// Uses css from Create.css
const FolderModal = ({isMakingFolder, onMakeFolder, givenPath} : FolderModalProps): JSX.Element => {


    const [currPath, setCurrPath] = useState<string>("");

    useEffect(() => {
        let temp: string = "";

        let tempPath: route = concat(nil, givenPath);

        while (tempPath.kind !== "nil") {
            temp = temp + tempPath.hd + "/";
            tempPath = tempPath.tl;
        }

        setCurrPath(temp);
    }, [givenPath])

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
                        <p className="make-text">Create: </p>
                        <button onClick={() => console.log("clicked")}>Make</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default FolderModal;