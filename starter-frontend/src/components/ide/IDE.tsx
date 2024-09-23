import React, { useEffect, useState, MouseEvent } from "react";
import CodeEditor from "./CodeEditor";
import axios from "axios";
import { languageOption, languageOptions } from "./languageOptions";

import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import LanguagesDropdown from "./LanguagesDropdown";
import { Editor as TinyMCEEditor } from "tinymce";

type IDEProps = {
    // True if note is in collaboration space (no Update Note button)
    collab: boolean,

    // Initial code in the IDE
    code: string,

    setCode: React.Dispatch<React.SetStateAction<string>>;

    language: languageOption,
    
    setLanguage: React.Dispatch<React.SetStateAction<languageOption>>, 

    setIsIDEOpen: React.Dispatch<React.SetStateAction<boolean>>, 

    editorRef: React.RefObject<TinyMCEEditor | null>
}


export default function IDE({collab, code, setCode, language, setLanguage, setIsIDEOpen, editorRef}: IDEProps): JSX.Element {
    const [customInput, setCustomInput] = useState<string>("");
    const [output, setOutput] = useState<boolean>(true);
    const [outputDetails, setOutputDetails] = useState<any | null>(null);
    const [processing, setProcessing] = useState<boolean | null>(null);
    const [updated, setUpdated] = useState<boolean>(true);
    
    function onSelectChange(sl: languageOption | null): void {
        if (sl !== null) {
            setLanguage(sl);
            setUpdated(false);
        }
    }

    function onChange(action: string, data: string): void {
        switch (action) {
            case "code": {
                setCode(data);
                setUpdated(false);
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
        // TO-DO: add check if code isn't updated
        setIsIDEOpen(false);
        if (editorRef !== null) {
            const editor = editorRef.current;
            if (editor !== null) {
                let oldCode = editor.dom.get("active");
                if (oldCode !== null) {
                    oldCode.id = "";
                }
            }
            
        }
    } 

    function handleUpdate(_evt: MouseEvent<HTMLButtonElement>): void {
        if (editorRef !== null) {
            const editor = editorRef.current;
            if (editor !== null) {
                let oldCode = editor.dom.get("active");
                let newCode = document.createElement("code");
                newCode.textContent = code;
                const langIndex = languageOptions.findIndex(function(obj){return obj.id == language.id});
                newCode.dataset.lang = "" + langIndex;
                newCode.id = "active";
                newCode.className = "ide-code";
                editor.dom.replace(newCode, oldCode);
            }
            
        }

        setUpdated(true);
        
    }
    
    return (
        <div className="ide">
            <LanguagesDropdown onSelectChange={onSelectChange} language={language} />
            <CodeEditor 
                code={code}
                setCode={setCode}
                onChange={onChange}
                language={language}
                theme="vs-dark"
            />
            
            <div className="in-output">
                <OutputWindow outputDetails={outputDetails} />
                <CustomInput 
                    customInput={customInput}
                    setCustomInput={setCustomInput}
                />
            </div>
            

            <div className="ide-footer">
                <button 
                    onClick={handleCompile}
                    disabled={!code}
                    className={collab ? "ide-btn compile-btn half-width" : "ide-btn compile-btn third-width"}
                >
                    {processing ? "Processing..." : "Run"}
                </button>
                {!collab && 
                    <button
                        onClick={handleUpdate}
                        disabled={updated}
                        className="third-width ide-btn"
                    >
                        Update Note
                    </button>
                }
                
                <button
                    onClick={handleClose}
                    className={collab ? "ide-btn close-btn half-width" : "ide-btn close-btn third-width"}
                >
                    Close
                </button>
            </div>
            
        </div>
    );
}
