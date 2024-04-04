import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer({ appName }) {
  return (
    <div className="container">
      <Link to="/" className="logo-font">
        conduit
      </Link>
      <span className="attribution">
        An interactive learning project from{" "}
        <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed
        under MIT.
      </span>
    </div>
  );
}

export default Footer;
