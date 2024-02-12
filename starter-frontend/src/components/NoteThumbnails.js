function NoteThumbnail({title, text}) {
    return (
        <div className="thumbnail">
            <div className="thumbnail-body">
                <p className="thumbnail-text">{text}</p>
            </div>
            <div className="thumbnail-label">
                <p className="thumbnail-title">{title}</p>
            </div>
        </div>
    );
}

export default function NoteThumbnails() {
    return (
        <>
            <NoteThumbnail title="Testing" text="blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah " />
            <NoteThumbnail title="Testing 2" text="cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus " />
        </>
    );
}
