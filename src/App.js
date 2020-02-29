import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Home from "./components/Home";
import SingleTeam from "./components/SingleTeam";

import { NHLProvider } from "./components/NHLContext";

function App() {
  return (
    <NHLProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/teams/:id">
            <SingleTeam />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </NHLProvider>
  );
}

export default App;
