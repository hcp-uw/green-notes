//@ts-nocheck
import  Logout  from '../components/auth/Logout';
import React from 'react';
import { useState } from 'react';

export default function Profile() {

    const[isModal, setIsModal] = useState<Boolean>(false);

    const onOpen = () => {
        setIsModal(!isModal);
    }

    return (
        <div className="page green-background">
            <p>Placeholder Profile</p>
            <button onClick={onOpen}>Logout?</button>
            <Logout isModal={isModal} setIsModal={setIsModal}/>
        </div>
        
    );
}
