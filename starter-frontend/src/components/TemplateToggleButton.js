import './TemplateToggleButton.css'


const TemplateToggleButton = ({ isToggled, onToggle }) => {

    return (
        <label className="switch">
            <input type="checkbox" checked={isToggled} onChange={onToggle}/>
            <span className="slider"/>
        </label>
    );
};

export default TemplateToggleButton;