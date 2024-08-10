import './settings.css';
import profile from '../../assets/profile-button.png';

type WhiteBoxProps = {type: string, body: JSX.Element};

// White box that text appears on
function WhiteBox({type, body}: WhiteBoxProps): JSX.Element {
    return (
        <div id={type}>
            <div>{body}</div>
        </div>
    )
}

// TODO: make functional/editable
// General settings listed on the left of the page
function GeneralSettings(): JSX.Element {
    return (
        <div id='text'>
            <h1>General</h1>
            <p>Display Name: John Doe</p>
            <p>Username: </p>
            <p>Email: </p>
            <p>Bio:</p>            
            <p>Change password</p> {/*make into button/pop-up*/}
            <p> </p>
            <h1>Appearance</h1>
            <p>Color Theme: <button>Default</button></p> {/*make button*/}
        </div>
    )
}

function ChangeProfilePhoto(): JSX.Element {
    return (
        <div className='profile-text'>
            <img src={profile} id='img'></img>
            <p>Change Photo</p>
            <button>Delete Account</button>
        </div>
    )
}


export default function Settings(): JSX.Element {
    return (
        <div className='page green-background' id='main-elements'>
            <WhiteBox type='settings' body={<GeneralSettings/>}/>
            <WhiteBox type='profile-photo' body={<ChangeProfilePhoto />} />
        </div>
    );
}