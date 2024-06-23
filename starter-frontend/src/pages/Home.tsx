import smile from '../assets/smileLogo.png';
import { Link } from 'react-router-dom';


export default function HomeScreen(): JSX.Element {
    return (<Background />)
}

// Returns all of the functions for Home.js
function Background(): JSX.Element {
    return (
        <div  className = "home">
            <SmileLogo/>
            <CenterText/>
               
        </div>
    )
}

// Returns the background smile logo
function SmileLogo(): JSX.Element {
    return (
        <img className="smile" src={smile} />        
    )
}

// Returns the center text and start notes button
function CenterText(): JSX.Element {
    return (
        <div className = "centText">
            <div>
                <pre className = "cText">{'Clean. Simple.\n'}<b>Code.</b></pre>
                <Link to={`notes`} className = "start">//start notes</Link>
            </div>
        </div>
    )
}
