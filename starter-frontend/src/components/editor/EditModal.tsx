import { useState, ChangeEvent, useEffect } from "react";

type EditModalProps = {
    isEditing: boolean,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
    name: string,
    givenClass: string,
    teacher: string,
    year: number,
    tags: string[]
}


const EditModal = ({isEditing, setIsEditing, name, givenClass, teacher, year, tags}: EditModalProps): JSX.Element => {
    
    const [currName, setCurrName] = useState<string>(name);
    const [currClass, setCurrClass] = useState<string>(givenClass);
    const [currTeacher, setCurrTeacher] = useState<string>(teacher);
    const [currYear, setCurrYear] = useState<number>(year);
    const [currTags, setCurrTags] = useState<string[]>(tags)


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

    const revert = (): void => {
        setCurrName(name);
        setCurrClass(givenClass);
        setCurrTeacher(teacher);
        setCurrYear(year);
        setCurrTags(tags);
        setIsEditing(!isEditing);
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
                    </div>
                </div>
            </div>
            )
    }
}

export default EditModal