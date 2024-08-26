import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/* Allows the user to change their profile photo by uploading an image from their device */

export default function UploadProfilePic(): JSX.Element {
    const navigate = useNavigate();
    const user = useAuth();
    if (user === null) {
        throw new Error('error');
    }
    const currentUser = user.currentUser;
    if (currentUser === null) {
        throw new Error('error');
    }

    async function upload(file: any, user: any, setLoading: any) {
        if (user === null) {
            throw new Error('error');
        }
        const currentUser = user.currentUser;
        const fileRef = ref(storage, currentUser.uid + '.png');

        setLoading(true);
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);

        user.updateUserProfile(currentUser, {photoURL: photoURL});
        navigate("/settings");
        setLoading(false);
    }

    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(''); 

    function handleChange(e: any) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    }

    function handleClick() {
        upload(photo, user, setLoading);
    }

    useEffect(() => {
        console.log("update profile photo");
        if (currentUser?.photoURL) {
            setPhotoUrl(currentUser.photoURL);
        }
    }, [currentUser]);

    return (
        <div className='profile-text'>
            <img src={photoUrl} alt='profile' id='img'></img>
            <p></p>
            <p>Change photo:</p>
            <input type="file" onChange={handleChange}></input>
            <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
            <p>*reload to see changes (fix this soon)</p>
        </div>
    )
}