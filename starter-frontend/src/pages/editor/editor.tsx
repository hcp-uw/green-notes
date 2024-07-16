import TextEditor from "../../components/editor/TextEditor";

export default function Note({id}: {id: string}): JSX.Element {
    const content: string = getContent(id);

    return (
        <div className="page gray-background">
            <TextEditor 
            initContent={content}
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
