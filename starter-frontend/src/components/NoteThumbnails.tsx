import { Component } from 'react';
import { Link } from 'react-router-dom';

type NoteThumbnailsProps = {
    
};

type NoteThumbnailsState = {
    
};

type NoteThumbnailInfo = {
    /** Title of note */
    title: string;

    /** First part of note, no formatting, in order to display in thumbnail */
    text: string;

    /** ID of note */
    id: string;
};

/**
 * Returns all thumbnails of all the notes in the current folder.
 * 
 * TO-DO: Change to actually use data to return notes from the current folder page.
 */
export default class NoteThumbnails extends Component<NoteThumbnailsProps, NoteThumbnailsState> {
    
    constructor(props: NoteThumbnailsProps) {
        super(props); 

        this.state = {};
    }
    

    render = (): JSX.Element => {
        return (
            <>
                {this.renderNoteThumbnail({ title: "Testing", text: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ", id: "123" })}
                {this.renderNoteThumbnail({ title: "Testing 2", text: "cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus ", id: "cactus" })}
                {this.renderNoteThumbnail({ title: "Testing 3", text: "kobayashi yuusuke kobayashi yuusuke kobayashi yuusuke ", id: "smth" })}
                {this.renderNoteThumbnail({ title: "Testing 4", text: "kevin zatloukal kevin zatloukal is the best teacher :)", id: "ahhh" })}
            </>
        );
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
   renderNoteThumbnail(info: NoteThumbnailInfo) {
       return (
           // Later make into
           // <Link to={`../note/${info.id}`} className="link">
           <div>
               <Link to={`../note`} className="link">
                   <span className="thumbnail-click"></span>
               </Link>
               <div className="thumbnail">
                   <div className="thumbnail-body">
                       <p className="thumbnail-text">{info.text}</p>
                   </div>
                   <div className="thumbnail-label">
                       <p className="thumbnail-title">{info.title}</p>
                   </div>
               </div>
           </div>
       );
   };
}
