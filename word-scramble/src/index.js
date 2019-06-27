import React from "react";
import ReactDOM from "react-dom";
import Nav from "./components/Nav.js";
import Title from "./components/Title.js";
import GameComponent from "./components/GameComponent.js";

import "./styles/reset.css";
import "./styles/base.css";
import "./styles/game.scss";

function App() {
  return (
    <div className="App">
      <Title />
      <Nav />
      <GameComponent />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
