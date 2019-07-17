import React from "react";
import ReactDOM from "react-dom";
import Nav from "./components/Nav.js";
import Title from "./components/Title.js";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';

import HowToPlay from "./components/HowToPlay.js";
import GameComponent from "./components/GameComponent.js";
import HiScores from "./components/HiScores.js";
import AboutUs from "./components/AboutUs.js";

import "./styles/reset.css";
import "./styles/styles.scss";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Title />
            <div className="nav-and-content-container">
              <Nav />
              <Switch>
                <Route exact path="/how-to-play" component={HowToPlay} />
                <Route exact path="/play-game" component={GameComponent} />
                <Route exact path="/hi-scores" component={HiScores} />
                <Route exact path="/about-us" component={AboutUs} />
                <Route path="/" component={GameComponent} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// export default App;

