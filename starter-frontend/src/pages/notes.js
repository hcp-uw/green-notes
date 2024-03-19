import { Form } from "react-router-dom";
import { useState } from 'react';
import TemplateToggleButton from '../components/TemplateToggleButton.js';
import AddNote from "../components/AddNote";
import Folders from "../components/Folders";
import NoteThumbnails from "../components/NoteThumbnails";
import SearchBar from "../components/SearchBar";
import Create from "../components/Create";

export default function Notes() {

    // isToggled represents the state of the templates button
    // false is notes, true is templates
    // setIsToggled is used to update the isToggled value
    const [isToggled, setIsToggled] = useState(false);
    // isMaking represents state of whether user is making note.
    // Plan is to add element that only shows up and is clickable when isMaking
    // is true. Clicking on x or outside of pop-up closes the pop-up.
    const [isMaking, setIsMaking] = useState(false);

    return (
        <body className="page green-background nav-page">
            <SearchBar />
            <h1>Your <TemplateToggleButton isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} /></h1>
            <div className="nav-area flex">
                <AddNote isMaking={isMaking} onMake={() => setIsMaking(!isMaking)}/>
                <Folders />
                <NoteThumbnails />
                <Create isMaking={isMaking}/>
            </div>
        </body>
    );  
}
