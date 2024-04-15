import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer({ appName }) {
  return (
    <div className="footer">
      <div className="container">
        <Link to="/" className="logo-font">
          conduit
        </Link>
        <span className="attribution">
          An interactive learning project from{" "}
          <a href="https://thinkster.io"  style={{color: "rgb(187, 187, 187)"}}>Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </div>
  );
}

export default Footer;
