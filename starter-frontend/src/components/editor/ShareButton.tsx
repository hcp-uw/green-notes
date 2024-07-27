type ShareButtonProps = {
    setIsSharing: React.Dispatch<React.SetStateAction<boolean>>
}

const ShareButton = ({setIsSharing}: ShareButtonProps): JSX.Element => {
    return(
        <button onClick={() => setIsSharing(true)}>Share</button>
    )
}

export default ShareButton