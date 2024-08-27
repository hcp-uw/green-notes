
import { ThumbnailInfo } from "./routes";
import { doFolderClick } from "../../pages/notes/notes";

/** Parameters for Folder component */
type FolderProps = {
    /** Name of folder. */
    name: string;

    /** ID of folder (used in link). */
    id: string;

    location: string;

    setLoad: React.Dispatch<React.SetStateAction<boolean>>;

    onFolderClick: (id: string, name: string, location: string, setLoad: React.Dispatch<React.SetStateAction<boolean>>,
         resp: (id: string, route: string, name: string, contents: ThumbnailInfo[]) => void, oldData: Map<string, ThumbnailInfo[]>) => void;

    resp: (id: string, route: string, name: string, contents: ThumbnailInfo[]) => void;

    oldData: Map<string, ThumbnailInfo[]>;
}

/* 
 * Folder displaying name. Click on to navigate to inside the folder.
 * 
 * Parameters:
 * name: name of folder
 * id: id to be used in the link to show what folder to display
 */
function Folder({name, id, location, setLoad, onFolderClick, resp, oldData}: FolderProps): JSX.Element {
    return (
        <div>
            <button onClick={() => onFolderClick(id, name, location, setLoad, resp, oldData)} className="folder-link">
                <span className="thumbnail-click"></span>
            </button>
            <div className="thumbnail">
                <div className="tab"></div>
                <div className="tab-space"></div>
                <div className="folder">
                    <p className="folder-name">{name}</p>
                </div>
            </div>
        </div>
    )
}

/** Parameters for Folders element */
type FoldersProps = {data: ThumbnailInfo[], location: string, setLoad: React.Dispatch<React.SetStateAction<boolean>>, resp: (id: string, route: string, name: string, contents: ThumbnailInfo[]) => void, oldData: Map<string, ThumbnailInfo[]>};
/* 
 * Returns all the folders in the current page. 
 */
export default function Folders({data, location, setLoad, resp, oldData}: FoldersProps): JSX.Element {

    const folders: JSX.Element[] = [];

    for (const thumbnail of data) {
        if (thumbnail.kind === "folder") {
            folders.push(
                <Folder key={thumbnail.iD} name={thumbnail.name} id={thumbnail.iD} onFolderClick={doFolderClick} resp={resp} setLoad={setLoad}
                    location={location} oldData={oldData}/>
            )
        }
    }

    return (
        <>{folders}</>
    );
}