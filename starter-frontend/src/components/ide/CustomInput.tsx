import React, { ChangeEvent } from "react";

type CustomInputProps = {
    // TO-DO: change
    customInput: any, 
    setCustomInput: any
}

export default function CustomInput({customInput, setCustomInput}: CustomInputProps): JSX.Element {
    return (
        <textarea
            value={customInput}
            onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setCustomInput(evt.target.value)} 
            placeholder="Custom input"
            className="ide-input"   
        >
        </textarea>
    );
}
