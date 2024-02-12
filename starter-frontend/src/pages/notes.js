import { Form } from "react-router-dom";
import AddNote from "../components/AddNote";
import Folders from "../components/Folders";
import NoteThumbnails from "../components/NoteThumbnails";
import SearchBar from "../components/SearchBar";

export default function Notes() {
    return (
        <body className="page green-background nav-page">
            <SearchBar />
            <h1>Your Notes</h1>
            <div className="nav-area flex">
                <AddNote />
                <Folders />
                <NoteThumbnails />
            </div>
        </body>
    );  
}
