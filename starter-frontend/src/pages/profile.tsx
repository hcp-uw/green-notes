//@ts-nocheck

import  Logout  from '../components/auth/Logout';
import React from 'react';
import { useState } from 'react';

import profile from '../assets/profile-button.png';
import "./profile.css";

export default function Profile() {

    const[isModal, setIsModal] = useState<Boolean>(false);

    const onOpen = () => {
        setIsModal(!isModal);
    }

    return (

        // TODO: get background for logout modal to work again
        <div className="profile-page">
          {/* <div className="background"></div> */}
            <div className="white-box">
                <User />
                {/* <p className="profile-icon"><img id="profile-icon" src={profile}></img></p> */}
                <button onClick={onOpen}>Logout?</button>
                <Logout isModal={isModal} setIsModal={setIsModal}/>
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


