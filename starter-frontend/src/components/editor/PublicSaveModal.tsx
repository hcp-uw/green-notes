import { ChangeEvent, useEffect, useState } from "react";
import { concat, cons, nil, rev, route, len } from "../file-navigation/routes";
import { auth } from "../../config/firebase";


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
    const [storedContent, setStoredContent] = useState<Map<string, string[]>>(new Map());

    const changeName = (evt: ChangeEvent<HTMLInputElement>): void => {
        setName(evt.target.value);
    }


    useEffect(() => {
        setCurrRouteId(cons("test", nil));
        setCurrRouteName(cons("test", nil));
    }, [])

    const user = auth.currentUser;
    if (user === null) {
        return<></>
    }
    const email = user.email;
    if (email === null) {
        return<></>
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

    const doLocationClick = (index: number): void => {
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

    const SelectFiles = (): JSX.Element[] => {
        return [];
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
                    <input className="text-input-major" type="text" value={name} onChange={changeName}></input>
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
                    <input className="text-input-major" type="text" value={name} onChange={changeName}></input>
                </div>
                <div className="modaltxt-wrap">
                    <p className="modal-text">Location: </p>
                    {LocationLinks()}
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