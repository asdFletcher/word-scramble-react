import React from "react";
import Game from "../game-logic/Game.js";
import { wordList, anagramList } from "../lib/wordbank.js";
import SubmitScore from './SubmitScore.js';
import { connect } from 'react-redux';
import * as actions from '../store/actions.js';

import { Redirect } from 'react-router-dom'

const If = props => {
  return !!props.condition ? props.children : null;
};


const mapStateToProps = (state) => {
  console.log(`game component MSTP: `, state);
  return {
    score: state.userScore,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateScore: (payload) => dispatch(actions.updateScore(payload)),
  }
}

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
      endGameCallback: this.endGameCallback,
      updateScoreCallback: this.updateScore,
    }
    let game = new Game(options);
    this.setState({game});
  }

  endGameCallback = (game) => {
    this.setState({game});
  }

  updateScore = (score) => {
    this.props.updateScore(score);
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
    if (this.state.game.started && !this.state.game.isOver) {
      this.state.game.handleSubmit(this.state.userGuess);
      this.setState({userGuess: ""});
      this.setFocusToInput();
    }
  };

  shuffleLetters = () => {
    if (this.state.game.started && !this.state.game.isOver) {
      this.state.game.handleSwapButton()
      this.setFocusToInput();
    }
  };

  skipWord = () => {
    if (this.state.game.started && !this.state.game.isOver) {
      this.state.game.handleSkipWord();
      this.setState({userGuess: ""});
      this.setFocusToInput();
    }
  };

  handleInput = e => {
    this.setState({userGuess: e.target.value.toUpperCase()});
  };

  render() {
    let game = this.state.game;
    if (game) {
      var gameMessage = game? game.gameMessage : "";
      var score = game.started ? game.score : "";
      var startButtonText = game.started ? "Restart Game" : "Start Game!";
      var placeholderText = game.started? "" : "enter solution here";
      var disableInput = !game.started || game.isOver ? "disabled" : "";
      var canvasDisplay = game.isOver? "none" : "";
      var canvasContainerClasses = game.isOver? "canvas-container gameOver" : "canvas-container active";
    }

    let canvasWidth = 705;
    let canvasHeight = 190;
    return (
      <div className="game-container">
        <div className="timer-bar-container">
          <canvas className="timer-bar" ref="timerCanvas" width={canvasWidth} height='20'/>
        </div>
        <div className={canvasContainerClasses}>
          <h2 className="score">{score}</h2>
          <If condition={game && game.isOver}>
              <SubmitScore width={canvasWidth} height={canvasHeight}/>
          </If>
          <canvas className="game-canvas" ref="gameCanvas" width={canvasWidth} height={canvasHeight} style={{display: canvasDisplay}}/>
        </div>


        <div className="game-message">{gameMessage}</div>

        <div className="input-and-buttons-row">
          <div className="row1">
            <input
              className="user-guess"
              ref="textInput"
              name="userGuess"
              placeholder={placeholderText}
              value={this.state.userGuess}
              onChange={this.handleInput}
              disabled={disableInput}/>
            <button 
              className="gameButton" 
              name="submitGuess" 
              onClick={this.handleClick}>
              Submit
            </button>
            <button 
              className="gameButton" 
              name="shuffleLetters" 
              onClick={this.handleClick}>
              Shuffle
            </button>
            <button 
              className="gameButton" 
              name="skipWord" 
              onClick={this.handleClick}>
              Skip
            </button>

          </div>
          <div className="row2">
            <button className="startButton" name="startGame" onClick={this.handleClick}>
              {startButtonText}
            </button>
          </div>
        </div>
        
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameComponent);
