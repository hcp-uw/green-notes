type SavePublicProps = {
    setIsPublicSaving: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SavePublicButton = ({setIsPublicSaving, setIsLoading}: SavePublicProps): JSX.Element => {

    // const PublicButtonClick = (): void => {
    //     setIsLoading(true);
    //     setIsPublicSaving(true);
    // }

    return <button className="new-folder-button" onClick={() => setIsPublicSaving(true)}>Save a Copy</button>
}

export default SavePublicButton