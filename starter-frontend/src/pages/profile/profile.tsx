import React from 'react';
import { useState, useEffect } from 'react';
import pfp from '../../assets/profile-button.png';
import './profile.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isRecord, FetchRoute } from "../../components/file-navigation/routes";

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
        throw new Error("user object is null");
    }
    const currentUser = user.currentUser;
    if (currentUser === null) {
        throw new Error("currentUser is null, probably not logged in");
    }

    const [bio, setBio] = useState("");
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        getBio();
    }, [])

    // fetches the user's bio
    const getBio = async(): Promise<void> => {
        try {
            const token = currentUser && (await currentUser.getIdToken());
      
            const payloadHeader = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              method: "GET"
            };

            fetch(FetchRoute + "/getBio?route=" + encodeURIComponent("Users/" + currentUser.email), payloadHeader)
                .then((res) => {
                    res.json().then((val) => fetchResponse(val))
                })
                .catch(() => console.error("Error fetching /getBio: Failed to connect to server"))
        } catch (e) {
            console.log(e);
        }
    }

    // helper function for fetching user's bio
    const fetchResponse = (val: unknown): void => {
        if (!isRecord(val)) {
            console.error('Invalid JSON from /getBio', val);
            return;
        }
        console.log(val.data);
        if (typeof val.data !== 'string') {
            console.error('Invalid JSON from /getBio', val);
            return;
        }

        setBio(val.data);
        setIsLoading(false);
    }

    return (
        <div className='left-container'>
            <img src={currentUser.photoURL || pfp} alt="" className="pfp-icon"></img>

            <p className='name'>{currentUser.displayName}</p>
            <p className='user'>{currentUser.email}</p>
            
            <div className='bio-box'>
                    <p>{bio}</p>
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


