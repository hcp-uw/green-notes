import logo from '../assets/binary-tree-logo.png';
import profile from '../assets/profile-button.png';

function HomeLogo() {
    return (
        <a href="./index.html" id="home-logo">
            <img id="logo" src={logo} />
            <header id="green-notes">Green Notes</header>
        </a>
    )
}

function NavigationLinks() {
    return (
        <ul id="nav-links">
            <li><a href="./note-navigation.html" className="nav-link">Notes</a></li>
            <li><a href="./collaboration.html" className="nav-link">Collaboration</a></li>
            <li><a href="./about-us.html" className="nav-link">About Us</a></li>
        </ul>
    )
}

function Profile() {
    return <a href="./profile.html"><img id="profile-icon" src={profile} /></a>;
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
