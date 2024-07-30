type DeleteProps = {
    setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteButton = ({setIsDeleting}: DeleteProps): JSX.Element => {
    return <button onClick={() => setIsDeleting(true)}>Delete</button>
}

export default DeleteButton