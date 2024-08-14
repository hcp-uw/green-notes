import React from 'react';
import pfp from '../../assets/profile-button.png';
import './profile.css';

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
    return (
        <div className='left-container'>
            <img src={pfp} alt="" className='pfp-icon'></img>

            <p className='name'>John Doe</p>
            <p className='user'>@username</p>
            
            <div className='bio-box'>
                    <p>hello my name is john doe.</p>
            </div> 
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


