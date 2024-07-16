import { useState } from 'react';
import NoteThumbnails from "../../components/file-navigation/NoteThumbnails";
import SearchBar from "../../components/file-navigation/SearchBar";
import { ThumbnailInfo } from '../../components/file-navigation/routes';

export default function Collaboration(): JSX.Element {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    const search: string | null = params.get("search");

    // TO-DO: Make updateable
    const [isAdvanced, setIsAdvanced] = useState<boolean>(false);

    const placeholder: ThumbnailInfo[] = [];
    placeholder.push({name: "example", iD: "asdfasdfasdf", kind: "doc"});
    placeholder.push({name: "example again", iD: "qwerqwerqwer", kind: "doc"});
    placeholder.push({name: "It's yet another example", iD: "zxcvzxcvzxcv", kind: "doc"});
    
    return (
        <body className="page green-background nav-page">
            <SearchBar isAdvanced={isAdvanced} onAdvance={() => setIsAdvanced(true)} collaboration={true}/>
            <h1>Notes</h1>
            <div className="nav-area flex">
                <NoteThumbnails data={placeholder}/>
            </div>
        </body>
    );  
}
