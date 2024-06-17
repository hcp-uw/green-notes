//@ts-nocheck
import logo from '../assets/binary-tree-logo.png';
import profile from '../assets/profile-button.png';
import * as React from 'react';
import '../components/ProfileDropdown.css';
import { Link } from 'react-router-dom';
import Logout from '../components/auth/Logout';
import { useAuth } from '../contexts/AuthContext';
import { auth }  from '../config/firebase';
import { useEffect } from 'react';
// import axios from 'axios';

/* Home logo with binary tree and Green Notes title. (Upper right corner of navigation bar) */
function HomeLogo() {
    return (
        <Link to={`/`} id="home-logo">
            <img id="logo" src={logo} />
            <header id="green-notes">Green Notes</header>
        </Link>
    )
}

/* Main links to Notes, Collaboration, and About Us.*/
function NavigationLinks() {
    return (
        <ul id="nav-links">
            <li><Link to={`notes`} className="nav-link">Notes</Link></li>
            <li><Link to={`collaboration`} className="nav-link">Collaboration</Link></li>
            <li><Link to={`about-us`} className="nav-link">About Us</Link></li>
        </ul>
    )
}

/* Profile icon that directs to the user's profile.
 * 
 * TO-DO: Make so that it shows the user's image. 
 */
function Profile() {
    // return <Link to={`ProfileDropdown`}><img id="profile-icon" src={profile} /></Link>;

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const[isModal, setIsModal] = React.useState<Boolean>(false);

    const onOpen = () => {
        setIsModal(!isModal);
    }

    return (
        <div>
            <Logout isModal={isModal} setIsModal={setIsModal}/>
        <a alignment="end" onClick={handleOpen}><img id="profile-icon" src={profile} /></a>
        {open ? (
        <ul className="menu">
          <li className="menu-item">
            {/* TODO: figure out how to give ddown-option more height and convert other things to links */}
            <Link to={'profile'} className='ddown-option' onClick={handleOpen}>Your Profile</Link>
          </li>
          <li className="menu-item">
            <button onClick={handleOpen}>Shared Files</button>
          </li>
          <li className="menu-item">
            <button onClick={handleOpen}>Settings</button>
          </li>
          <li className="menu-item">
            <button onClick={onOpen}>Sign out</button>
          </li>
        </ul>
        ) : null}
        </div>
    );
}

/**
 * Log-in button.
 * 
 * TO-DO
 */
function LogInButton() {
    return (
        <></>
    )
}

/* Returns the whole navigation bar. 
 *
 * TO-DO: Change between Profile or LogInButton depending on whether the user is logged in or not.
 */
export default function NavigationBar() {

    /*Code to access/verify current user. Look into later*/

    useEffect(() => {
        const fetchData = async () => {
          try {
            const user = auth.currentUser;
            const token = user && (await user.getIdToken());
    
            const payloadHeader = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            };
            const res = await fetch("http://localhost:3001/test", payloadHeader);
            console.log(await res.text());
          } catch (e) {
            console.log(e);
          }
        };
    
        fetchData();
    }, []);

    

    return (
      <nav>
            <div id="left-side">
                <HomeLogo />
                <NavigationLinks />
            </div>
            <Profile />
      </nav>
    )
}
