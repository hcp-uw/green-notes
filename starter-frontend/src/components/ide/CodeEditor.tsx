import React, { ChangeEvent, useState } from "react";
import Editor from "@monaco-editor/react";

type CodeEditorProps = {
    onChange: (action: string, data: string
        // : ChangeEvent<HTMLInputElement>
    ) => void, 
    // To-DO: Change to list of options
    language: string, 
    code: string, 
    // To-do: change to list of options
    theme: string
};

export default function CodeEditor( {onChange, language, code, theme}: CodeEditorProps ) {
    const [value, setValue] = useState<string>(code || "");

    const handleEditorChange = (value: string | undefined) => {
        if (typeof value === "undefined") {
            throw new Error("Editor value is undefined.");
        } else {
            setValue(value);
            onChange("code", value);   
        }
    }

    return (
        <div className="code-editor">
            <Editor 
                height={`100%`}
                width={`100%`}
                language={language || "javascript"}
                value={value}
                theme={theme}
                onChange={handleEditorChange}
            />
        </div>
    );
}
