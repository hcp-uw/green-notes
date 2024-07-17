import TextEditor from "../../components/editor/TextEditor";
import { useLocation } from "react-router-dom";

export default function Note({id}: {id: string}): JSX.Element {
    const content: string = getContent(id);
    const location = useLocation();
    const body: string = location.state.body;

    

    return (
        <div className="page gray-background">
            <TextEditor 
            initContent={body}
            />
        </div>
    );
}


/** Returns content of the note with the given ID. 
 * TO-DO: implement
 */
function getContent(id: string): string {
    return "dummy";
}
