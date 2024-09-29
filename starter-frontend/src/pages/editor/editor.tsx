import TextEditor from "../../components/editor/TextEditor";
import { useState, useEffect, useRef } from "react";
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
import { Editor as TinyMCEEditor } from 'tinymce';
import { languageOption, languageOptions } from "../../components/ide/languageOptions";

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
    // IDE code
    const [code, setCode] = useState<string>("");
    // IDE language
    const [language, setLanguage] = useState<languageOption>(languageOptions[0]);

    // ***
    const editorRef = useRef<TinyMCEEditor | null>(null);

    
    function openNewIDE(): void {
        setCode("");
        setLanguage(languageOptions[0]);
        setIsIDEOpen(true);
    }

    function openIDE(ev: MouseEvent): void {
        // @ts-ignore
        if (ev.target !== null && ev.target.className !== null && ev.target.className === "run-in-ide-btn") {
            // @ts-ignore
            const editor = ev.target.getRootNode();
            const oldActive = editor.getElementById("active");
            if (oldActive !== null) {
                oldActive.setAttribute("id", "");
            }


            // @ts-ignore
            const parentDiv = ev.target.parentNode;
            if (parentDiv !== null) {
                const codeBlock = parentDiv.querySelector("code");
                if (codeBlock !== null) {
                    codeBlock.id = "active";
                    const codeContent = codeBlock.textContent;
                    if (codeContent === null) {
                        console.log("code null");
                        setCode("");
                    } else {
                        setCode(codeContent);
                    }
                    console.log("setting code");
                    const language = codeBlock.dataset.lang;
                    if (language === null) {
                        console.log("language null");
                        setLanguage(languageOptions[0]);
                    } else {
                        setLanguage(languageOptions[Number(language)]);
                    }
                    console.log("setting language");
                    
                    setIsIDEOpen(true);   
                }
            }
        }

    }
    

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
            <div className="page gray-background">
                <SavePublicButton setIsPublicSaving={setIsPublicSaving}/>
                <div id="main-area">
                    <PublicNoteDisplayer body={currBody} openIDE={openIDE}/>
                    {
                    isIDEOpen && 
                    <IDE collab={true} code={code} setCode={setCode} language={language} setLanguage={setLanguage} setIsIDEOpen={setIsIDEOpen} editorRef={editorRef}/>}
                </div>
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
                <TextEditor editorRef={editorRef} initContent={currBody} eRoute={route} 
                setIsLoading={setIsLoading} setCurrContent={setCurrBody} openIDE={openIDE}
                openNewIDE={openNewIDE}/>
                {
                isIDEOpen && 
                <IDE collab={false} code={code} setCode={setCode} language={language} setLanguage={setLanguage} setIsIDEOpen={setIsIDEOpen} editorRef={editorRef}/>}
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
const PublicNoteDisplayer = ({body, openIDE}: {body: string, openIDE: (ev: MouseEvent) => void}): JSX.Element => {
    useEffect(() => {
        document.addEventListener("click", openIDE);
    });

    return (
    <div className="display-window" >
        <div dangerouslySetInnerHTML={{__html: body}}>
        </div>
    </div>
    )
}
