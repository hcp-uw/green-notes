import smile from "./smileLogo.png"


export default function HomeScreen() {
    return (<Background />)
}


/*const backgroundStyle = {
    backgroundImage: `url(${smile})`,
    backgroundRepeat: "no-repeat",
  //  backgroundSize: "cover",
    backgroundColor: 'green',
    height: "100vh",
   // backgroundSize: "100vh",


}*/

function Background() {
    return (
        <div  className = "home">
            <SmileLogo/>
               
        </div>
    )
}

function SmileLogo() {
    return (
        <img className="smile" src={smile} />
    )
}