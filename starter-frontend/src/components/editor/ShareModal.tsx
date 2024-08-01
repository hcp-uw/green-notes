import { useState, ChangeEvent } from "react"

type ShareModalProps = {
    isSharing: boolean,
    setIsSharing: React.Dispatch<React.SetStateAction<boolean>>,
    name: string,
    sharedRecently: boolean,
    doShareClick: (name: string) => Promise<void>,
    // unsaved: boolean,
}

const ShareModal = ({isSharing, setIsSharing, name, sharedRecently, doShareClick, /*unsaved*/}: ShareModalProps): JSX.Element => {

    const [currName, setCurrName] = useState<string>(name)

    const changeName = (evt: ChangeEvent<HTMLInputElement>): void => {
        setCurrName(evt.target.value);
    }

    // const unsavedNotif = (): JSX.Element => {
    //     if (unsaved) {
    //         return(
    //             <div className="maketxt-wrap">
    //                 <p className="make-text">You have unsaved work. Sharing now will lose all unsaved writing</p>
    //             </div>
    //         )
    //     } else {
    //         return <></>
    //     }
    // }

    if (!isSharing) {
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
                        <input className="text-input-major" type="text" value={currName} onChange={changeName}></input>
                    </div>
                    <div className="modaltxt-wrap">
                        <p className="modal-text">Would you like to share a copy of this note? The shared details and content can't be changed later.</p>
                    </div>
                    {/* {unsavedNotif()} */}
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
                        <input className="text-input-major" type="text" value={currName} onChange={changeName}></input>
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