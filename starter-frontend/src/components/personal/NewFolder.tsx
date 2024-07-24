type NewFolderProps = {
    onClick: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewFolder({onClick}: NewFolderProps): JSX.Element {
    return(
        <div>
            <button onClick={() => onClick(true)} className="new-folder-button">New Folder</button>
        </div>
    )
}