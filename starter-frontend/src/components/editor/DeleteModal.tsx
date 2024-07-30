

type DeleteModalProps = {
    isDeleting: boolean,
    setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>,
    doDeleteClick: () => Promise<void>,

}

const DeleteModal = ({isDeleting, setIsDeleting, doDeleteClick}: DeleteModalProps): JSX.Element => {

    if (!isDeleting) {
        return <></>
    } else {
        return (
            <div>
                <label className="backdrop">
                    <input type="checkbox" checked={isDeleting} onChange={() => setIsDeleting(false)}/>
                </label>
                <div className="make">
                    <p className="make-header">Delete Note</p>
                    <button className="make-exit" onClick={() => setIsDeleting(false)}>X</button>

                    <div className="maketxt-wrap">
                        <p className="make-text">Are you sure you want to delete this note? This action cannot be undone!</p>
                    </div>

                    
                    <div className="maketxt-wrap">
                        <button onClick={() => doDeleteClick()}>Yes, I'm Sure</button>
                        <button onClick={() => setIsDeleting(false)}>Don't Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteModal