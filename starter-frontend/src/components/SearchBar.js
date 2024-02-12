import searchIcon from '../assets/search-icon.svg';

function SearchIcon() {
    return (
        <img src={searchIcon} className="search-icon"/>
    );
}

function Search() {
    return (
        <input type="text" className="search-text" placeholder="Search notes and templates" />
    );
}

export default function SearchBar() {
    return (
        <div className="search-bar flex">
            <SearchIcon />
            <Search />
        </div>
    );
}
