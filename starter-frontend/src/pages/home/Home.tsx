import { Link } from 'react-router-dom';

/** Home page of the app */
export default function HomeScreen(): JSX.Element {
    return (
        <div className="page green-background smile-bg">
            <CenterText/>
        </div>
    );
}


/** Returns the center text and start notes button */
function CenterText(): JSX.Element {
    return (
        <div className = "centText">
            <pre className = "cText">{'Clean. Simple.\n'}<b>Code.</b></pre>
            <Link to={`notes`} className = "start">//start notes</Link>
        </div>
    )
}
