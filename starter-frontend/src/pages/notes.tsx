//@ts-nocheck
import { Form } from "react-router-dom";
import { useState } from 'react';
import TemplateToggleButton from '../components/TemplateToggleButton';
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

    const params: URLSearchParams = new URLSearchParams(window.location.search);
    const search: string | null = params.get("search");

    // TO-DO: Make updateable
    const [isAdvanced, setIsAdvanced] = useState(false);
    
    return (
        <body className="page green-background nav-page">
            <SearchBar isAdvanced={isAdvanced} onAdvance={() => setIsAdvanced(true)} collaboration={false}/>
            <h1>Your <TemplateToggleButton isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} /></h1>
            <div className="nav-area flex">
                <AddNote isMaking={isMaking} onMake={() => setIsMaking(!isMaking)}/>
                <Folders />
                <NoteThumbnails />
                <Create isMaking={isMaking} onMake={() => setIsMaking(!isMaking)} isTemp={isToggled} /*onTemp={() => setIsToggled(!isToggled)}*//>
            </div>
        </body>
    );  
}
