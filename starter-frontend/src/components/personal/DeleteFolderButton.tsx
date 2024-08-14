type DeleteFolderProps = {
    onClick: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteFolderButton = ({onClick}: DeleteFolderProps): JSX.Element => {
    return <button onClick={() => onClick(true)} className="new-folder-button">Delete Folder</button>
}

export default DeleteFolderButton