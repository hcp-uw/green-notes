import { useEffect, useState } from 'react';
import NoteThumbnails from "../../components/file-navigation/NoteThumbnails";
import SearchBar from "../../components/file-navigation/SearchBar";
import { ThumbnailInfo } from '../../components/file-navigation/routes';
import { auth } from '../../config/firebase';
import { isRecord, FetchRoute } from '../../components/file-navigation/routes';

/** Collaboration/Public Notes page */
export default function Collaboration(): JSX.Element {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    const search: string | null = params.get("search");
    const yearString: string | null = params.get("year");
    const quarter: string | null = params.get("season");
    const teacher: string | null = params.get("teacher");
    const className: string | null = params.get("class");
    const tags: string | null = params.get("tags");

    // Searchbar dropdown state
    const [isAdvanced, setIsAdvanced] = useState<boolean>(false);

    // Loading state
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Current displayed content
    const [currNotes, setCurrNotes] = useState<ThumbnailInfo[]>([]);

   // Initial load to get shared notes
    useEffect(() => {
        getNotes();
    }, [])

    /** Method which fetches server for public notes based on
     * the current states representing search parameters
     */
    const getNotes = async (): Promise<void> => {
        try {
            const user = auth.currentUser;
            const token = user && (await user.getIdToken());
      
            const payloadHeader = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              method: "GET"
            };

            let tagsChecked: string;
            if (tags === null) {
                tagsChecked = "";
            } else {
                tagsChecked = tags.trim();
            }

            let classChecked: string;
            if (className === null) {
                classChecked = "";
            } else {
                classChecked = className.trim();
            }

            let teacherChecked: string;
            if (teacher === null) {
                teacherChecked = "";
            } else {
                teacherChecked = teacher.trim();
            }

            let quarterChecked: string;
            if (quarter === null) {
                quarterChecked = "";
            } else {
                quarterChecked = quarter;
            }

            let yearChecked: number;
            if (yearString === null || isNaN(parseInt(yearString))) {
                yearChecked = 0;
            } else {
                yearChecked = parseInt(yearString);
            }

            let searchChecked: string;
            if (search === null) {
                searchChecked = "";
            } else {
                searchChecked = search.trim();
            }

            let route: string = FetchRoute+"/getShared?";
            route += "&tags="+encodeURIComponent(tagsChecked);
            route += "&class="+encodeURIComponent(classChecked);
            route += "&teacher="+encodeURIComponent(teacherChecked);
            route += "&quarter="+encodeURIComponent(quarterChecked);
            route += "&year="+encodeURIComponent(yearChecked);
            route += "&name="+encodeURIComponent(searchChecked);
      
            fetch(route, payloadHeader)
                .then((res) => {
                    if (res.status === 200) {
                        res.json().then((val) => fetchResponse(val))
                            .catch(() => console.error("Error fetching /getShared: 200 response is not JSON"))
                    } else {
                        console.error(`Error fetching /getShared: bad status code ${res.status}`)
                    }
                })
                .catch(() => console.error("Error fetching /getShared: Failed to connect to server"));
            
    
          } catch (e) {
            console.log(e);
          }
    }

    /** Parses and updates state with given server response */
    const fetchResponse = (val: unknown): void => {
        if (!isRecord(val) || !Array.isArray(val.data)) {
            console.error('Invalid JSON from /getFolderContents', val);
            return;
        }

        const docs: ThumbnailInfo[] = [];

        for (const info of val.data) {

            if (typeof info.name !== "string") {
                console.error('Invalid JSON from /getFolderContents', info.name);
                return;
            }
    
            if (typeof info.iD !== "string") {
                console.error('Invalid JSON from /getFolderContents', info.iD);
                return;
            }
    
            if (info.kind !== "doc") {
                console.error('Invalid JSON from /getFolderContents', info.iD);
                return;
            }
    
            if (typeof info.content !== "string") {
                console.error('Invalid JSON from /getFolderContents', info.content);
                return;
            }
    
            const temp: ThumbnailInfo = {name: info.name, iD: info.iD, kind: info.kind, content: info.content};
            docs.push(temp);
        }

        setCurrNotes(docs);
        setIsLoading(false);
    }

    

    if (isLoading) { // If the page is loading
        return (
            <div className="page green-background nav-page">
            <SearchBar isAdvanced={isAdvanced} setIsAdvanced={setIsAdvanced} collaboration={true}/>
            <h2>Public Notes</h2>
            <div className="nav-area flex">
                <h1>Loading...</h1>
            </div>
        </div>
        )
    } else if (currNotes.length === 0) { // If no notes show up
        return (
            <div className="page green-background nav-page">
                <SearchBar isAdvanced={isAdvanced} setIsAdvanced={setIsAdvanced} collaboration={true}/>
                <h2>Public Notes</h2>
                <div className="nav-area flex">
                    <p>Nothing matched your search. Maybe try with less or different search parameters. Capitalization doesn't matter but spelling does!</p>
                </div>
            </div>
        );  
    } else {
        return (
            <div className="page green-background nav-page">
                <SearchBar isAdvanced={isAdvanced} setIsAdvanced={setIsAdvanced} collaboration={true}/>
                <h2>Public Notes</h2>
                <div className="nav-area flex">
                    <NoteThumbnails data={currNotes} location={"Shared"}  areTemps={false}  email="temp"/>
                </div>
            </div>
        );  
    }
}
