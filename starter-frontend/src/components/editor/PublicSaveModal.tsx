import { ChangeEvent, useState } from "react";
import { nil, rev, route } from "../file-navigation/routes";


type PublicSaveProps = {
    noteName: string;
    isPublicSaving: boolean;
    setIsPublicSaving: React.Dispatch<React.SetStateAction<boolean>>;
}

const PublicSaveModal = ({noteName, isPublicSaving, setIsPublicSaving}: PublicSaveProps): JSX.Element => {

    const [name, setName] = useState<string>(noteName + " (copy)");
    const [currRouteName, setCurrRouteName] = useState<route>(nil);
    const [currRouteId, setCurrRouteId] = useState<route>(nil);
    const [isTemplate, setIsTemplate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const changeName = (evt: ChangeEvent<HTMLInputElement>): void => {
        setName(evt.target.value);
    }

    const LocationLinks = (): JSX.Element[] => {
        const locations: JSX.Element[] = [];
        let reversed: route = rev(currRouteName);
        locations.push(
            <button className="location-link">NotesHome/</button>
        )
        locations.push(
            <button className="location-link">NotesHome/</button>
        )
        while (reversed.kind !== "nil") {
            locations.push (
                <button className="location-link">{reversed.hd}/</button>
            )
            reversed = reversed.tl;
        }

        return locations;
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
            <div className="make">
                <p className="make-header"> Save a Copy</p>
                <button className="make-exit" onClick={() => setIsPublicSaving(!isPublicSaving)}>X</button>
                <div className="maketxt-wrap">
                    <p className="make-text">Name:</p>
                    <input className="name-input" type="text" value={name} onChange={changeName}></input>
                </div>
                <div className="maketxt-wrap">
                    <p className="make-text">Location: </p>
                    <button className="location-link">TemplatesHome/</button>
                </div>
                <div className="maketxt-wrap">
                    <p className="make-text">Save as template?</p>
                    <input type="checkbox" className="location-template" checked={isTemplate} onChange={() => setIsTemplate(!isTemplate)}></input>
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
                    <input className="name-input" type="text" value={name} onChange={changeName}></input>
                </div>
                <div className="maketxt-wrap">
                    <p className="make-text">Location: </p>
                    {LocationLinks()}
                </div>
                <div className="maketxt-wrap">
                    <p className="make-text">Save as template?</p>
                    <input type="checkbox" className="location-template" checked={isTemplate} onChange={() => setIsTemplate(!isTemplate)}></input>
                </div>


            </div>
        </div>
    )
    

}

export default PublicSaveModal