/** Parameters for the Delete Folder button */
type DeleteFolderProps = {
    onClick: React.Dispatch<React.SetStateAction<boolean>>
}

/** Button to open the Delete Folder Modal */
const DeleteFolderButton = ({onClick}: DeleteFolderProps): JSX.Element => {
    return <button onClick={() => onClick(true)} className="new-folder-button">Delete Folder</button>
}

export default DeleteFolderButton