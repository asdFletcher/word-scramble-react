import React from "react";
import ReactDOM from "react-dom";
import Nav from "./components/Nav.js";
import Title from "./components/Title.js";
import { BrowserRouter, Route } from 'react-router-dom';

import HowToPlay from "./components/HowToPlay.js";
import GameComponent from "./components/GameComponent.js";
import HiScores from "./components/HiScores.js";
import AboutUs from "./components/AboutUs.js";

import "./styles/reset.css";
import "./styles/styles.scss";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Title />
          <div className="nav-and-game-container">
            <Nav />
            <Route exact path="/how-to-play" component={HowToPlay} />
            <Route exact path="/play-game" component={GameComponent} />
            <Route exact path="/hi-scores" component={HiScores} />
            <Route exact path="/about-us" component={AboutUs} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


