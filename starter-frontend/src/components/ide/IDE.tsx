import React, { useEffect, useState, MouseEvent } from "react";
import CodeEditor from "./CodeEditor";
import axios from "axios";
import { languageOption, languageOptions } from "./languageOptions";

import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import LanguagesDropdown from "./LanguagesDropdown";

type IDEProps = {
    // Initial code in the IDE
    initCode: string,
    
    setIsIDEOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export default function IDE({initCode, setIsIDEOpen}: IDEProps): JSX.Element {
    const [code, setCode] = useState<string>(initCode);
    const [customInput, setCustomInput] = useState<string>("");
    const [output, setOutput] = useState<boolean>(true);
    const [outputDetails, setOutputDetails] = useState<any | null>(null);
    const [processing, setProcessing] = useState<boolean | null>(null);
    const [language, setLanguage] = useState<languageOption>(languageOptions[0]);
    
    function onSelectChange(sl: languageOption | null): void {
        console.log("Selected option ", sl);
        if (sl !== null) {
            setLanguage(sl);
        }
    }

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

    function handleCompile(): void {
        setProcessing(true);
        setOutput(true);
        const formData = {
            language_id: language.id,
            source_code: btoa(code),
            stdin: btoa(customInput),
        };
        const options = {
            method: "POST",
            url: process.env.REACT_APP_RAPID_API_URL,
            params: { base64_encoded: true, fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
            },
            data: formData,
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
              "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
            },
        };
          try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;
      
            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
              // still processing
              setTimeout(() => {
                checkStatus(token);
              }, 2000);
              return;
            } else {
              setProcessing(false);
              setOutputDetails(response.data);
              console.log("response.data", response.data);
              return;
            }
          } catch (err) {
            console.log("err", err);
            setProcessing(false);
          }
    }

    function handleClose(_evt: MouseEvent<HTMLButtonElement>): void {
        setIsIDEOpen(false);
    }
    
    return (
        <div className="ide">
            <LanguagesDropdown onSelectChange={onSelectChange} />
            <CodeEditor 
                code={code}
                onChange={onChange}
                language={language?.value}
                theme="vs-dark"
            />
            
            
            <OutputWindow outputDetails={outputDetails} />
            <CustomInput 
                customInput={customInput}
                setCustomInput={setCustomInput}
            />

            <div className="ide-footer">
                <button 
                    onClick={handleCompile}
                    disabled={!code}
                    className="ide-btn"
                >
                    {processing ? "Processing..." : "Run"}
                </button>
                <button
                    // onClick={handleUpdate}
                    // disabled={!update}
                    className="ide-btn"
                >
                    Update
                </button>
                <button
                    onClick={handleClose}
                    className="ide-btn"
                >
                    Close
                </button>
            </div>
            
        </div>
    );
}
