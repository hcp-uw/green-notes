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
    const [processing, setProcessing] = useState<boolean | null>(null);
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
        setProcessing(true);
        const formData = {
            language_id: language.id, 
            source_code: btoa(code), 
            stdin: btoa(customInput)
        };
        const options = {
            method: "POST", 
            url: process.env.REACT_APP_RAPID_API_URL, 
            params: { base64_encoded: "true", fields: "*" }, 
            headers: {
                "content-type": "application/json", 
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST, 
            }, 
            data: formData
        };

        axios 
            .request(options)
            .then(function (response) {
                console.log("res.data", response.data);
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                setProcessing(false);
                console.log(error);
            });
    };

    // TO-DO: change types
    async function checkStatus(token: string): Promise<any> {
        const options = {
            method: "GET", 
            url: process.env.REACT_APP_RAPID_API_URL + "/" + token, 
            params: { base64_encoded: "true", fields: "*" }, 
            headers: {
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST
            }, 
        };
        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            if (statusId === 1 || statusId === 2) {
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            } else {
                setProcessing(false);
                setOutputDetails(response.data);
                // TO-DO: Show success
                console.log('response.data', response.data);
                return;
            }
        } catch (err) {
            console.log("err", err);
            setProcessing(false);
            // TO-DO: Show error
        }

    }

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
