import { useState } from 'react';
import TemplateToggleButton from '../../components/personal/TemplateToggleButton';
import AddNote from "../../components/personal/AddNote";
import Folders from "../../components/file-navigation/Folders";
import NoteThumbnails from "../../components/file-navigation/NoteThumbnails";
import SearchBar from "../../components/file-navigation/SearchBar";
import Create from "../../components/personal/Create";
import { auth } from "../../config/firebase";
import { route, nil, cons } from '../../components/file-navigation/routes';

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

    // Keeps track of folder route user is in
    const [currRoute, setCurrRoute] = useState<route>(nil);

    // Starts empty since we haven't checked what user id they are yet.
    const [currLocation, setcurrLocation] = useState<string>("");

    // Gets user object from auth in order to get user info
    const user = auth.currentUser;
    if (user) { // If user is logged in
        if (user.email === null) { // if user doesn't have email (shouldn't be possible)
            return<p>error</p>
        }
    } else { // If user isn't logged in (should be impossible on this page)
        return<p>error</p>
    }

    /* TODO:
        Make a way to store server side data for contents in folders
        so we don't need to make a new call every single time someone
        clicks on a folder, only when they click on the folder for 
        the first time in the window.
        
        Perhaps use a map with strings as the keys and jsx.element arrays
        as the locations and use "current location" as a way find it.
        "current location" would be in "home/folder/folder" format to ensure
        that it still works even if there are several folders with the same name
        in different places. There cant be 2 folders of the same name in the
        same location*/


    if (currLocation === "") { // If user isn't in a folder ** folder functionality hasn't been implemented yet
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
    } else { // If user is in a folder
        return (
            <body className="page green-background nav-page">
                <SearchBar isAdvanced={isAdvanced} onAdvance={() => setIsAdvanced(true)} collaboration={false}/>
                <PreviousFolder name={currLocation}></PreviousFolder>
                <div className="nav-area flex">
                    <AddNote isMaking={isMaking} onMake={() => setIsMaking(!isMaking)}/>
                    <Folders />
                    <NoteThumbnails />
                    <Create isMaking={isMaking} onMake={() => setIsMaking(!isMaking)} isTemp={isToggled} /*onTemp={() => setIsToggled(!isToggled)}*//>
                </div>
            </body>
        );  
    }
};

type PreviousFolderProps = {name: string};
// Back button for when in folder
const PreviousFolder = ({name}: PreviousFolderProps): JSX.Element => {
    return(
        <div>
            <button>&lt; {name}</button>
        </div>
    )
};

// Method to be called to grab folder contents from server
const getFolderContents = (name: string): JSX.Element[] => {
    const data: JSX.Element[] = [];
    // make call to server to grab folder contents.
    // What we need: folders (collections) and doc names and ids all
    //              within given folder name.
    // We give: folder id and full route
    return [];
};

const onFolderClick = (iD: string): void => {
    // call getFolderContents and update the current states to
    // show the proper things
}