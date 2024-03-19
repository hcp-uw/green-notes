import React from 'react'

// make actual pop up and figure out how to do background.
// just create a stand-in popup
const Create = ({isMaking}) => {

    if (!isMaking) {
        return null;
    } else {
        return  (
            <p1>test text</p1>
        )
    }
}



export default Create;