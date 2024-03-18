import { Link } from 'react-router-dom';

function Folder( {name}) {
    return (
        <div>
            <Link to={`../folder`} className="link">
                <span className="thumbnail-click"></span>
            </Link>
            <div className="thumbnail">
                <div className="tab"></div>
                <div className="tab-space"></div>
                <div className="folder">
                    <p className="folder-name">{name}</p>
                </div>
            </div>
        </div>
    )
}

export default function Folders() {
    return (
        <>
            <Folder name="Testing"/>
            <Folder name="Testing 2"/>
            <Folder name="Testing 3"/>
        </>
    );
}
