import './TemplateToggleButton.css'


const TemplateToggleButton = ({ isToggled, onToggle }) => {

    return (
        // Label holds everything together and positions it
        // input is a checkbox used for taking the user input to toggle/detoggle 
        // span is the visual part of the toggle button
        <label className="switch">
            <input type="checkbox" checked={isToggled} onChange={onToggle}/>
            <span className="slider"/>
        </label>
    );
};

export default TemplateToggleButton;