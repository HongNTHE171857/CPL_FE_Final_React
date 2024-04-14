import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import style from "../styles/Header.module.css";
import { useNavigate } from 'react-router-dom';
import  { useEffect, useState } from 'react';

const Header = () => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const isLoggedIn = user !== null;

  const handleLogout = () => {
    // Xử lý đăng xuất 
  };
  return (
    <Navbar bg="light" expand="lg" style={{ height: "56px" }}>
      <Container>
        <Navbar.Brand href="/" className={style["nav-brand"]}>
          conduit
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar id="basic-navbar-nav pull-xs-right">
          <Nav className="ml-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link as={NavLink} to="/" className="active">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/new-article">
                  New Article
                </Nav.Link>
                <Nav.Link as={NavLink} to="/settings">
                  Settings
                </Nav.Link>
                {user && user.username && (
                  <Nav.Link as={NavLink} to={`/profile/${user.username}`}>
                    {user.username}
                  </Nav.Link>
                )}
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/" className="active">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login">
                  Sign in
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default Header;
