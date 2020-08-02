import * as React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { OptionsType } from "./API";

const constructParams = (options: OptionsType) => {
  return Object.keys(options)
    .map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(options[key]);
    })
    .join("&");
};

const StartPage = () => {
  const [number, setNumber] = useState(5);
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");
  const [type, setType] = useState("any");
  const options = { number, category, difficulty, type };

  return (
    <div className="start-page">
      <Form>
        <Form.Group>
          <Form.Label>Number of questions</Form.Label>
          <Form.Control
            value={number}
            as="select"
            onChange={(event) => setNumber(+event.target.value)}>
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}>
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select difficulty</Form.Label>
          <Form.Control
            as="select"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}>
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select type</Form.Label>
          <Form.Control as="select" value={type} onChange={(event) => setType(event.target.value)}>
            <option value="any">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </Form.Control>
        </Form.Group>
        <Link to={`/game?${constructParams(options)}`}>
          <Button className="start">Start</Button>
        </Link>
      </Form>
    </div>
  );
};

export default React.memo(StartPage);
