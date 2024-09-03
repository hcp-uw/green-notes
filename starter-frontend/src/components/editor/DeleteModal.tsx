/** Parameters for delete modal */
type DeleteModalProps = {
    isDeleting: boolean,
    setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>,
    doDeleteClick: () => Promise<void>,

}

/** Modal which allows client to delete note */
const DeleteModal = ({isDeleting, setIsDeleting, doDeleteClick}: DeleteModalProps): JSX.Element => {

    if (!isDeleting) { // If modal is closed
        return <></>
    } else {
        return (
            <div>
                <label className="backdrop">
                    <input type="checkbox" checked={isDeleting} onChange={() => setIsDeleting(false)}/>
                </label>
                <div className="modal-body">
                    <p className="modal-header">Delete Note</p>
                    <button className="modal-exit" onClick={() => setIsDeleting(false)}>X</button>

                    <div className="modaltxt-wrap">
                        <p className="modal-text">Are you sure you want to delete this note? This action cannot be undone!</p>
                    </div>

                    
                    <div className="modaltxt-wrap modal-centered">
                        <button className="input-button" onClick={() => doDeleteClick()}>Yes, I'm Sure</button>
                        <button className="input-button" onClick={() => setIsDeleting(false)}>Don't Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteModal