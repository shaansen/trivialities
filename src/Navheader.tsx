import * as React from "react";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavHeader = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <NavLink to="/">
            <h1>TRIVIALITIES</h1>
          </NavLink>
        </Navbar.Brand>
      </Navbar>
    </>
  );
};

export default NavHeader;
