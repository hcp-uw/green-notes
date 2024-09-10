// Testing page. Delete later

import IDE from "../components/ide/IDE";


export default function Testing(): JSX.Element {
    return (
        <div className="page green-background">
            <IDE initCode="console.log('h')" initInput="hi"/>
        </div>
    );
}
