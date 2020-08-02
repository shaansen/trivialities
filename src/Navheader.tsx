import * as React from "react";
import { Navbar } from "react-bootstrap";

const NavHeader = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <h1>TRIVIALITIES</h1>
        </Navbar.Brand>
      </Navbar>
    </>
  );
};

export default NavHeader;
