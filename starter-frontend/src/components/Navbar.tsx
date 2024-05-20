//@ts-nocheck
import logo from '../assets/binary-tree-logo.png';
import profile from '../assets/profile-button.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import  auth  from '../config/firebase';
import { useEffect } from 'react';

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
    return <Link to={`profile`}><img id="profile-icon" src={profile} /></Link>;
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

    const { currentUser } = useAuth();

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
            const res = await fetch("http://localhost:3001", payloadHeader);
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
