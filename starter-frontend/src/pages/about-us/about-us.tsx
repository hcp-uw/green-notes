//@ts-nocheck
import tree from '../../assets/binary-tree-about-us.svg';
import github from '../../assets/github.png';
import linkedin from '../../assets/linkedin.png';

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

function AboutUsTeam() {
    return (
    <div>
        <div className="team-background">
            <div className="team-bodytext">
                <p>We are students at the University of Washington committed to making a helpful tool for learning CS.</p>
                <p>Full-Stack Developers:</p>
                <p>- Zachary Hanczyc: {' '}
                    <a href='https://github.com/zth12301'><img id='github' src={github}></img></a>
                    <a href='https://github.com/zth12301'>Github</a> {' '}
                    <a href='https://www.linkedin.com/in/zachary-hanczyc-60b813279/'><img id='linkedin' src={linkedin}></img></a>
                    <a href='https://www.linkedin.com/in/zachary-hanczyc-60b813279/'>LinkedIn</a>
                </p>
                <p>- Sofia Fristrom: {' '}
                    <a href='https://github.com/s-fristrom'><img id='github' src={github}></img></a>
                    <a href='https://github.com/s-fristrom'>Github</a> {' '}
                    <a href='https://www.linkedin.com/in/sofia-p-fristrom/'><img id='linkedin' src={linkedin}></img></a>
                    <a href='https://www.linkedin.com/in/sofia-p-fristrom/'>LinkedIn</a>
                </p> 
                <p>- Kemin Li: {' '}
                    <a href='https://github.com/justkem'><img id='github' src={github}></img></a>
                    <a href='https://github.com/justkem'>Github</a> {' '}
                    <a href='https://www.linkedin.com/in/kemin-li-a01a73101/'><img id='linkedin' src={linkedin}></img></a>
                    <a href='https://www.linkedin.com/in/kemin-li-a01a73101/'>LinkedIn</a>
                </p> 
                <p>- Audrey Shen: {' '}
                    <a href='https://github.com/audrey157'><img id='github' src={github}></img></a>
                    <a href='https://github.com/audrey157'>Github</a> {' '}
                    <a href='https://www.linkedin.com/in/kemin-li-a01a73101/'><img id='linkedin' src={linkedin}></img></a>
                    <a href='https://www.linkedin.com/in/audrey-shen-989a97261/'>LinkedIn</a>
                </p>  
            </div>
        </div>
        <div className="team-title-background">
            <p className="team-title">Our Team</p>
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
                <AboutUsTeam />
            </>
        </div>
    );
}
