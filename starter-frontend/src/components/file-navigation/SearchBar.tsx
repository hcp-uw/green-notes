import searchIcon from '../../assets/search-icon.svg';

type AdvancedSearchProps = {
    /** True if advanced search bar is open. */
    isAdvanced: boolean;

    /** True if search bar for collaboration page, false if search bar for notes page. */
    collaboration: boolean;
};

type SearchBarProps = {
    /** True if advanced search bar is open. */
    isAdvanced: boolean;

    /** Updates isAdvanced. */
    onAdvance: () => void;

    /** True if search bar for collaboration page, false if search bar for notes page. */
    collaboration: boolean;
};

// type SearchBarState = {
//     isAdvanced: boolean;

//     // TO-DO: add states for all fields
// };

/**
 * Magnifying glass icon.
 */
function SearchIcon() {
    return (
        <img src={searchIcon} className="search-icon"/>
    );
}

/**
 * Part of the search bar where you actually input text.
 * 
 * TO-DO: 
 *  - Make functional.
 *  - Add advanced search bar pop-up.
 */
function MainSearch() {
    return (
        <input className="search-text" type="text" name="search" placeholder="Search notes and templates" autoComplete="off" />
    );
}

function AdvancedSearch( { isAdvanced, collaboration } : AdvancedSearchProps ): JSX.Element {
    if (isAdvanced) {
        return (
            <div className="advanced-search">
                <div className="search-line search-full flex-hor">
                    <p className="search-field">Tags </p>
                    <input className="search-box" type="text" name="tags"autoComplete="off" ></input>
                </div>
                <div className="search-line flex-hor">  
                    <div className="search-half flex-hor">
                        <p className="search-field">Class </p>
                        <input className="search-box" type="text" name="class"autoComplete="off" ></input>
                    </div>  
                    <div className="search-half flex-hor">
                        <p className="search-field">Teacher </p>
                        <input className="search-box" type="text" name="teacher"autoComplete="off" ></input>
                    </div>  
                </div>
                {LastRow(collaboration)}
                <div className="search-line search-full flex-hor">
                    <input className="search-box submit-button" type="submit" value="Search"></input>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}

function LastRow(collaboration: boolean): JSX.Element {
    if (collaboration) {
        return (
            // change later
            <div className="search-line flex-hor">
                <div className="search-half flex-hor">
                    <p className="search-field">Quarter </p>
                    <select className="search-box" name="season">
                        <option value="autumn">Autumn</option>
                        <option value="winter">Winter</option>
                        <option value="spring">Spring</option>
                        <option value="summer">Summer</option>
                    </select>
                </div>
                <div className="search-half flex-hor">
                    <p className="search-field" >Year</p>
                    <input className="search-box" type="number" name="year" min="1861" max="2050" autoComplete="off"></input> 
                </div>
            </div>
        );
    } else {
        return (
            <div className="search-line flex-hor">
                <div className="search-half flex-hor">
                    <p className="search-field">Quarter </p>
                    <select className="search-box" name="season">
                        <option value="autumn">Autumn</option>
                        <option value="winter">Winter</option>
                        <option value="spring">Spring</option>
                        <option value="summer">Summer</option>
                    </select>
                </div>
                <div className="search-half flex-hor">
                    <p className="search-field" >Year</p>
                    <input className="search-box" type="number" name="year" min="1861" max="2050" autoComplete="off"></input> 
                </div>
            </div>
        );
    }
}

/**
 * Returns the whole search bar.
 */
export default function SearchBar({isAdvanced, onAdvance, collaboration} : SearchBarProps) {
    return (
        <form action="/notes">
            <AdvancedSearch isAdvanced={isAdvanced} collaboration={collaboration}/>
            <div className="search-bar flex" onClick={onAdvance}>
                <SearchIcon />
                <MainSearch />
            </div>
        </form>
    );
}
