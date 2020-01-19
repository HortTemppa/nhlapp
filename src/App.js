import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Teams from "./components/Teams";
import Home from "./components/Home";
import Players from "./components/Players";
import SingleTeam from "./components/SingleTeam";
import SinglePlayer from "./components/SinglePlayer";

import { NHLProvider } from "./components/NHLContext";

function App() {
  return (
    <NHLProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/teams">
            <Teams />
          </Route>
          <Route path="/teams/:id">
            <SingleTeam />
          </Route>
          <Route exact path="/players/">
            <Players />
          </Route>
          <Route path="/players/:id">
            <SinglePlayer />
          </Route>
        </Switch>
      </Router>
    </NHLProvider>
  );
}

export default App;
