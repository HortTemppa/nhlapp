import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { NHLProvider } from "./components/NHLContext";

import AppContent from './components/AppContent'

function App() {

  return (
    <NHLProvider>
      <Router>
        <AppContent/>
      </Router>
    </NHLProvider>
  );
}

export default App;
