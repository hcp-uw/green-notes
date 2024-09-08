import logo from '../../assets/binary-tree-logo.png';
import profile from '../../assets/profile-button.png';
import * as React from 'react';
import '../navbar/ProfileDropdown.css';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';
import { auth } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useRef } from "react";


/* Home logo with binary tree and Green Notes title. (Upper right corner of navigation bar) */
function HomeLogo(): JSX.Element {
    return (
        <Link to={`/`} id="home-logo">
            <img id="logo" src={logo} />
            <header id="green-notes">Green Notes</header>
        </Link>
    )
}

/* Main links to Notes, Collaboration, and About Us.*/
function NavigationLinks(): JSX.Element {
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
function Profile(): JSX.Element {
    // return <Link to={`ProfileDropdown`}><img id="profile-icon" src={profile} /></Link>;

    const [open, setOpen] = React.useState<boolean>(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const[isModal, setIsModal] = React.useState<boolean>(false);

    const onOpen = () => {
        setIsModal(!isModal);
    }

    /* dropdown disappears if you click anywhere on the screen outside of it */
    const dropdownRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = (e: any) => {
        if (open && !dropdownRef.current?.contains(e.target)) {
            setOpen(false);
        }
    }
    window.addEventListener("click", handleClickOutside);

    const user = useAuth();
    if (user === null) {
        throw new Error("user object is null");
    }
    const currentUser = user.currentUser;
    if (currentUser === null) {
        throw new Error("currentUser is null, probably not logged in");
    }

    return (
        <div ref={dropdownRef}>
            <Logout isModal={isModal} setIsModal={setIsModal}/>
            <a onClick={handleOpen}><img id="profile-icon" src={currentUser.photoURL || profile} /></a>
            {open ? (
                <ul className="menu">
                <li className="menu-item">
                    {/* TODO: figure out how to give ddown-option more height and convert other things to links */}
                    <Link to={`profile`} className='ddown-option' onClick={handleOpen}>Your Profile</Link>
                </li>
                {/* <li className="menu-item">
                    <button onClick={handleOpen}>Shared Files</button>
                </li> */}
                <li className="menu-item">
                    <Link to={`settings`} className='ddown-option' onClick={handleOpen}>Settings</Link>
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
 */
function LogInButton(): JSX.Element {
    return <Link to={`login`} id="log-in-btn">Log In</Link>;
}


/**
 * Upper right corner. Returns LogInButton if not logged in, returns Profile if logged in.
 */
function Corner(): JSX.Element {
    const used = useAuth();
    if (used === null) {
        throw new Error("user object is null");
    }

    const currentUser = used.currentUser;

    if (currentUser) {
        return <Profile />;
    } else {
        return <LogInButton />;
    }
}



/* Returns the whole navigation bar. 
 *
 * TO-DO: Change between Profile or LogInButton depending on whether the user is logged in or not.
 */
export default function NavigationBar(): JSX.Element {    
    return (
      <nav>
            <div id="left-side">
                <HomeLogo />
                <NavigationLinks />
            </div>
            <Corner />
      </nav>
    )
}
