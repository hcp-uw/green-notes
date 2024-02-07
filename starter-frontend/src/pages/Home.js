import smile from '../assets/smile.png';

export default function HomeScreen() {
    return (<Background />);
}


const backgroundStyle = {
    backgroundImage: `url(${smile})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: 'green',
    height: "100vh",
    backgroundSize: "100vh"

}

function Background () {
    return (
        <div style ={backgroundStyle}>
           {// hello?
        }       
        </div>
    )
}
