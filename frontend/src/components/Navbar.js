import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const { user, logout } = useAuth();
  
  const toggleIsActive = () => setIsActive(!isActive);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="https://files.catbox.moe/cpfb8d.png" width="auto" height="auto" />
        </Link>

        <Link 
        role="button" 
        className={`navbar-burger ${isActive ? 'is-active' : ''}`} 
        aria-label="menu" 
        aria-expanded="false" 
        data-target="navbarMain"
        onClick={toggleIsActive}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </Link>
      </div>

      <div id="navbarMain" className={`navbar-menu ${isActive ? 'is-active' : ''} `}>
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home {user ? `(${user.email})` : ''}
          </Link>

          <Link to="/tasks" className="navbar-item">
            Tasks
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <Link to="/" className="navbar-link">
              More
            </Link>

            <div className="navbar-dropdown">
              <Link to="/" className="navbar-item">
                About
              </Link>
              <Link to="/" className="navbar-item">
                Contact
              </Link>
              <hr className="navbar-divider" />
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link className="button is-primary" to="/signup">
                <strong>Sign up</strong>
              </Link>
              <Link className="button is-light" to="/login">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}