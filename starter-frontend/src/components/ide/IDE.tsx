import React, { useEffect, useState, MouseEvent } from "react";
import CodeEditor from "./CodeEditor";
import axios from "axios";
import { languageOption, languageOptions } from "./languageOptions";

import useKeyPress from "./useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import LanguagesDropdown from "./LanguagesDropdown";


export default function IDE(): JSX.Element {
    const [code, setCode] = useState<string>("");
    const [customInput, setCustomInput] = useState<string>("");
    const [output, setOutput] = useState<boolean>(false);
    const [outputDetails, setOutputDetails] = useState<string | null>(null);
    const [processing, setProcessing] = useState(null);
    const [language, setLanguage] = useState<languageOption>(languageOptions[0]);
    
    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    function onSelectChange(sl: languageOption | null): void {
        console.log("Selected option ", sl);
        if (sl !== null) {
            setLanguage(sl);
        }
    }

    useEffect(() => {
        if (enterPress && ctrlPress) {
            console.log("enterPress", enterPress);
            console.log("ctrlPress", ctrlPress);
            // handleCompile(); 
        }
    }, [ctrlPress, enterPress]);

    function onChange(action: string, data: string): void {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    }

    function handleCompile(_evt: MouseEvent<HTMLButtonElement>) {

    }

    // async function checkStatus(token): Promise<> {

    // }

    function minimize(_evt: MouseEvent<HTMLButtonElement>): void {
        setOutput(false);
    }
    
    return (
        <>
            <LanguagesDropdown onSelectChange={onSelectChange} />
            <CodeEditor 
                code={code}
                onChange={onChange}
                language={language?.value}
                theme="oceanic-next"
            />
            <button 
                onClick={handleCompile}
                disabled={!code}
                className="compile-btn"
            >
                {processing ? "Processing..." : "Run"}
            </button>
            { output && 
                <>
                    <button 
                        className="minimize-btn"
                        onClick={minimize}
                    ></button>
                    <OutputWindow outputDetails={outputDetails} />
                    <CustomInput 
                        customInput={customInput}
                        setCustomInput={setCustomInput}
                    />
                    {outputDetails && <OutputDetails outputDetails={outputDetails} />}
                </>
            }
            

        </>);
}

function Output(): JSX.Element {
    return (
        <></>
    );
    
}
