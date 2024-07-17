import TextEditor from "../../components/editor/TextEditor";
import { useState, useEffect } from "react";
import { getNoteContents } from "../notes/notes";
import { User } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export default function Note(): JSX.Element {

    // Loading state
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Text state used to get data from server to pass to TextEditor 
    const [currBody, setCurrBody] = useState<string>("");

    const navigate = useNavigate();

    // Window params, for now just for the "route" param
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    const route: string | null = params.get("route");

    // Response for when the call is succesful
    const fetchResponse = (body: string, route: string) => {
        console.log("Body:", body);
        console.log("route:", route);
        setCurrBody(body);
        setIsLoading(false);
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

                getNoteContents("Users/"+user.email+route, fetchResponse)
                    .then(() => console.log("fetch worked"))
                    .catch(() => console.log("error fetching note"))
            }

            fetchNotes(user);
        }
    }, [route])


    if (isLoading) {
        return (<>Loading....</>)
    } else {
        return (
            <div className="page gray-background">
                <TextEditor 
                initContent={currBody}
                />
            </div>
        );
    }
    
}