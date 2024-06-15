//@ts-nocheck
import React from 'react';
import { useState } from 'react';
import './Navigation.css';
import './Create.css';

import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../config/firebase';


// There are a lot of comments, most of the commented code exists for the sake of trying
// to create a dropdown for the new: note/template but for simplicity's sake it will remain
// as a simple toggle button. Some comments also extend in notes.js

// TODO: try to make button same size no matter the text and also give it more style
// Also give more style to the big popup box

// Continue to work on pop-up interaction/functionality
// Look into making the ddown actually interactable
const Create = ({ isMaking, onMake/*, isTemp, onTemp*/ }) => {

    const [isTempLocal, setIsTemp] = useState(false);

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
                        {/* <div className="dropdown-wrap"> */}
                            <button className="make-ddown-btn" onClick={() => setIsTemp(!isTempLocal)}>
                                <DdownBut isTempLocal={isTempLocal}/>
                            </button>
                            {/* <DdownContent isTempLocal={isTempLocal} onTemp={() => setIsTemp(!isTempLocal)}/> */}
                        {/* </div> */}
                    </div>
                    <div className="maketxt-wrap">
                        <p className="make-text">Create: </p>
                        <button onClick={() => test()}>
                            WE PRAY
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const DdownBut = ({ isTempLocal }) => {
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

// *** Example function for adding with the database! *** //
// Consider having this in front end or writing this for backend
// Probably makes sense to move to back end to be able to properly authenticate
// Also maybe allows us to make it more difficult for clients to do annoying things
// Look at docs for more info and commands, but plan to move to backend
async function test() {
    console.log("clicked!");
    try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
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
