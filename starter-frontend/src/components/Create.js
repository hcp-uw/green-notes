import React from 'react'
import './Navigation.css'

// make actual pop up and figure out how to do background.
// just create a stand-in popup
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
                    test text
                </div>
            </div>
        )
    }
}



export default Create;