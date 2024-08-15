import { useState, useEffect } from "react"
import { concat, nil, route, FetchRoute } from "../file-navigation/routes";
import { auth } from "../../config/firebase";


/* ONCE ALL OTHER BRANCHES ARE MERGED GRAB CSS FROM MODAL.CSS */

type DeleteModalProps = {
    isDeleting: boolean,
    setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>,
    givenPath: route,
    eRoute: string
}

const DeleteFolderModal = ({isDeleting, setIsDeleting, givenPath, eRoute}: DeleteModalProps): JSX.Element => {

    const [currPath, setCurrPath] =  useState<string>("");
 
    useEffect(() => {
        let temp: string = "";

        let tempPath: route = concat(nil, givenPath);

        while (tempPath.kind !== "nil") {
            temp = temp + tempPath.hd + "/";
            tempPath = tempPath.tl;
        }

        setCurrPath(temp);
    }, [givenPath])

    const doDeleteClick = async (route: string): Promise<void> => {
        try {
            const user = auth.currentUser;
            const token = user && (await user.getIdToken());

      
            const payloadHeader = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              method: "DELETE"
            };

            fetch(FetchRoute+"/deleteFolder?route="+encodeURIComponent(route), payloadHeader)
                .then(res => {
                    window.location.reload();
                    // console.log(res.status)
                })
                .catch(() => console.error("Error fetching /delteFolder: Failed to connect"));

        } catch (e) {
            console.log(e);
        }
    }


    if (!isDeleting) {
        return <></>
    } else {
        return (
            <div>
            <label className="backdrop">
                <input type="checkbox" checked={isDeleting} onChange={() => setIsDeleting(false)}/>
            </label>
            <div className="make">
                <p className="make-header">Delete Folder</p>
                <button className="make-exit" onClick={() => setIsDeleting(false)}>X</button>

                <div className="maketxt-wrap">
                    <p className="make-text">Location: {currPath}</p>
                    {/* <input type="text" value={folderName} onChange={changeName}></input> */}
                </div>
                <div className="maketxt-wrap">
                    <p className="make-text">Would you like to delete this folder and all of its contents? <b>This action can't be undone!</b></p>
                </div>
                <p>Note: You can't delete a folder if it has subfolders. You must delete those first</p>
                <div className="maketxt-wrap">
                    <button className="delete-button" onClick={() => doDeleteClick(eRoute)}>Delete</button>
                    <button className="create-button" onClick={() => setIsDeleting(false)}>Cancel</button>
                </div>
            </div>
        </div>
        )
    }
}

export default DeleteFolderModal