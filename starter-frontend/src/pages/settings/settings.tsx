import './settings.css';
import profile from '../../assets/profile-button.png';
import { useAuth } from '../../contexts/AuthContext';

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
    const user = useAuth();
    if (user === null) {
        throw new Error("No user found")
    }

    const currentUser = user.currentUser;
    if (currentUser === null) {
        throw new Error("No user found");
    }

    return (
        <div className='settings-text'>
            <h1>General</h1>
            <p>Display Name: {currentUser.displayName}</p>
            <p>Email: {currentUser.email}</p>           
            <p>Change password</p> {/*make into button/pop-up*/}
            
            <h1 id='appearance'>Appearance</h1>
            <p>Color Theme: <button>Default</button></p> {/*make button*/}

            <button>Delete Account</button>
        </div>
    )
}

function ChangeProfilePhoto(): JSX.Element {
    return (
        <div className='profile-text'>
            <img src={profile} alt='profile' id='img'></img>
            <p>Change Photo</p> {/*onclick should make a popup with options to change photo */}
            <p></p>
            <p id='bio'>bio text placeholder</p>
            <p>Edit Bio</p> {/*onclick should make bio editable */}
        </div>
    )
}


export default function Settings(): JSX.Element {
    return (
        <div className='page green-background' id='main-elements'>
            <WhiteBox type='settings-box' body={<GeneralSettings/>}/>
            <WhiteBox type='profile-photo-box' body={<ChangeProfilePhoto />} />
        </div>
    );
}