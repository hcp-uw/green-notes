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
function Search() {
    return (
        <input type="text" className="search-text" placeholder="Search notes and templates" />
    );
}

/**
 * Returns the whole search bar.
 */
export default function SearchBar() {
    return (
        <div className="search-bar flex">
            <SearchIcon />
            <Search />
        </div>
    );
}
