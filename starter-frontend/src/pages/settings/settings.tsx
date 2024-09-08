import './settings.css';
import React, {useState} from 'react';
import { Link } from "react-router-dom";
import profile from '../../assets/profile-button.png';
import { useAuth } from '../../contexts/AuthContext';
import Delete from './DeleteAccount';
import EditName from './EditName';
import UploadProfilePic from './UploadProfilePic';
import EditBio from './EditBio';

type WhiteBoxProps = {type: string, body: JSX.Element};

// White box that text appears on
function WhiteBox({type, body}: WhiteBoxProps): JSX.Element {
    return (
        <div id={type}>
            <div>{body}</div>
        </div>
    )
}

export default function Settings(): JSX.Element {
    // General settings listed on the left of the page
    function GeneralSettings(): JSX.Element {
        const[isModal, setIsModal] = React.useState<boolean>(false);
        const onOpen = () => {
            setIsModal(!isModal);
        }

        const user = useAuth();
        if (user === null) {
            throw new Error("user object is null")
        }

        const currentUser = user.currentUser;
        if (currentUser === null) {
            throw new Error("currentUser is null, probably not logged in");
        }

        return (
            <div className='settings-text'>
                <h1>You</h1>
                <div>
                    <p>Display Name: {currentUser.displayName} <button id='edit-button' onClick={onOpen}>Edit</button></p>
                    <p>Email: {currentUser.email}</p>
                </div>
                <EditName isModal={isModal} setIsModal={setIsModal}></EditName>
                <Link to="/profile"><button id='back-button'>Back to Profile</button></Link>
                
                <h1 id='appearance'>More</h1>
                <p>Document Language: English</p>
                <p>Color Theme: Default</p>
            </div>
        )
    }

    // delete account button
    function DeleteAccountButton(): JSX.Element {
        const[isModal, setIsModal] = React.useState<boolean>(false);
        const onOpen = () => {
            setIsModal(!isModal);
        }
        return (
            <div>
                <button id='delete-button' onClick={onOpen}>Delete Account</button>
                <Delete isModal={isModal} setIsModal={setIsModal}></Delete>
            </div>
        );
    }

    function BioBox(): JSX.Element {
        const[isModal, setIsModal] = React.useState<boolean>(false);
        const onOpen = () => {
            setIsModal(!isModal);
        }
        return (
            <div className='profile-text'>
                {/* <form id='bio'>
                    <input placeholder="Add Bio..."></input>
                </form> */}

                {/* the text below should display a bio if the user has one, and a default text if the user does not */}
                {/* <p id='bio-text'><span>[Your bio here...]</span></p>
                <button id='edit-button' onClick={onOpen}>Edit Bio</button> */}
                <EditBio isModal={isModal} setIsModal={setIsModal}></EditBio>
            </div>
        )
    }

    return (
        <div className='page green-background' id='main-elements'>
            <WhiteBox type='settings-box' body={<><GeneralSettings/><DeleteAccountButton/></>}/>
            <WhiteBox type='profile-photo-box' body={<><UploadProfilePic /><BioBox /></>} />
        </div>
    );
}