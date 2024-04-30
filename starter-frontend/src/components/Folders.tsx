//@ts-nocheck
import { Link } from 'react-router-dom';

/* 
 * Folder displaying name. Click on to navigate to inside the folder.
 * 
 * Parameters:
 * name: name of folder
 * id: id to be used in the link to show what folder to display
 */
function Folder( {name, id}) {
    return (
        <div>
            <Link to={`/notes/${id}`} className="link">
                <span className="thumbnail-click"></span>
            </Link>
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

/* 
 * Returns all the folders in the current page. 
 * 
 * TO-DO: Use actual data from the server to return the folders inside the current page folder.
 */
export default function Folders() {
    return (
        <>
            <Folder name="Testing" id="test"/>
            <Folder name="Testing 2" id="kdsj;f"/>
            <Folder name="Testing 3" id="dkafj;sd"/>
        </>
    );
}
