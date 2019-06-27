import React from "react";
import Game from "../game-logic/Game.js";
import Word from "../game-logic/Word.js";
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

  focus() {
    this.textInput.current.focus();
  }

  // timer bar
  handleClick = e => {
    // console.log(`a: `, e.target.name);
    this[e.target.name]();
  };

  startGame = () => {
    // if started, reset, else start
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
    console.log(`⚓️⚓️⚓️ submit button`);
    if (this.state.game.started) {
      console.log(`🍎 submitting guess: `, this.state.userGuess);
      this.state.game.handleSubmit(this.state.userGuess);
      this.setState({userGuess: ""});
    } else {
      console.log(`submit game not started`);
    }
    this.refs.textInput.focus();
  };
  shuffleLetters = () => {
    console.log(`🍏 shuffle button`);
    this.state.game.wordObj.shuffle();
    this.refs.textInput.focus();

  };
  skipWord = () => {
    console.log(`🍒 skip button`);
    this.state.game.skipWord();
    this.setState({userGuess: ""});
    this.refs.textInput.focus();
  };
  handleInput = e => {
    // console.log(`🐤: `, e.target.value);
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
      <>
        <div className="timerBarContainer">
          <div className="timerBar" style={{width: timerBarWidth}}></div>
        </div>
        <div>Score: {game? game.score : 0}</div>
        <div>Time left: {timeLeft}</div>

        <div className="canvas-container">
          <canvas className="game-canvas" ref="gameCanvas" width="705" height="190" />
        </div>

        <div style={{height: 25}}>{game? game.gameMessage : ""}</div>

        <div className="input-and-buttons-row">
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
        <button name="startGame" onClick={this.handleClick}>
          {game && game.started ? "restart" : "start"}
        </button>

      </>
    );
  }
}
export default GameComponent;
