import { Link } from 'react-router-dom';

type NoteThumbnailProps = {
    /** Title of note. */
    title: string;

    /** Beginning text of note. */
    text: string;

    /** ID of note (used in link). */
    id: string;
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
function NoteThumbnail({title, text, id}: NoteThumbnailProps): JSX.Element {
    return (
        // Later make into
        // <Link to={`../note/${id}`} className="link">
        <div>
            <Link to={`../note`} className="link">
                <span className="thumbnail-click"></span>
            </Link>
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
    return (
        <>
            <NoteThumbnail title="Testing" text="blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah " id="123" />
            <NoteThumbnail title="Testing 2" text="cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus " id="cactus" />
            <NoteThumbnail title="Testing 3" text="kobayashi yuusuke kobayashi yuusuke kobayashi yuusuke " id="smth" />
            <NoteThumbnail title="Testing 4" text="kevin zatloukal kevin zatloukal is the best teacher :)" id="ahhh" />
        </>
    );
}
