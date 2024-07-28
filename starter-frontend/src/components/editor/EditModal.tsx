import { useState, ChangeEvent, useEffect } from "react";

type EditModalProps = {
    isEditing: boolean,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
    name: string,
    givenClass: string,
    teacher: string,
    year: number,
    tags: string[],
    quarter: string,
}


const EditModal = ({isEditing, setIsEditing, name, givenClass, teacher, year, tags, quarter}: EditModalProps): JSX.Element => {
    
    const [currName, setCurrName] = useState<string>(name);
    const [currClass, setCurrClass] = useState<string>(givenClass);
    const [currTeacher, setCurrTeacher] = useState<string>(teacher);
    const [currYear, setCurrYear] = useState<number>(year);
    const [currTags, setCurrTags] = useState<string[]>(tags);
    const [currTempTag, setTempTag] = useState<string>("");
    const [currQuarter, setCurrQuarter] = useState<string>(quarter);


    const changeName = (evt: ChangeEvent<HTMLInputElement>): void => {
        setCurrName(evt.target.value);
    }

    const changeClass = (evt: ChangeEvent<HTMLInputElement>): void => {
        setCurrClass(evt.target.value);
    }

    const changeTeacher = (evt: ChangeEvent<HTMLInputElement>): void => {
        setCurrTeacher(evt.target.value);
    }

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

    const changeTempTag = (evt: ChangeEvent<HTMLInputElement>): void => {
        const str: string = evt.target.value;
        if (str.length <= 20) {
            setTempTag(str);
        }
    }

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


    const renderTags = (): JSX.Element => {
        const tagElements: JSX.Element[] = [];
        for (const tempTag of currTags) {
            tagElements.push(
            <button key={tempTag} onClick={() => removeTag(tempTag)}>{tempTag} X </button>)
        }

        if (tagElements.length === 0) {
            return (
                <div className="maketxt-wrap">
                    <p className="make-text">Tags: </p>
                    <input type="text" value={currTempTag} onChange={changeTempTag}></input>
                    <button onClick={() => addTag()}>+</button>
                    <div>
                        No tags Currently (max 10)
                    </div>
                </div>
            )
        }
        if (tagElements.length >= 10) {
            return (
                <div>
                    <div className="maketxt-wrap">
                        <p className="make-text">Tags: </p>
                        <input type="text" value={currTempTag} onChange={changeTempTag}></input>
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
            <div className="maketxt-wrap">
                <p className="make-text">Tags: </p>
                <input type="text" value={currTempTag} onChange={changeTempTag}></input>
                <button onClick={() => addTag()}>+</button>
                <div>
                    {tagElements}
                </div>
                (max 10)
            </div>
        )
    }

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

    if (!isEditing) {
        return <></>
    } else {
        return (
        <div>
                <label className="backdrop">
                    <input type="checkbox" checked={isEditing} onChange={() => revert()}/>
                </label>
                <div className="make">
                    <p className="make-header">Edit Details</p>
                    <button className="make-exit" onClick={() => revert()}>X</button>

                    <div className="maketxt-wrap">
                        <p className="make-text">Name: </p>
                        <input type="text" value={currName} onChange={changeName}></input>

                        <p className="make-text">Class: </p>
                        <input type="text" value={currClass} onChange={changeClass}></input>
                    </div>
                    <div className="maketxt-wrap">
                        <p className="make-text">Teacher: </p>
                        <input type="text" value={currTeacher} onChange={changeTeacher}></input>

                        <p className="make-text">Year: </p>
                        <input type="number" value={currYear} onChange={changeYear} min={0} max={2024}></input>

                        <p className="make-text">Quarter: </p>
                        <select name="quarter" id="quarter" value={currQuarter} onChange={(e) => setCurrQuarter(e.target.value)}>
                            <option value=""></option>
                            <option value="Autumn">Autumn</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                        </select>
                    </div>

                    {renderTags()}
                </div>
            </div>
            )
    }
}

export default EditModal