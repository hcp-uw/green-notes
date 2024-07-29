type EditProps = {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditModalButton = ({setIsEditing}: EditProps): JSX.Element => {
    return <button onClick={() => setIsEditing(true)}>Set Details</button>
}

export default EditModalButton