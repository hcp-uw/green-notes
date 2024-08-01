import { useState, ChangeEvent } from "react"


/* ONCE ALL OTHER BRANCHES ARE MERGED GRAB CSS FROM MODAL.CSS */

type DeleteModalProps = {
    isDeleting: boolean,
    setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>,
    location: string,
}

const DeleteFolderModal = ({isDeleting, setIsDeleting, location}: DeleteModalProps): JSX.Element => {


    // const [folderName, setFolderName] = useState<string>(location);
    //    
    // const changeName = (evt: ChangeEvent<HTMLInputElement>): void => {
    //     setFolderName(evt.target.value);
    // }

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
                    <p className="make-text">location: {location}</p>
                    {/* <input type="text" value={folderName} onChange={changeName}></input> */}
                </div>
                <div className="maketxt-wrap">
                    <p className="make-text">Would you like to delete this folder and all of its contents? This action can't be undone!</p>
                </div>
                <p>Note: this feature hasn't been implemented yet</p>
                <div className="maketxt-wrap">
                    <button onClick={() => console.log("deleted")}>Delete</button>
                    <button onClick={() => setIsDeleting(false)}>Cancel</button>
                </div>
            </div>
        </div>
        )
    }
}

export default DeleteFolderModal