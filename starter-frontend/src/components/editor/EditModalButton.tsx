/** Parameters for button to open edit modal */
type EditProps = {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

/** Button to open edit modal */
const EditModalButton = ({setIsEditing}: EditProps): JSX.Element => {
    return <button className="new-folder-button" onClick={() => setIsEditing(true)}>Set Details</button>
}

export default EditModalButton