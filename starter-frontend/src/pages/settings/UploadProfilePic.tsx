import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import profile from '../../assets/profile-button.png';

/* Allows the user to change their profile photo by uploading an image from their device */

export default function UploadProfilePic(): JSX.Element {
    const user = useAuth();
    if (user === null) {
        throw new Error('user object is null');
    }
    const currentUser = user.currentUser;
    if (currentUser === null) {
        throw new Error('currentUser is null, probably not logged in');
    }

    async function upload(file: any, user: any, setLoading: any) {
        if (user === null) {
            throw new Error('user object is null');
        }
        const currentUser = user.currentUser;
        const fileRef = ref(storage, currentUser.uid + '.png');

        setLoading(true);
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);

        setPhotoUrl(photoURL);
        user.updateUserProfile(currentUser, {photoURL: photoURL});
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
        if (currentUser?.photoURL) {
            setPhotoUrl(currentUser.photoURL);
        }
    }, [currentUser]);

    return (
        <div className='profile-text'>
            <div className='container'>
                <div id='image-cropper'><img src={photoUrl || profile} alt='profile' id='img'></img></div>
            </div>
            <p></p>
            <p id='edit-profile-text'>Edit profile photo:</p>
            <input type="file" onChange={handleChange}></input>
            <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
        </div>
    )
}