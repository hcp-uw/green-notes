import logo from '../assets/binary-tree-logo.png';
import profile from '../assets/profile-button.png';
import React, { Component, MouseEvent } from 'react';
import '../components/ProfileDropdown.css';
import { Link } from 'react-router-dom';
import Logout from '../components/auth/Logout';
// import { useAuth } from '../contexts/AuthContext';
// import  auth  from '../config/firebase';
// import { useEffect } from 'react';
// import axios from 'axios';


type NavigationBarProps = {

};

type NavigationBarState = {
    /** True if the profile dropdown is open. */
    profileOpen: boolean; 

    isModal: boolean;
};


/* Returns the whole navigation bar. 
 *
 * TO-DO: Change between Profile or LogInButton depending on whether the user is logged in or not.
 */
export default class NavigationBar extends Component<NavigationBarProps, NavigationBarState> {

    constructor(props: NavigationBarProps) {
        super(props);

        this.state = { profileOpen: false, isModal: false };
    }

    render = (): JSX.Element => {
        /*Code to access/verify current user. Look into later*/
        // const { currentUser } = useAuth();

        // useEffect(() => {
        //     const fetchData = async () => {
        //       try {
        //         const user = auth.currentUser;
        //         const token = user && (await user.getIdToken());
        
        //         const payloadHeader = {
        //           headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${token}`,
        //           },
        //         };
        //         const res = await fetch("http://localhost:3001", payloadHeader);
        //         console.log(await res.text());
        //       } catch (e) {
        //         console.log(e);
        //       }
        //     };
        
        //     fetchData();
        // }, []);

        return (
            <nav>
                <div id="left-side">
                    {this.renderHomeLogo()}
                    {this.renderNavigationLinks()}
                </div>
                {this.renderProfile()}
            </nav>
        );
    };


    /* Home logo with binary tree and Green Notes title. (Upper right corner of navigation bar) */
    renderHomeLogo = (): JSX.Element => {
        return (
            <Link to={`/`} id="home-logo">
                <img id="logo" src={logo} />
                <header id="green-notes">Green Notes</header>
            </Link>
        )
    };

    /* Main links to Notes, Collaboration, and About Us.*/
    renderNavigationLinks = (): JSX.Element => {
        return (
            <ul id="nav-links">
                <li><Link to={`notes`} className="nav-link">Notes</Link></li>
                <li><Link to={`collaboration`} className="nav-link">Collaboration</Link></li>
                <li><Link to={`about-us`} className="nav-link">About Us</Link></li>
            </ul>
        )
    };


    /**
     * Log-in button.
     * 
     * TO-DO
     */
    renderLogInButton = (): JSX.Element => {
        return (
            <></>
        );
    };


    /* Profile icon that directs to the user's profile.
        * 
        * TO-DO: Make so that it shows the user's image. 
        */
    renderProfile = (): JSX.Element => {
        // return <Link to={`ProfileDropdown`}><img id="profile-icon" src={profile} /></Link>;
    
        return (
            <div>
                <Logout isModal={this.state.isModal} setIsModal={this.doLogoutClick}/>
            <a onClick={this.doOpenClick}><img id="profile-icon" src={profile} /></a>
            {this.state.profileOpen ? (
            <ul className="menu">
                <li className="menu-item">
                {/* TODO: figure out how to give ddown-option more height and convert other things to links */}
                <Link to={'profile'} className='ddown-option' onClick={this.doOpenClick}>Your Profile</Link>
                </li>
                <li className="menu-item">
                <button onClick={this.doOpenClick}>Shared Files</button>
                </li>
                <li className="menu-item">
                <button onClick={this.doOpenClick}>Settings</button>
                </li>
                <li className="menu-item">
                <button onClick={this.doLogoutClick}>Sign out</button>
                </li>
            </ul>
            ) : null}
            </div>
        );
    };

    doOpenClick = (_evt: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement> ): void => {
        this.setState({ profileOpen: !this.state.profileOpen });
    };

    doLogoutClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        this.setState({ isModal: !this.state.isModal, profileOpen: false });
    }; 
}
