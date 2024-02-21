import smile from '../assets/smileLogo.png';
import { Link } from 'react-router-dom';


export default function HomeScreen() {
    return (<Background />)
}


function Background() {
    return (
        <div  className = "home">
            <SmileLogo/>
            <CenterText/>
               
        </div>
    )
}

function SmileLogo() {
    return (
        <img className="smile" src={smile} />        
    )
}


function CenterText() {
    return (
        <div className = "centText">
            <div>
                <pre className = "cText">{'Clean. Simple.\n'}<b>Code.</b></pre>
                <Link to={`notes`} className = "start">//start notes</Link>
            </div>
        </div>
    )
}