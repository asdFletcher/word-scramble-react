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
  }

  initGame = () => {
    let newState = {};
    this.setState(newState);
    const gameCanvas = this.refs.gameCanvas;
    const ctx = gameCanvas.getContext("2d");
    ctx.font = "75px 'Overpass Mono'";
    let game = new Game(wordList, anagramList, gameCanvas, this.updateCallback);
    this.setState({game});
  }

  handleClick = e => {
    this[e.target.name]();
  };

  startGame = () => {
    if (this.state.game.started) {
      this.initGame();
    } else {
      this.state.game.start();
      this.setState({started: true});
      this.setState({userGuess: ""});
      this.refs.textInput.focus();
    }
  };

  resetGame = () => {
    this.state.game.resetTimer();
  };

  submitGuess = () => {
    if (this.state.game.started) {
      this.state.game.handleSubmit(this.state.userGuess);
      this.setState({userGuess: ""});
    }
    this.refs.textInput.focus();
  };

  shuffleLetters = () => {
    this.state.game.wordObj.shuffle();
    this.refs.textInput.focus();
  };

  skipWord = () => {
    this.state.game.skipWord();
    this.setState({userGuess: ""});
    this.refs.textInput.focus();
  };

  handleInput = e => {
    this.setState({ userGuess: e.target.value });
  };

  updateCallback = () => {
    this.setState({game: this.state.game});
  }

  render() {
    let game = this.state.game;
    let timeLeft = game && game.timeLeft;
    let maxTimeAllowed = game && game.maxTimeAllowed;
    let timerBarWidth = (timeLeft/maxTimeAllowed) * 600;

    return (
      <div className="gameContainer">
        <div className="timerBarContainer">
          <div className="timerBar" style={{width: timerBarWidth}}></div>
        </div>
        <div className="canvas-container">
          <h2 className="score">{game && game.started ? game.score : ""}</h2>
          <canvas className="game-canvas" ref="gameCanvas" width="705" height="190" />
        </div>

        <div className="game-message" style={{height: 25}}>{game? game.gameMessage : ""}</div>

        <div className="input-and-buttons-row">
          <div className="row1">
            <input
              className="userGuess"
              ref="textInput"
              name="userGuess"
              placeholder="enter solution here"
              value = {this.state.started ? this.state.userGuess : ""}
              onChange = {this.handleInput}
              disabled = {this.state.started ? "" : "disabled"}
              // maxlength = "10"
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
