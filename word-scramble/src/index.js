import React from "react";
import ReactDOM from "react-dom";
import Nav from "./components/Nav.js";
import Title from "./components/Title.js";
import GameComponent from "./components/GameComponent.js";

import "./styles/reset.css";
import "./styles/base.scss";
import "./styles/game.scss";

function App() {
  return (
    <div className="App">
      <Title />
      <div className="nav-and-game-container">
        <Nav />
        <GameComponent />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
