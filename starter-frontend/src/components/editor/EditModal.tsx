import { useState, ChangeEvent } from "react";
import { auth } from "../../config/firebase";
import { DetailsData } from "../../pages/editor/editor";
import { FetchRoute } from "../file-navigation/routes";

/** Parameters for Edit Modal */
type EditModalProps = {
    isEditing: boolean,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
    name: string,
    givenClass: string,
    teacher: string,
    year: number,
    tags: string[],
    quarter: string,
    route: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    fetchRes: (detailsData: DetailsData) => void,
}

/** Modal that allows clients to edit details about notes */
const EditModal = ({isEditing, setIsEditing, name, givenClass, teacher, year, tags, quarter, route, setIsLoading, fetchRes, /*unsaved*/}: EditModalProps): JSX.Element => {
    
    const [currName, setCurrName] = useState<string>(name);
    const [currClass, setCurrClass] = useState<string>(givenClass);
    const [currTeacher, setCurrTeacher] = useState<string>(teacher);
    const [currYear, setCurrYear] = useState<number>(year);
    const [currTags, setCurrTags] = useState<string[]>(tags);
    const [currTempTag, setTempTag] = useState<string>("");
    const [currQuarter, setCurrQuarter] = useState<string>(quarter);

    /** Changes state of name field */
    const changeName = (evt: ChangeEvent<HTMLInputElement>): void => {
        setCurrName(evt.target.value);
    }

    /** Changes state of className field */
    const changeClass = (evt: ChangeEvent<HTMLInputElement>): void => {
        setCurrClass(evt.target.value);
    }

    /** Changes state of teacher field */
    const changeTeacher = (evt: ChangeEvent<HTMLInputElement>): void => {
        setCurrTeacher(evt.target.value);
    }

    /** Changes state of year field */
    const changeYear = (evt: ChangeEvent<HTMLInputElement>): void => {
        if (evt.target.value === "") {
            setCurrYear(0);
        } else {
            const parsed: number = parseInt(evt.target.value);
            if (!Number.isNaN(parsed) && (parsed <= 2024)) {
                setCurrYear(parseInt(evt.target.value));
            }
        }
    }

    /** Changes state of Templates field */
    const changeTempTag = (evt: ChangeEvent<HTMLInputElement>): void => {
        const str: string = evt.target.value;
        if (str.length <= 20) {
            setTempTag(str);
        }
    }

    /** Cancels most recent changes */
    const revert = (): void => {
        setCurrName(name);
        setCurrClass(givenClass);
        setCurrTeacher(teacher);
        setCurrYear(year);
        setCurrTags(tags);
        setCurrQuarter(quarter);
        setTempTag("");
        setIsEditing(!isEditing);
    }

    /** Element which renders tag buttons */
    const renderTags = (): JSX.Element => {
        const tagElements: JSX.Element[] = [];
        for (const tempTag of currTags) {
            tagElements.push(
            <button className="tag" key={tempTag} onClick={() => removeTag(tempTag)}>{tempTag} X </button>)
        }

        if (tagElements.length === 0) { // If no tags
            return (
                <div className="modaltxt-wrap">
                    <p className="modal-text">Tags: </p>
                    <input className="text-input-minor" type="text" value={currTempTag} onChange={changeTempTag}></input>
                    {AddTagButton()}
                    <div>
                        No tags Currently (max 10)
                    </div>
                </div>
            )
        }
        if (tagElements.length >= 10) { // If at tag limit
            return (
                <div>
                    <div className="modaltxt-wrap">
                        <p className="modal-text">Tags: </p>
                        <input className="text-input-minor" type="text" value={currTempTag} onChange={changeTempTag}></input>
                        <div>
                            {tagElements}
                        </div>
                    </div>
                    <div>
                        At tag limit (max 10)
                    </div>
                </div>
            )
        }
        return (
            <div className="modaltxt-wrap">
                <p className="modal-text">Tags: </p>
                <input className="text-input-minor" type="text" value={currTempTag} onChange={changeTempTag}></input>
                {AddTagButton()}
                <div>
                    {tagElements}
                </div>
                (max 10)
            </div>
        )
    }

    /** Button to add a tag */
    const AddTagButton = (): JSX.Element => {
        if (currTempTag.trim() !== "") {
            return <button className="small-plus-valid" onClick={() => addTag()}>+</button>
        } else {
            return <button className="small-plus-invalid" onClick={() => addTag()}>+</button>
        }
    }

    /** Method to add a tag */
    const addTag = (): void => {
        const trimmed: string = currTempTag.trim();
        for (const temp of currTags) {
            if (temp === trimmed) {
                setTempTag("");
                return;
            }
        }
        if (trimmed !== "") {
            const tagsCopy = currTags.slice(0);
            tagsCopy.push(trimmed);
            setCurrTags(tagsCopy);
        }
        setTempTag("");
    }

    /** Method to remove tag */
    const removeTag = (tagName: string): void => {
        const tagsCopy: string[] = currTags.slice(0);
        for (let i: number = 0; i < tagsCopy.length; i++) {
            if (tagsCopy[i] === tagName) {
                tagsCopy.splice(i, 1);
                setCurrTags(tagsCopy);
                return;
            }
        }
    }

    /** Method which calls server to save current details */
    const doSaveClick = async (): Promise<void> => {
        const trimmed: string = currName.trim();
        if (trimmed !== "") {
            try {
                setIsLoading(true)
                const user = auth.currentUser;
                const token = user && (await user.getIdToken());

                const body = {
                    route: route,
                    name: trimmed,
                    class: currClass,
                    teacher: currTeacher,
                    year: currYear,
                    quarter: currQuarter,
                    tags: currTags,
                }
          
                const payloadHeader = {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  method: "PUT",
                  body: JSON.stringify(body)
                };
        
                fetch(FetchRoute+"/saveDetails", payloadHeader)
                    .then((res) => {
                        res.json().then((val) => saveResponse(val))
                          .catch(() => console.error("error fetching /saveDetails: 200 response"))
                    })
                    .catch(() => console.error("Error fetching /saveDetails: Failed to connect to server"));
                
        
              } catch (e) {
                console.log(e);
              }
        }
    }

    /** Response after details are saved */
    const saveResponse = (_val: unknown): void => {
        setIsEditing(false);
        const detailsData: DetailsData = {
            name: currName,
            class: currClass,
            teacher: currTeacher,
            year: currYear,
            quarter: currQuarter,
            tags: currTags,
        }
        fetchRes(detailsData);
    }

    if (!isEditing) { // If modal is closed
        return <></>
    } else {
        return (
        <div>
                <label className="backdrop">
                    <input type="checkbox" checked={isEditing} onChange={() => revert()}/>
                </label>
                <div className="edit-popup">
                    <p className="make-header">Edit Details</p>
                    <button className="make-exit" onClick={() => revert()}>X</button>

                    <div className="maketxt-wrap">
                        <p className="make-text">Name: </p>
                        <input className="text-input-minor required-input" required pattern=".*\S+.*" type="text" value={currName} onChange={changeName}></input>

                        <p className="make-text">Class: </p>
                        <input className="text-input-minor" type="text" value={currClass} onChange={changeClass}></input>
                    </div>
                    <div className="maketxt-wrap">
                        <p className="make-text">Teacher: </p>
                        <input className="text-input-minor" type="text" value={currTeacher} onChange={changeTeacher}></input>

                        <p className="make-text">Year: </p>
                        <input className="text-input-minor" type="number" value={currYear} onChange={changeYear} min={0} max={2024}></input>

                        <p className="make-text">Quarter: </p>
                        <select className="text-input-minor" name="quarter" id="quarter" value={currQuarter} onChange={(e) => setCurrQuarter(e.target.value)}>
                            <option value=""></option>
                            <option value="Autumn">Autumn</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                        </select>
                    </div>

                    {renderTags()}
                    <p className="warning-text">Warning: saving details will lose any unsaved progress! Please save your writing first!</p>
                    <div className="maketxt-wrap make-centered">
                        <button className="create-button" onClick={() => doSaveClick()}>Save</button>
                        <button className="delete-button" onClick={() => revert()}>Cancel</button>
                    </div>
                </div>
            </div>
            )
    }
}

export default EditModal
