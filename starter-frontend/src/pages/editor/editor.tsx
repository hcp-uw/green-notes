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
import DeleteModal from "../../components/editor/DeleteModal";
import { useLocation } from "react-router-dom";
import { FetchRoute } from "../../components/file-navigation/routes";
import SavePublicButton from "../../components/editor/SavePublicButton";
import PublicSaveModal from "../../components/editor/PublicSaveModal";
import IDE from "../../components/ide/IDE";

/** Type for storing details about note documents */
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

    // Edit Modal state
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // Sharing Modal state
    const [isSharing, setIsSharing] = useState<boolean>(false);

    // Deleting Modal state
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    // Saving a Copy Modal state
    const [isPublicSaving, setIsPublicSaving] = useState<boolean>(false);

    // IDE
    // If IDE is open
    const [isIDEOpen, setIsIDEOpen] = useState<boolean>(false);
    // Initial IDE code
    const [initIDECode, setInitIDECode] = useState<string>("");

    const [currName, setCurrName] = useState<string>("");
    const [currClass, setCurrClass] = useState<string>("");
    const [currTeacher, setCurrTeacher] = useState<string>("");
    const [currYear, setCurrYear] = useState<number>(0);
    const [currTags, setCurrTags] = useState<string[]>([]);
    const [currQuarter, setCurrQuarter] = useState<string>("");
    const [sharedRecently, setSharedRecently] = useState<boolean>(false);

    const navigate = useNavigate();

    const location = useLocation();
    const route = location.state.route;
    let isPublic: boolean = true;
    if (typeof route === "string") {
        if (route.charAt(0) === "U") { // Checks if current route is in Users or Shared
            isPublic = false;
        }
    }

    /** Response after the intial call to get notes data */
    const fetchResponse = (noteData: NoteData, _route: string) => {
        setCurrBody(noteData.body);
        setCurrName(noteData.name);
        setCurrClass(noteData.className);
        setCurrTeacher(noteData.teacher);
        setCurrYear(noteData.year);
        setCurrTags(noteData.tags);
        setCurrQuarter(noteData.quarter);
        setIsLoading(false);
    }

    /** Response after details are saved */
    const detailsResponse = (detailsData: DetailsData): void => {
        setCurrName(detailsData.name);
        setCurrClass(detailsData.class);
        setCurrTeacher(detailsData.teacher);
        setCurrYear(detailsData.year);
        setCurrTags(detailsData.tags);
        setCurrQuarter(detailsData.quarter);
        setIsLoading(false);
    }

    /** Method called when the client shares their note */
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

                  fetch(FetchRoute+"/shareDoc", payloadHeader)
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

    /** Method called when client deletes their note */
    const doDeleteClick = async (): Promise<void> => {
        setIsLoading(true);
        if (typeof route === "string") {
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
    
                fetch(FetchRoute+"/deleteDoc?route="+encodeURIComponent(route), payloadHeader)
                    .then((res) => {
                        // console.log(res.status);
                        navigate("/notes");
                    })
                    .catch((a) => console.log(a))
                
            } catch (e) {
                console.log(e);
            }
        }
    }

    // On initial load, fetches note data from server
    useEffect(() => {
        if (typeof route !== "string") {
            console.error("no route given");
            navigate("/notes")
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
    }, [])

    if (typeof route !== "string") { // If route of note isn't valid
        return <>error</>
    }

    
    if (isLoading) { // If page is loading
        return (<>Loading....</>)
    }

    if (isPublic) { // If note is publicly shared
        return (
            <div className="page gray-background flex">
                <SavePublicButton setIsPublicSaving={setIsPublicSaving}/>
                <PublicNoteDisplayer body={currBody}/>
                <PublicSaveModal isPublicSaving={isPublicSaving} setIsPublicSaving={setIsPublicSaving} 
                noteName={currName} currBody={currBody}/>
            </div>
        )
    }

    return (
        <div className="page gray-background">
            <EditModalButton setIsEditing={setIsEditing}/>
            <ShareButton setIsSharing={setIsSharing}/>
            <DeleteButton setIsDeleting={setIsDeleting}/>
            <div id="main-area">
                <TextEditor initContent={currBody} eRoute={route} 
                setIsLoading={setIsLoading} setCurrContent={setCurrBody}/>
                {
                // isIDEOpen && 
                <IDE initCode={initIDECode}/>}
            </div>
            
            
            <EditModal isEditing={isEditing} setIsEditing={setIsEditing} name={currName} quarter={currQuarter}
                givenClass={currClass} teacher={currTeacher} year={currYear} tags={currTags} route={route} 
                setIsLoading={setIsLoading} fetchRes={detailsResponse}/>

            <ShareModal isSharing={isSharing} setIsSharing={setIsSharing} name={currName} 
                        sharedRecently={sharedRecently} doShareClick={doShareClick}/>

            <DeleteModal isDeleting={isDeleting} setIsDeleting={setIsDeleting} doDeleteClick={doDeleteClick}/>
        </div>
    );
}

/** Element to display content when the note is a publicly shared one */
const PublicNoteDisplayer = ({body}: {body: string}): JSX.Element => {
    return (
    <div className="display-window" >
        <div dangerouslySetInnerHTML={{__html: body}}>

        </div>
    </div>
    )
}
