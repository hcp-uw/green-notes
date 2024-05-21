//@ts-nocheck
import logo from '../assets/binary-tree-logo.png';
import profile from '../assets/profile-button.png';
import * as React from 'react';
import '../components/ProfileDropdown.css';
import { Link } from 'react-router-dom';

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
    // Try to make it a button, make on-state a dropdown

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div>
        <a data-alignment="right" onClick={handleOpen}><img id="profile-icon" src={profile} /></a>
        {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button>Your Profile</button>
          </li>
          <li className="menu-item">
            <button>Shared Files</button>
          </li>
          <li className="menu-item">
            <button>Settings</button>
          </li>
          <li className="menu-item">
            <button>Sign out</button>
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
