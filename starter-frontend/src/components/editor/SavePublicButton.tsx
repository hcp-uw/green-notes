/** Parameters for button to open save copy modal */
type SavePublicProps = {
    setIsPublicSaving: React.Dispatch<React.SetStateAction<boolean>>;
}

/** Button to open modal that saves a copy */
const SavePublicButton = ({setIsPublicSaving}: SavePublicProps): JSX.Element => {

    return <button className="new-folder-button" onClick={() => setIsPublicSaving(true)}>Save a Copy</button>
}

export default SavePublicButton