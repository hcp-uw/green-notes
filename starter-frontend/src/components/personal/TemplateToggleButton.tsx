import './TemplateToggleButton.css';

/** Parameters for Template Toggle Button */
type ToggleProps = {
    /** True if toggled to templates. */
    isToggled: boolean;

    /** Method when button is clicked */
    doTempClick: (email: string) => void;

    /** Client email */
    email: string;
}

/** Button to toggle between template folder */
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
