import * as React from "react";
import { Navbar, Badge } from "react-bootstrap";

const NavHeader = (props: { score: number }) => {
  const { score } = props;
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <h1>TRIVIALITIES</h1>
        </Navbar.Brand>
        <Badge variant="secondary">Score: {score}</Badge>
      </Navbar>
    </>
  );
};

export default NavHeader;
