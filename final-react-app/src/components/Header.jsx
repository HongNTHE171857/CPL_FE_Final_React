import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{fontSize: "24px", fontFamily: "Titillium Web", color: "#5cb85c"}}>conduit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar id="basic-navbar-nav pull-xs-right">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/" className="active">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login">Sign in</Nav.Link>
            <Nav.Link as={NavLink} to="/register">Sign up</Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default Header;
