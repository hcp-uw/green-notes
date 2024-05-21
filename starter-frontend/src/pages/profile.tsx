//@ts-nocheck
import profile from '../assets/profile-button.png';
import "./profile.css";

export default function Profile() {
    return (
        <div className="profile-page">
            <div className="white-box">
                <User />
            </div>
        </div>        
    );
}

function User() {
    return (
        <div>
            <Icon />
            <Bio />
        </div>
    );
}

function Icon() {
    return (
        <div className="profile-icon"><img className="profile-icon" src={profile}></img></div>
    );
}

function Bio() {
    return (
        <div className="bio-box">
            <div className="bio-text">
                <p>
                    Hello my name is john doe.
                </p>
            </div>
        </div> 
    );
}


