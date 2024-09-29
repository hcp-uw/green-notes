import React, { ChangeEvent, useState } from "react";
import Editor from "@monaco-editor/react";
import { languageOption } from "./languageOptions";

type CodeEditorProps = {
    onChange: (action: string, data: string
        // : ChangeEvent<HTMLInputElement>
    ) => void, 
    
    code: string,

    setCode: React.Dispatch<React.SetStateAction<string>>;

    language: languageOption,
    
    theme: string
};

export default function CodeEditor( {onChange, code, setCode, language, theme}: CodeEditorProps ) {
    // const [value, setValue] = useState<string>(code || "");

    const handleEditorChange = (value: string | undefined) => {
        if (typeof value === "undefined") {
            throw new Error("Editor value is undefined.");
        } else {
            setCode(value);
            onChange("code", value);   
        }
    }

    return (
        <div className="code-editor">
            <Editor 
                height={`100%`}
                width={`100%`}
                language={language.value || "javascript"}
                value={code}
                theme={theme}
                onChange={handleEditorChange}
            />
        </div>
    );
}
