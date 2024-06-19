import React, { ChangeEvent, MouseEvent } from 'react'
import { useState } from 'react';
import './Navigation.css'
import './Create.css'

type CreateProps = {
    /** True if make new note/template pop-up is open. */
    isMaking: boolean;
    
    /** Function to update isMaking. */
    onMake: (event: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement>) => void;

    /** True if making template, false if making note. */
    isTemp: boolean; 
}

// There are a lot of comments, most of the commented code exists for the sake of trying
// to create a dropdown for the new: note/template but for simplicity's sake it will remain
// as a simple toggle button. Some comments also extend in notes.js

// TODO: try to make button same size no matter the text and also give it more style
// Also give more style to the big popup box

// Continue to work on pop-up interaction/functionality
// Look into making the ddown actually interactable
const Create = ({ isMaking, onMake, isTemp/*, onTemp*/ } : CreateProps): JSX.Element => {

    const [isTempLocal, setIsTemp] = useState<boolean>(false);

    if (!isMaking) {
        return <></>;
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
                        {/* <div className="dropdown-wrap"> */}
                            <button className="make-ddown-btn" onClick={() => setIsTemp(!isTempLocal)}>
                                <DdownBut isTempLocal={isTempLocal}/>
                            </button>
                            {/* <DdownContent isTempLocal={isTempLocal} onTemp={() => setIsTemp(!isTempLocal)}/> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

const DdownBut = ({ isTempLocal }: {isTempLocal: boolean}): JSX.Element => {
    if (!isTempLocal) {
        return (
            <div>
                Note {/* Note <span className="d-arrow">▼</span> */}
            </div>
        )
    } else {
        return (
            <div>
                Template {/* Template <span className="d-arrow">▼</span> */}
            </div>
        )
    }
}

// const DdownContent = ({ isTempLocal, onTemp }) => {
//     if (!isTempLocal) {
//         return (
//             <button onClick={onTemp} className="dropdown-content ddown-temp">
//                 Template
//             </button>
//         )
//     } else {
//             <button onClick={onTemp} className="dropdown-content ddown-temp">
//                 Note
//             </button>
//     }
// }

export default Create;
