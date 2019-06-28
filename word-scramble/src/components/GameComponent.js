import React from "react";
import Game from "../game-logic/Game.js";
import { wordList, anagramList } from "../lib/wordbank.js";

class GameComponent extends React.Component {
  state = {
    userGuess: "",
    game: undefined,
  };

  componentDidMount() {
    this.initGame();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    // enter key
    if (e.keyCode === 13) { this.submitGuess(); }

    // right arrow key
    if (e.keyCode === 38) { this.skipWord(); }

    // left arrow key
    if (e.keyCode === 40) { this.shuffleLetters(); }
  }

  initGame = () => {
    let newState = {};
    this.setState(newState);
    let options = {
      wordList: wordList,
      anagramList: anagramList,
      gameCanvas: this.refs.gameCanvas,
      timerCanvas: this.refs.timerCanvas,
    }
    let game = new Game(options);
    this.setState({game});
  }

  handleClick = e => {
    this[e.target.name]();
  };

  startGame = () => {
    if (this.state.game.started) {
      this.setState({userGuess: ""});
      this.state.game.handleRestart();
    } else {
      this.state.game.handleStart();
      this.setState({userGuess: ""});
    }
    setTimeout(() => {this.setFocusToInput();}, 1);
  };

  setFocusToInput = () => {
    this.refs.textInput.focus();
  }
  submitGuess = () => {
    if (this.state.game.started) {
      this.state.game.handleSubmit(this.state.userGuess);
      this.setState({userGuess: ""});
    }
    this.setFocusToInput()
  };

  shuffleLetters = () => {
    this.state.game.handleSwapButton()
    this.setFocusToInput();
  };

  skipWord = () => {
    this.state.game.handleSkipWord();
    this.setState({userGuess: ""});
    this.setFocusToInput()
  };

  handleInput = e => {
    this.setState({ userGuess: e.target.value.toUpperCase() });
  };

  render() {
    let game = this.state.game;

    return (
      <div className="gameContainer">
        <div className="timerBarContainer">
          <canvas className="timerBar" ref="timerCanvas" width='705' height='20'/>
        </div>
        <div className="canvas-container">
          <h2 className="score">{game && game.started ? game.score : ""}</h2>
          <canvas className="game-canvas" ref="gameCanvas" width='705' height='190'/>
        </div>

        <div className="game-message" style={{height: 25}}>{game? game.gameMessage : ""}</div>

        <div className="input-and-buttons-row">
          <div className="row1">
            <input
              className="userGuess"
              ref="textInput"
              name="userGuess"
              placeholder={game && game.started? "" : "enter solution here"}
              value = {game && game.started ? this.state.userGuess : ""}
              onChange = {this.handleInput}
              disabled = {game && game.started ? "" : "disabled"}
            />
            <button className="gameButton" name="submitGuess" onClick={this.handleClick}>
              submit
            </button>
            <button className="gameButton" name="shuffleLetters" onClick={this.handleClick}>
              shuffle
            </button>
            <button className="gameButton" name="skipWord" onClick={this.handleClick}>
              skip
            </button>
          </div>
          <div className="row2">
            <button className="startButton" name="startGame" onClick={this.handleClick}>
              {game && game.started ? "Restart Game" : "Start Game!"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GameComponent;
