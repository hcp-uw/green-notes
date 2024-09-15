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

    tags: string[];

    showTags: boolean;
}

/**
 * Note thumbnail that displays beginning of note text and title.
 *  - title: title of note
 *  - text: text of note
 *  - id: id of note (used for link)
 */
function NoteThumbnail({title, text, route, navigate, tags, showTags}: NoteThumbnailProps): JSX.Element {

    const tagElement: JSX.Element[] = [];
    for (let i = 0; i < tags.length; i++) {
        tagElement.push(
            <div className="" key={tags[i]} >- {tags[i]} </div>
        )
    }
    

    if (showTags) {
        if (tagElement.length === 0) {
            return (
                <div>
                    <button onClick={() => navigate(route)}className="folder-link">
                        <span className="thumbnail-click"></span>
                    </button>
                    <div className="thumbnail">
                        <div className="thumbnail-body">
                            {/* <div className="thumbnail-text" dangerouslySetInnerHTML={{__html: text}}></div> */}
                            <div className="">
                                No Tags
                            </div>
                        </div>
                        <div className="thumbnail-label">
                            <p className="thumbnail-title">{title}</p>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <button onClick={() => navigate(route)}className="folder-link">
                    <span className="thumbnail-click"></span>
                </button>
                <div className="thumbnail">
                    <div className="thumbnail-body">
                        {/* <div className="thumbnail-text" dangerouslySetInnerHTML={{__html: text}}></div> */}
                        <div className="">
                            {tagElement}
                        </div>
                    </div>
                    <div className="thumbnail-label">
                        <p className="thumbnail-title">{title}</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <button onClick={() => navigate(route)}className="folder-link">
                <span className="thumbnail-click"></span>
            </button>
            <div className="thumbnail">
                <div className="thumbnail-body">
                    {/* <div className="thumbnail-text" dangerouslySetInnerHTML={{__html: text}}></div> */}
                    <div className="" dangerouslySetInnerHTML={{__html: text}}></div>
                </div>
                <div className="thumbnail-label">
                    <p className="thumbnail-title">{title}</p>
                </div>
            </div>
        </div>
        
    );
}

/** Parameters for Note Thumbnails element */
type NotesProps = {data: ThumbnailInfo[], location: string, areTemps: boolean, email: string, tags?: string[][], show?: boolean}

/** Element which displays thumbnails for notes */
export default function NoteThumbnails({data, location, areTemps, email, tags, show}: NotesProps): JSX.Element {

    const navigate = useNavigate();
    const linkToNote = (route: string): void => {

        navigate("/note", {state: {route: route}})
    };

    const notes: JSX.Element[] = [];
    let showTag: boolean | undefined = show;
    if (showTag === undefined) {
        showTag = false;
    }

    for (let i = 0; i < data.length; i++) {
        const thumbnail: ThumbnailInfo = data[i];
        let tempTags: string[] = [];
        if (tags !== undefined) {
            tempTags = tags[i]
        }
        if (thumbnail.kind === "doc") {
            if (areTemps) {
                notes.push(<NoteThumbnail title={thumbnail.name} route={"Users/"+email+"/Templates/"+thumbnail.iD} 
                      text={thumbnail.content} tags={tempTags} showTags={showTag}
                      navigate={linkToNote} key={thumbnail.iD}/>)
            } else {
                notes.push(
                    <NoteThumbnail title={thumbnail.name} route={location+"/"+thumbnail.iD} 
                      text={thumbnail.content} tags={tempTags} showTags={showTag}
                      navigate={linkToNote} key={thumbnail.iD}/>
                )
            }
        }
    }
    // for (const thumbnail of data) {
    //     if (thumbnail.kind === "doc") {
    //         if (areTemps) {
    //             notes.push(<NoteThumbnail title={thumbnail.name} route={"Users/"+email+"/Templates/"+thumbnail.iD} 
    //                   text={thumbnail.content} tags={tags}
    //                   navigate={linkToNote} key={thumbnail.iD}/>)
    //         } else {
    //             notes.push(
    //                 <NoteThumbnail title={thumbnail.name} route={location+"/"+thumbnail.iD} 
    //                   text={thumbnail.content} tags={tags}
    //                   navigate={linkToNote} key={thumbnail.iD}/>
    //             )
    //         }
    //     }
    // }

    return (
        <>{notes}</>
    );
}
