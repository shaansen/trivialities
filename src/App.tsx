import * as React from "react";
import Game from "./Game";
import StartPage from "./StartPage";
import Navheader from "./Navheader";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navheader />
      <Switch>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/">
          <StartPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
