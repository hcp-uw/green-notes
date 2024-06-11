import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type FolderInfo = {
    /** Name of folder */
    name: string, 

    /** id to be used in the link to show what folder to display */
    id: string
}

type FoldersProps = {
    
}

type FoldersState = {

}

/* 
 * Returns all the folders in the current page. 
 * 
 * TO-DO: Use actual data from the server to return the folders inside the current page folder.
 */
export default class Folders extends Component<FoldersProps, FoldersState> {
    
    constructor(props: FoldersProps) {
        super(props);

        this.state = {};
    }
    
    render = (): JSX.Element => {
        return (
            <>
                {this.renderFolder({name: "Testing", id: "test"})}
                {this.renderFolder({name: "Testing 2", id: "kdsj;f"})}
                {this.renderFolder({name: "Testing 3", id: "dkafj;sd"})}
            </>
        );
    };


    /* 
    * Folder displaying name. Click on to navigate to inside the folder.
    * 
    * Parameters:
    * name: name of folder
    * id: id to be used in the link to show what folder to display
    */
    renderFolder = ( info: FolderInfo ): JSX.Element => {
        return (
            <div>
                <Link to={`/notes/${info.id}`} className="link">
                    <span className="thumbnail-click"></span>
                </Link>
                <div className="thumbnail">
                    <div className="tab"></div>
                    <div className="tab-space"></div>
                    <div className="folder">
                        <p className="folder-name">{info.name}</p>
                    </div>
                </div>
            </div>
        );
    };
}
