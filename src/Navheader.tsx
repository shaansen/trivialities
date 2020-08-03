import * as React from "react";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavHeader = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <NavLink to="/">
          <h1 className="header-text">TRIVIALITIES</h1>
        </NavLink>
      </Navbar>
    </>
  );
};

export default NavHeader;
