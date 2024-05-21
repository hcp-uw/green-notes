import logo from '../assets/binary-tree-logo.png';
import profile from '../assets/profile-button.png';
import { Link } from 'react-router-dom';

function HomeLogo() {
    return (
        <Link to={`/`} id="home-logo">
            <img id="logo" src={logo} />
            <header id="green-notes">Green Notes</header>
        </Link>
    )
}

function NavigationLinks() {
    return (
        <ul id="nav-links">
            <li><Link to={`notes`} className="nav-link">Notes</Link></li>
            <li><Link to={`collaboration`} className="nav-link">Collaboration</Link></li>
            <li><Link to={`about-us`} className="nav-link">About Us</Link></li>
        </ul>
    )
}

function Profile() {
    return <Link to={`profile`}><img id="profile-icon" src={profile} /></Link>;
}

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
