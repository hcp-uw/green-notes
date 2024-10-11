/** Parameters for button to open delete modal */
type DeleteProps = {
    setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

/** Button to open Delete Modal */
const DeleteButton = ({setIsDeleting}: DeleteProps): JSX.Element => {
    return <button className="note-btn" onClick={() => setIsDeleting(true)}>Delete</button>
}

export default DeleteButton
