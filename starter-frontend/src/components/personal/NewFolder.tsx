/** Parameters for New Folder button */
type NewFolderProps = {
    onClick: React.Dispatch<React.SetStateAction<boolean>>
}

/** Button to open the New Folder Modal */
export default function NewFolder({onClick}: NewFolderProps): JSX.Element {
    return(
        <div>
            <button onClick={() => onClick(true)} className="new-folder-button">New Folder</button>
        </div>
    )
}