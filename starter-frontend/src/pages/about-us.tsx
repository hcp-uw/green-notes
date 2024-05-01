//@ts-nocheck
import tree from '../assets/binary-tree-about-us.svg';

function AboutUsMission({title, text}) {
    return (
        <div>
            <div className="mission-background">
                <p className="mission-bodytext">{text}</p>
            </div>
            <div className="mission-title-background">
                <p className="mission-title">{title}</p>
            </div>
        </div>
        
    );
}

function AboutUsTeam({title, text}) {
    return(
    <div>
        <div className="team-background">
            <p className="team-bodytext">{text}</p>
        </div>
        <div className="team-title-background">
            <p className="team-title">{title}</p>
        </div>
    </div>
    )
}

export default function AboutUs() {
    return (
        <div className="page gray-background">
             <img id="tree" src={tree} />
            <>
                <AboutUsMission title="Our Mission" text="Our mission is to create a user-friendly website that allows users to write and save their coding notes. This website specifically targets programmers and coders by including a built-in IDE. "/>
                <AboutUsTeam title="Our Team" text="Name, Role, Linkedin, Github"/>
            </>
        </div>
    );
}
