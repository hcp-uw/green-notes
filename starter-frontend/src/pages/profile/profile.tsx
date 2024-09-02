import React from 'react';
import pfp from '../../assets/profile-button.png';
import './profile.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {

    return (
        <div className='profile-bg'>
            <div className='bg-box'>
                <User />
                <Stuff />
            </div>  
        </div>        
    );
}

function User() {
    const user = useAuth();
    if (user === null) {
        throw new Error();
    }
    const currentUser = user.currentUser;
    if (currentUser === null) {
        throw new Error();
    }

    return (
        <div className='left-container'>
            <img src={currentUser.photoURL || pfp} alt="" className='pfp-icon'></img>

            <p className='name'>{currentUser.displayName}</p>
            <p className='user'>{currentUser.email}</p>
            
            <div className='bio-box'>
                    <p>hello my name is john doe.</p>
            </div> 
            <Link to="/settings"><button id='edit-profile-button'>Edit Profile</button></Link>
        </div>
    );
}

function Stuff() {
    return (
        <div className='right-container'>
            <h1>Shared Notes and Templates</h1>
            <div className='grid-container'>
                <p className='notes-box'> note 1 </p>
                <p className='notes-box'> note 1 </p>
                <p className='notes-box'> note 1 </p>
                <p className='notes-box'> note 1 </p>
                <p className='notes-box'> note 1 </p>
            </div>

            <h1 className='tags'>Common Tags:</h1>
            <div>
            </div>
        </div>
    );
}


