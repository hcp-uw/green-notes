import TextEditor from "../../components/editor/TextEditor";
import { useState, useEffect } from "react";
import { getNoteContents, NoteData } from "../notes/notes";
import { User } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import EditModalButton from "../../components/editor/EditModalButton";
import EditModal from "../../components/editor/EditModal";
import ShareButton from "../../components/editor/ShareButton";
import ShareModal from "../../components/editor/ShareModal";
import DeleteButton from "../../components/editor/DeleteButton";
import DeleteModal from "../../components/editor/DeleteModal"


export type DetailsData = {
    name: string,
    class: string,
    teacher: string,
    year: number,
    tags: string[],
    quarter: string
}

export function Note(): JSX.Element {

    // Loading state
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Text state used to get data from server to pass to TextEditor 
    const [currBody, setCurrBody] = useState<string>("");

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [isSharing, setIsSharing] = useState<boolean>(false);

    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const [currName, setCurrName] = useState<string>("");
    const [currClass, setCurrClass] = useState<string>("");
    const [currTeacher, setCurrTeacher] = useState<string>("");
    const [currYear, setCurrYear] = useState<number>(0);
    const [currTags, setCurrTags] = useState<string[]>([]);
    const [currQuarter, setCurrQuarter] = useState<string>("");
    const [sharedRecently, setSharedRecently] = useState<boolean>(false);
    // const [isUnsaved, setIsUnsaved] = useState<boolean>(false);

    const navigate = useNavigate();

    // Window params, for now just for the "route" param
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    const route: string | null = params.get("route");

    // Response for when the call is succesful
    const fetchResponse = (noteData: NoteData, route: string) => {
        // console.log("Body:", noteData.body);
        // console.log("route:", route);
        setCurrBody(noteData.body);
        setCurrName(noteData.name);
        setCurrClass(noteData.className);
        setCurrTeacher(noteData.teacher);
        setCurrYear(noteData.year);
        setCurrTags(noteData.tags);
        setCurrQuarter(noteData.quarter);
        setIsLoading(false);
    }

    const detailsResponse = (detailsData: DetailsData): void => {
        setCurrName(detailsData.name);
        setCurrClass(detailsData.class);
        setCurrTeacher(detailsData.teacher);
        setCurrYear(detailsData.year);
        setCurrTags(detailsData.tags);
        setCurrQuarter(detailsData.quarter);
        setIsLoading(false);
    }

    const doShareClick = async (name: string): Promise<void> => {
        const trimmed: string = name.trim();
        if (trimmed !== "") {
            try {
                setIsLoading(true);
                const user = auth.currentUser;
                const token = user && (await user.getIdToken());

                const body = {
                    name: trimmed,
                    class: currClass,
                    teacher: currTeacher,
                    year: currYear,
                    quarter: currQuarter,
                    tags: currTags,
                    body: currBody
                }

                const payloadHeader = {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    method: "POST",
                    body: JSON.stringify(body)
                  };

                  fetch("http://localhost:3001/shareDoc", payloadHeader)
                    .then((a) => {
                        setIsLoading(false);
                        setIsSharing(false);
                        setSharedRecently(true)})
                    .catch((a) => console.log(a))

            } catch (e) {
                setIsLoading(false);
                console.log(e)
            }
        }
    }

    const doDeleteClick = async (): Promise<void> => {
        setIsLoading(true);
        if (route !== null) {
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
    
                fetch("http://localhost:3001/deleteDoc?route="+encodeURIComponent(route), payloadHeader)
                    .then((res) => {
                        console.log(res.status);
                        navigate("/Notes");
                    })
                    .catch((a) => console.log(a))
                
            } catch (e) {
                console.log(e);
            }
        }
    }

    // On initial load and when auth.currentUser changes.
    // The second case should never be a possibility without changing pages anyways
    useEffect(() => {
        if (route === null) {
            console.log("no route given");
            navigate("/Notes")
        } else {

            const user = auth.currentUser;

            const fetchNotes = async (user: User | null): Promise<void> => {
                setIsLoading(true);
                if (user === null) {
                    throw new Error("User isn't logged in");
                }
                if (user.email === null) {
                    throw new Error("User doesn't have associated email");
                }

                getNoteContents(route, fetchResponse)
                    .then(() => console.log("fetch worked"))
                    .catch(() => console.log("error fetching note"))
            }

            fetchNotes(user);
        }
    }, [route])

    if (route === null) {
        return <>error</>
    }

    
    if (isLoading) {
        return (<>Loading....</>)
    } else {
        return (
            <div className="page gray-background">
                <EditModalButton setIsEditing={setIsEditing}/>
                <ShareButton setIsSharing={setIsSharing}/>
                <DeleteButton setIsDeleting={setIsDeleting}/>
                <TextEditor 
                initContent={currBody}
                eRoute={route}
                setIsLoading={setIsLoading} setCurrContent={setCurrBody}
                />
                <EditModal isEditing={isEditing} setIsEditing={setIsEditing} name={currName} quarter={currQuarter}
                    givenClass={currClass} teacher={currTeacher} year={currYear} tags={currTags} route={route} 
                    setIsLoading={setIsLoading} fetchRes={detailsResponse}/>

                <ShareModal isSharing={isSharing} setIsSharing={setIsSharing} name={currName} 
                            sharedRecently={sharedRecently} doShareClick={doShareClick}/>
                <DeleteModal isDeleting={isDeleting} setIsDeleting={setIsDeleting} doDeleteClick={doDeleteClick}/>
            </div>
        );
    }
    
}