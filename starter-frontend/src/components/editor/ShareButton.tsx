/** Parameters for button to open share modal */
type ShareButtonProps = {
    setIsSharing: React.Dispatch<React.SetStateAction<boolean>>
};

/** Button to open share modal */
const ShareButton = ({setIsSharing}: ShareButtonProps): JSX.Element => {
    return(
        <button className="note-btn" onClick={() => setIsSharing(true)}>Share</button>
    )
};

export default ShareButton;
