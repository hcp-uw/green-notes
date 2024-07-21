import { ChangeEvent } from 'react';
import './TemplateToggleButton.css';
import { auth } from "../../config/firebase";

type ToggleProps = {
    /** True if toggled to templates. */
    isToggled: boolean;

    /** Function to update isToggled. */
    // onToggle: (event: ChangeEvent<HTMLInputElement>) => void;

    doTempClick: (email: string) => Promise<void>;

    email: string;

}

const TemplateToggleButton = ({ isToggled, doTempClick, email }: ToggleProps): JSX.Element => {


    return (
        // Label holds everything together and positions it
        // input is a checkbox used for taking the user input to toggle/detoggle 
        // span is the visual part of the toggle button
        <label className="switch">
            <input type="checkbox" checked={isToggled} 
            onChange={() => {
                        doTempClick(email)}}/>
            <span className="slider"/>
        </label>
    );
};

export default TemplateToggleButton;
