import { useState } from 'react';
import TemplateToggleButton from '../../components/personal/TemplateToggleButton';
import AddNote from "../../components/personal/AddNote";
import Folders from "../../components/file-navigation/Folders";
import NoteThumbnails from "../../components/file-navigation/NoteThumbnails";
import SearchBar from "../../components/file-navigation/SearchBar";
import Create from "../../components/personal/Create";

export default function Notes(): JSX.Element {

    // isToggled represents the state of the templates button
    // false is notes, true is templates
    // setIsToggled is used to update the isToggled value
    const [isToggled, setIsToggled] = useState<boolean>(false);
    // isMaking represents state of whether user is making note.
    // Plan is to add element that only shows up and is clickable when isMaking
    // is true. Clicking on x or outside of pop-up closes the pop-up.
    const [isMaking, setIsMaking] = useState<boolean>(false);

    const params: URLSearchParams = new URLSearchParams(window.location.search);
    const search: string | null = params.get("search");

    // TO-DO: Make updateable
    const [isAdvanced, setIsAdvanced] = useState<boolean>(false);
    
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
