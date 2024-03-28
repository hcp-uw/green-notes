import React from 'react'
import './Navigation.css'

// Continue to work on pop-up interaction/functionality
// Look into making the ddown actually interactable
const Create = ({ isMaking, onMake }) => {

    if (!isMaking) {
        return null;
    } else {
        return  (
            <div>
                <label className="backdrop">
                    <input type="checkbox" checked={isMaking} onChange={onMake}/>
                </label>
                <div className="make">
                    <p className="make-header">Make New Note/Template</p>
                    <button className="make-exit" onClick={onMake}>X</button>
                    <div className="maketxt-wrap">
                        <p className="make-text">New: </p>
                        <div className="dropdown-wrap">
                            <button className="make-ddown-btn">
                                Note <span className="d-arrow">▼</span>
                            </button>
                            <button className="dropdown-content ddown-temp">Template<span className="d-arrow">▼</span></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Create;