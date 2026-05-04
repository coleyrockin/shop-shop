import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

function Nav() {
  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const navLinks = Auth.loggedIn() ? (
    <ul className="flex-row">
      <li>
        <Link to="/orderHistory">Order history</Link>
      </li>
      <li>
        <a href="/" onClick={handleLogout}>
          Log out
        </a>
      </li>
    </ul>
  ) : (
    <ul className="flex-row">
      <li>
        <Link to="/signup">Sign up</Link>
      </li>
      <li>
        <Link to="/login">Log in</Link>
      </li>
    </ul>
  );

  return (
    <header className="flex-row space-between">
      <h1>
        <Link to="/">
          <span role="img" aria-label="Shopping bag">
            🛍️
          </span>{' '}
          Shop-Shop
        </Link>
      </h1>
      <nav aria-label="Primary">{navLinks}</nav>
    </header>
  );
}

export default Nav;
