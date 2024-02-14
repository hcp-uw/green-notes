import smile from "./smileLogo.png"


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
                <a href="./note-navigation.html" className = "start">//start notes</a>
            </div>
        </div>
    )
}