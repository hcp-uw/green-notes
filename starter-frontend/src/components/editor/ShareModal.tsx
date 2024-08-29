import { useState, ChangeEvent } from "react"

/** Parameters for share modal */
type ShareModalProps = {
    isSharing: boolean,
    setIsSharing: React.Dispatch<React.SetStateAction<boolean>>,
    name: string,
    sharedRecently: boolean,
    doShareClick: (name: string) => Promise<void>,
}

/** Modal to allow clients to public share notes */
const ShareModal = ({isSharing, setIsSharing, name, sharedRecently, doShareClick, /*unsaved*/}: ShareModalProps): JSX.Element => {

    const [currName, setCurrName] = useState<string>(name)

    /** Updates currName field */
    const changeName = (evt: ChangeEvent<HTMLInputElement>): void => {
        setCurrName(evt.target.value);
    }


    if (!isSharing) { // If modal is closed
        return(<></>)
    } else if (!sharedRecently){
        return (
            <div>
                <label className="backdrop">
                    <input type="checkbox" checked={isSharing} onChange={() => setIsSharing(false)}/>
                </label>
                <div className="modal-body">
                    <p className="modal-header">Share Note</p>
                    <button className="modal-exit" onClick={() => setIsSharing(false)}>X</button>

                    <div className="modaltxt-wrap">
                        <p className="modal-text">Name: </p>
                        <input className="text-input-major required-input"  required pattern=".*\S+.*" type="text" value={currName} onChange={changeName}></input>
                    </div>
                    <div className="modaltxt-wrap">
                        <p className="modal-text">Would you like to share a copy of this note? The shared details and content can't be changed later.</p>
                    </div>
                    <p className="warning-text">Warning: sharing will lose any unsaved progress! Please save your writing first!</p>
                    <div className="modaltxt-wrap modal-centered">
                        <button className="input-button" onClick={() => doShareClick(currName)}>Share</button>
                        <button className="input-button" onClick={() => setIsSharing(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <label className="backdrop">
                    <input type="checkbox" checked={isSharing} onChange={() => setIsSharing(false)}/>
                </label>
                <div className="modal">
                    <p className="modal-header">Share Note</p>
                    <button className="modal-exit" onClick={() => setIsSharing(false)}>X</button>

                    <div className="modaltxt-wrap">
                        <p className="modal-text">Name: </p>
                        <input className="text-input-major required-input"  required pattern=".*\S+.*" type="text" value={currName} onChange={changeName}></input>
                    </div>
                    <div className="modaltxt-wrap">
                        <p className="modal-text">Would you like to share a copy of this note? The shared details and content can't be changed later</p>
                    </div>
                    <div className="modaltxt-wrap">
                        <p className="modal-text">*You've already shared this doc recently</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShareModal