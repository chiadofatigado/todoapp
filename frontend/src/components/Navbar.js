export default function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src="https://files.catbox.moe/cpfb8d.png" width="auto" height="auto" />
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMain">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarMain" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">
            Home
          </a>

          <a className="navbar-item">
            Tasks
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              More
            </a>

            <div className="navbar-dropdown">
              <a className="navbar-item">
                About
              </a>
              <a className="navbar-item">
                Jobs
              </a>
              <a className="navbar-item">
                Contact
              </a>
              <hr className="navbar-divider" />
              <a className="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary" href="/signup">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light" href="/login">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}