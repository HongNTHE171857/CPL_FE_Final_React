import React, { useState } from 'react';

function Header() {
  // Biến state để theo dõi trạng thái đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">conduit</a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a className={`nav-link ${isLoggedIn ? 'active' : ''}`} href="/">Home</a>
          </li>
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/login">Sign in</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">Sign up</a>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/editor"> <i className="ion-compose"></i>&nbsp;New Article </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/settings"> <i className="ion-gear-a"></i>&nbsp;Settings </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile/eric-simons">
                  <img src="" className="user-pic" alt="user" />
                  Eric Simons
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
