import * as React from "react";
import { Navbar, Badge, Form } from "react-bootstrap";

const NavHeader = (props: { score: number; gameOver: boolean }) => {
  const { gameOver, score } = props;
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <h1>Trivialities</h1>
        </Navbar.Brand>
        <Badge variant="secondary">Score: {score}</Badge>
      </Navbar>
    </>
  );
};

export default NavHeader;
