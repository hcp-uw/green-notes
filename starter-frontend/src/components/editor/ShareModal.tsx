import { useState, ChangeEvent } from "react"

type ShareModalProps = {
    isSharing: boolean,
    setIsSharing: React.Dispatch<React.SetStateAction<boolean>>,
    name: string
}

const ShareModal = ({isSharing, setIsSharing, name}: ShareModalProps): JSX.Element => {

    const [currName, setCurrName] = useState<string>(name)

    const changeName = (evt: ChangeEvent<HTMLInputElement>): void => {
        setCurrName(evt.target.value);
    }

    if (!isSharing) {
        return(<></>)
    } else {
        return (
            <div>
                <label className="backdrop">
                    <input type="checkbox" checked={isSharing} onChange={() => setIsSharing(false)}/>
                </label>
                <div className="make">
                    <p className="make-header">Share Note</p>
                    <button className="make-exit" onClick={() => setIsSharing(false)}>X</button>

                    <div className="maketxt-wrap">
                        <p className="make-text">Name: </p>
                        <input type="text" value={currName} onChange={changeName}></input>
                    </div>
                    <div className="maketxt-wrap">
                        <p className="make-text">Would you like to share a copy of this note? The shared details and content can't be changed later</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShareModal