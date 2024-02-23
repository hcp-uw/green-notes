import { Link } from 'react-router-dom';

function Folder( {name}) {
    return (
        <Link to={`../folder`} className="link">
            <div className="thumbnail">
                <div className="tab"></div>
                <div className="tab-space"></div>
                <div className="folder">
                    <p className="folder-name">{name}</p>
                </div>
            </div>
        </Link>
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
