import React, { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

type EndGameType = {
  score: number;
  totalQuestions: number;
};

const EndGameModal = (props: EndGameType) => {
  const [show, setShow] = useState(false);
  const { score, totalQuestions } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="next">
        End Game
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Scoreboard</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Correct</td>
                <td>{score}</td>
              </tr>
              <tr>
                <td>Incorrect</td>
                <td>{totalQuestions - score}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to="/">
            <Button variant="primary" onClick={handleClose}>
              Start new game
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EndGameModal;
