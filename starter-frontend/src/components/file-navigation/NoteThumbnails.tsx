import { useNavigate } from 'react-router-dom';
import { ThumbnailInfo } from './routes';


type NoteThumbnailProps = {
    /** Title of note. */
    title: string;

    /** Beginning text of note. */
    text: string;

    /** ID of note (used in link). */
    route: string;

    navigate: (route: string) => void;
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
function NoteThumbnail({title, text, route, navigate}: NoteThumbnailProps): JSX.Element {
    return (
        // Later make into
        // <Link to={`../note/${id}`} className="link">
        <div>
            {/* <Link to={`../note`} className="link">
                <span className="thumbnail-click"></span>
            </Link> */}
            <button onClick={() => navigate(route)}className="folder-link">
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

type NotesProps = {data: ThumbnailInfo[], location: string}

/**
 * currently thumbnail.iD IS NOT THE SAME AS THE ROUTE!!!!!
 * be sure to fix!!!
 */
export default function NoteThumbnails({data, location}: NotesProps): JSX.Element {

    const navigate = useNavigate();
    const linkToNote = (route: string): void => {
        navigate("/note?route=" + encodeURIComponent(route))
    };

    const notes: JSX.Element[] = [];
    for (const thumbnail of data) {
        if (thumbnail.kind === "doc") {
            notes.push(
                <NoteThumbnail title={thumbnail.name} route={location+"/"+thumbnail.iD} 
                  text="blah blah placeholder text worry about this later"
                  navigate={linkToNote} key={thumbnail.iD}/>
            )
            console.log(location+"/"+thumbnail.iD)
        }
    }

    return (
        // <>
        //     <NoteThumbnail title="Testing" text="blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah " route="123" onNoteClick={doNoteClick} navigate={linkToNote}/>
        //     <NoteThumbnail title="Testing 2" text="cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus " route="cactus" onNoteClick={doNoteClick} navigate={linkToNote}/>
        //     <NoteThumbnail title="Testing 3" text="kobayashi yuusuke kobayashi yuusuke kobayashi yuusuke " route="smth" onNoteClick={doNoteClick} navigate={linkToNote}/>
        //     <NoteThumbnail title="Testing 4" text="kevin zatloukal kevin zatloukal is the best teacher :)" route="ahhh" onNoteClick={doNoteClick} navigate={linkToNote}/>
        // </>
        <>{notes}</>
    );
}
