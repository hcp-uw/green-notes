import { Link } from 'react-router-dom';

function NoteThumbnail({title, text, id}) {
    return (
        // Later make into
        // <Link to={`../note/${id}`} className="link">
        <div>
            <Link to={`../note`} className="link">
                <span className="thumbnail-click"></span>
            </Link>
            <div className="thumbnail">
                <div className="thumbnail-body">
                    <p className="thumbnail-text">{text}</p>
                </div>
                <div className="thumbnail-label">
                    <p className="thumbnail-title">{title}</p>
                </div>
            </div>
        </div>
        
    );
}

export default function NoteThumbnails() {
    return (
        <>
            <NoteThumbnail title="Testing" text="blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah " id="123" />
            <NoteThumbnail title="Testing 2" text="cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus cactus " id="cactus" />
        </>
    );
}
