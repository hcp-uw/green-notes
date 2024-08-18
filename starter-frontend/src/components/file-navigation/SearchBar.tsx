import { useState } from 'react';
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
    setIsAdvanced: React.Dispatch<React.SetStateAction<boolean>>

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

type MainSearchProps = {
    setIsAdvanced: React.Dispatch<React.SetStateAction<boolean>>;
    isAdvanced: boolean;
}

function MainSearch({setIsAdvanced, isAdvanced}: MainSearchProps) {

    const [readyToLeave, setReadyToLeave] = useState<boolean>(false);

    const doFocusUpdate = () => {
        setReadyToLeave(false);
    }

    const doClick = () => {
        if (!isAdvanced) {
            setIsAdvanced(true);
            setReadyToLeave(true);
        } else {
            if(readyToLeave) {
                setIsAdvanced(false);
            } else {
                setReadyToLeave(true);
            }
        }
    }

    
    return (
        <input className="search-text" type="text" name="search" placeholder="Search notes and templates" autoComplete="off" 
        onFocus={() => doFocusUpdate()} onClick={() => doClick()} onBlur={() => setReadyToLeave(false)}/>
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
                    {/* <button className="search-box submit-button"></button> */}
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
                    <select className="search-box quarter-dropdown" name="season">
                        <option value=""></option>
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
export default function SearchBar({isAdvanced, setIsAdvanced, collaboration} : SearchBarProps) {
    return (
        <form action="./#/collaboration" >
            <AdvancedSearch isAdvanced={isAdvanced} collaboration={collaboration}/>
            <div className="search-bar flex">
                <SearchIcon />
                <MainSearch  setIsAdvanced={setIsAdvanced} isAdvanced={isAdvanced}/>
            </div>
        </form>
    );
}
