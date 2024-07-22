import github from '../../assets/github.png';
import linkedin from '../../assets/linkedin.png';

type TextBoxProps = {type: string, title: string, body: JSX.Element};

function TextBox({type, title, body}: TextBoxProps): JSX.Element {
    return (
        <div id={type} className="text-box">
            <p className="text-box-title">{title}</p>
            <div className="text-box-body">{body}</div>
        </div>
    );
}

type DeveloperProps = {
    name: string, 
    githubLink: string, 
    linkedInLink: string
}

function Developer({name, githubLink, linkedInLink}: DeveloperProps): JSX.Element {
    return <li>
        {name}: {' '}
        <a href={githubLink}><img id='github' src={github}></img></a>
        <a href={githubLink}>Github</a> {' '}
        <a href={linkedInLink}><img id='linkedin' src={linkedin}></img></a>
        <a href={linkedInLink}>LinkedIn</a>
    </li>
}

function AboutUsTeam(): JSX.Element {
    return (
    <div>
        <p>We are students at the University of Washington committed to making a helpful tool for learning CS.</p>
        <p>Full-Stack Developers:</p>
        <ul>
            <Developer name='Zachary Hanczyc' githubLink='https://github.com/zth12301' linkedInLink='https://www.linkedin.com/in/zachary-hanczyc-60b813279/'/>
            <Developer name='Sofia Fristrom' githubLink='https://github.com/s-fristrom' linkedInLink='https://www.linkedin.com/in/sofia-p-fristrom/'/>
            <Developer name='Kemin Li' githubLink='https://github.com/justkem' linkedInLink='https://www.linkedin.com/in/kemin-li-a01a73101/'/>
            <Developer name='Audrey Shen' githubLink='https://github.com/audrey157' linkedInLink='https://www.linkedin.com/in/audrey-shen-989a97261/'/>
        </ul>
    </div>
    )
}

export default function AboutUs(): JSX.Element {
    return (
        <div className="page gray-background" id="tree-bg">
            <TextBox type="mission" title="Our Mission" body={<p>Our mission is to create a user-friendly website that allows users to write and save their coding notes. This website specifically targets programmers and coders by including a built-in IDE.</p>} />
            <TextBox type="team" title="Our Team" body={<AboutUsTeam />} /> 
        </div>
    );
}
