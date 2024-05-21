//@ts-nocheck
import { useState } from 'react';
import TemplateToggleButton from '../components/TemplateToggleButton';
import Folders from "../components/Folders";
import NoteThumbnails from "../components/NoteThumbnails";
import SearchBar from "../components/SearchBar";
// Do later

export default function Collaboration() {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    const search: string | null = params.get("search");

    // TO-DO: Make updateable
    const [isAdvanced, setIsAdvanced] = useState(false);
    
    return (
        <body className="page green-background nav-page">
            <SearchBar isAdvanced={isAdvanced} onAdvance={() => setIsAdvanced(true)} collaboration={true}/>
            <h1>Notes</h1>
            <div className="nav-area flex">
                <NoteThumbnails />
            </div>
        </body>
    );  
}
