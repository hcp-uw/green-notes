//@ts-nocheck
import searchIcon from '../assets/search-icon.svg';



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
        <input className="search-text" type="text" name="search" placeholder="Search notes and templates" autocomplete="off" />
    );
}

function AdvancedSearch( { isAdvanced } ): JSX.Element {
    if (isAdvanced) {
        return (
            <div className="advanced-search">
                <div className="search-line search-full"><p className="search-field">Tags <input className="search-box" type="text" name="tags"autocomplete="off" ></input></p></div>
                <div className="search-line flex">
                    <div className="search-half"><p className="search-field search-half">Author <input className="search-box" type="text" name="author"autocomplete="off" ></input></p></div>
                    <div className="search-half"><p className="search-field search-half">Class <input className="search-box" type="text" name="class"autocomplete="off" ></input></p></div>    
                </div>
                <div className="search-line flex">
                    <div className="search-half"><p className="search-field search-half">Teacher <input className="search-box" type="text" name="teacher"autocomplete="off" ></input></p></div>
                    <div className="search-half"><p className="search-field search-half">Quarter 
                        <select className="search-box" name="season">
                            <option value="autumn">Autumn</option>
                            <option value="winter">Winter</option>
                            <option value="spring">Spring</option>
                            <option value="summer">Summer</option>
                        </select>
                        <input className="search-box" type="number" name="year" min="1861" max="2050" autocomplete="off" ></input>
                    </p></div>
                </div>
                <input className="submit-button" type="submit" value="Search"></input>
            </div>
        );
    } 
}

/**
 * Returns the whole search bar.
 */
export default function SearchBar({isAdvanced}) {
    return (
        <form action="/notes">
            <AdvancedSearch isAdvanced={isAdvanced}/>
            <div className="search-bar flex">
                <SearchIcon />
                <MainSearch />
            </div>
        </form>
    );
}
