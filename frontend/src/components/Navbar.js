import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="https://files.catbox.moe/cpfb8d.png" width="auto" height="auto" />
        </Link>

        <Link role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMain">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </Link>
      </div>

      <div id="navbarMain" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
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
                Jobs
              </Link>
              <Link to="/" className="navbar-item">
                Contact
              </Link>
              <hr className="navbar-divider" />
              <Link to="/" className="navbar-item">
                Report an issue
              </Link>
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