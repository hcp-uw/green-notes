//@ts-nocheck
import { Form } from "react-router-dom";
import TextEditor from "../components/TextEditor";

export default function Note() {
    return (
        <div className="page gray-background">
            <TextEditor />
        </div>
    );
}
