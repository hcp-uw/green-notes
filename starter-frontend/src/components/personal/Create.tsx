import React, { ChangeEvent, MouseEvent } from 'react'
import { useState, useEffect } from 'react';
import '../file-navigation/Navigation.css';
import './Create.css';
import { route, nil, concat, isRecord } from '../file-navigation/routes';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';


/* In general just needs to be cleaned up */

type CreateProps = {
    /** True if make new note/template pop-up is open. */
    isMaking: boolean;
    
    /** Function to update isMaking. */
    onMake: (event: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement>) => void;

    /** True if making template, false if making note. */
    isTemp: boolean; 

    givenPath: route;

    eRoute: string;

    email: string;

}

// There are a lot of comments, most of the commented code exists for the sake of trying
// to create a dropdown for the new: note/template but for simplicity's sake it will remain
// as a simple toggle button. Some comments also extend in notes.js

// TODO: try to make button same size no matter the text and also give it more style
// Also give more style to the big popup box

// Continue to work on pop-up interaction/functionality
// Look into making the ddown actually interactable
const Create = ({ isMaking, onMake, isTemp, givenPath, eRoute, email } : CreateProps): JSX.Element => {

    const [isTempLocal, setIsTemp] = useState<boolean>(isTemp);
    const [currPath, setCurrPath] = useState<string>("");
    const [title, setTitle] = useState<string>("Note");
    const [name, setName] = useState<string>("");

    const navigate = useNavigate();

    const changeName = (evt: ChangeEvent<HTMLInputElement>): void => {
        setName(evt.target.value);
    }

    // Updates pop-up whenever it is shown again
    useEffect(() => {
        let temp: string = "";

        setIsTemp(isTemp);
        let tempPath: route = concat(nil, givenPath);
        if (isTempLocal) {
            setTitle("Template");
        } else {
            setTitle("Note");
        }
        while (tempPath.kind !== "nil") {
            temp = temp + tempPath.hd + "/";
            tempPath = tempPath.tl;
        }

        setCurrPath(temp);

    }, [isMaking, isTemp, givenPath] )

    const doMakeClick = async (givenName: string, route: string): Promise<void> => {
        const trimmed: string = givenName.trim();
        if (trimmed !== "") {
            try {
                const user = auth.currentUser;
                const token = user && (await user.getIdToken());

                const body = {
                    route: route,
                    name: givenName
                }
          
                const payloadHeader = {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  method: "POST",
                  body: JSON.stringify(body)
                };
        
          
                // Fetches the /getFolderContents. The string in the encodeURIComponent is the route
                // and the payload header is necessary stuff for server authentication
                fetch("http://localhost:3001/createNote", payloadHeader)
                    .then((res) => {
                        res.json().then((val) => createResponse(val, route))
                          .catch(() => console.error("error fetching /createNote: 200 response"))
                    })
                    .catch(() => console.error("Error fetching /createNote: Failed to connect to server"));
                
        
              } catch (e) {
                console.log(e);
              }
        }
    }

    const createResponse = (data: unknown, route: string): void => {
        if (!isRecord(data)) {
            console.error('Invalid JSON from /createNote', data);
            return;
        }
        console.log(data.JSON);
        if (typeof data.id !== "string") {
            console.error('Invalid id given from /createNote', data.id);
            return;
        }

        navigate("/note?route="+encodeURIComponent(route+"/"+data.id));
    }

    if (!isMaking) {
        return <></>;
    } else {
        return  (
            <div>
                <label className="backdrop">
                    <input type="checkbox" checked={isMaking} onChange={onMake}/>
                </label>
                <div className="make">
                    <p className="make-header">Make New {title}</p>
                    <button className="make-exit" onClick={onMake}>X</button>
                    {/* <div className="maketxt-wrap">
                        <p className="make-text">New: </p>
                            <button className="make-ddown-btn" onClick={() => setIsTemp(!isTempLocal)}>
                                <DdownBut isTempLocal={isTempLocal}/>
                            </button>
                    </div> */}
                    <div className="maketxt-wrap">
                        <p className="make-text">Location: {currPath}</p>
                    </div>
                    <div className="maketxt-wrap">
                        <p className="make-text">Name:</p>
                        <input type="text" value={name} onChange={changeName}></input>
                    </div>
                    <div className="maketxt-wrap">
                        <p className="make-text">Create: </p>
                        <button onClick={() => {
                            if (isTemp) {
                                doMakeClick(name, "Users/"+email+"/Templates");
                            } else {
                                doMakeClick(name, eRoute)
                            }
                            
                            }}>
                            WE PRAY
                        </button>
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
