import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    //Calls endpoint to check user logged in
    fetch("http://127.0.0.1:8000/account/me")
      .then((res) => res.json())
      .then((json) => {
        setUser({
          items: json,
          DataisLoaded: true,
        });
      });
  }, []);

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
      style="box-shadow: 0 2px 8px -2px gray;"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          {user ? (
            <>
              <Link className="navbar-item" to="/exams">
                Exams
              </Link>
            </>
          ) : (
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-primary" to="/register">
                  Sign Up
                </Link>
                <Link className="button is-light" to="/login">
                  Log In
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
