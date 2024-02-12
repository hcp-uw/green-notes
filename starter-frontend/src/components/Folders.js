function Folder( {name}) {
    return (
        <div className="thumbnail">
            <div className="tab"></div>
            <div className="tab-space"></div>
            <div className="folder">
                <p className="folder-name">{name}</p>
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
