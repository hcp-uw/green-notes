import { Link } from 'react-router-dom';
import { doNoteClick } from '../../pages/notes/notes';
import { useNavigate } from 'react-router-dom';

type NoteThumbnailProps = {
    /** Title of note. */
    title: string;

    /** Beginning text of note. */
    text: string;

    /** ID of note (used in link). */
    id: string;

    onNoteClick: (id: string) => string;

    navigate: (route: string, body: string) => void;
}

/**
 * Note thumbnail that displays beginning of note text and title.
 * 
 * Parameters:
 *  - title: title of note
 *  - text: text of note
 *  - id: id of note (used for link)
 * 
 * TO-DO: 
 *  - Direct to specific note instead of placeholder. 
 *  - Cut off text so that it fits in the thumbnail. (Currently the text is visually cut 
 *    off but the text is still on the page if you copy-paste or use a screen reader.)
 */
function NoteThumbnail({title, text, id, onNoteClick, navigate}: NoteThumbnailProps): JSX.Element {
    return (
        // Later make into
        // <Link to={`../note/${id}`} className="link">
        <div>
            {/* <Link to={`../note`} className="link">
                <span className="thumbnail-click"></span>
            </Link> */}
            <button onClick={() => {
                const body: string = onNoteClick(id);
                navigate("test route" + id, body)
                }} className="folder-link">
                <span className="thumbnail-click"></span>
            </button>
            <div className="thumbnail">
                <div className="thumbnail-body">
                    <p className="thumbnail-text">{text}</p>
                </div>
                <div className="thumbnail-label">
                    <p className="thumbnail-title">{title}</p>
                </div>
            </div>
        </div>
        
    );
}

/**
 * Returns all thumbnails of all the notes in the current folder.
 * 
 * TO-DO: Change to actually use data to return notes from the current folder page.
 */
export default function NoteThumbnails(): JSX.Element {

    const navigate = useNavigate();
    const linkToNote = (route: string, body: string): void => {
        navigate("/note", {state:{route: route, body: body}});
    }

    return (
        <>
            <NoteThumbnail title="Testing" text="blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah " id="123" onNoteClick={doNoteClick} navigate={linkToNote}/>
            <NoteThumbnail title="Testing 2" text="cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus " id="cactus" onNoteClick={doNoteClick} navigate={linkToNote}/>
            <NoteThumbnail title="Testing 3" text="kobayashi yuusuke kobayashi yuusuke kobayashi yuusuke " id="smth" onNoteClick={doNoteClick} navigate={linkToNote}/>
            <NoteThumbnail title="Testing 4" text="kevin zatloukal kevin zatloukal is the best teacher :)" id="ahhh" onNoteClick={doNoteClick} navigate={linkToNote}/>
        </>
    );
}
