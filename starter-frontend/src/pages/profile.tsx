//@ts-nocheck

import  Logout  from '../components/auth/Logout';
import React from 'react';
import { useState } from 'react';

import profile from '../assets/profile-button.png';


export default function Profile() {

    const[isModal, setIsModal] = useState<Boolean>(false);

    const onOpen = () => {
        setIsModal(!isModal);
    }

    return (
        <div className="page green-background">
            <div className="background">
                <p className="profile-icon"><img id="profile-icon" src={profile}></img></p>
            </div>  
              <button onClick={onOpen}>Logout?</button>
              <Logout isModal={isModal} setIsModal={setIsModal}/>
            <div>
                
            </div>
        </div>
        
    );
}
