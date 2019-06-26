import React from "react";
import Game from "../game-logic/Game.js";

class GameComponent extends React.Component {
  state = {
    userGuess: ""
  };

  componentDidMount() {
    const gameCanvas = this.refs.gameCanvas;
    const ctx = gameCanvas.getContext("2d");
    ctx.font = "75px 'Overpass Mono'";
    console.log(`ctx: `, ctx);
    ctx.fillText("test", 210, 75);

    let a = new Game();
    this.setState({game: new Game()});
  }
  // timer bar
  handleClick = e => {
    // console.log(`a: `, e.target.name);
    this[e.target.name]();
  };

  startGame = () => {
    console.log(`🍊`);
    this.state.game.print()

  };
  submitGuess = () => {
    console.log(`🍎 submitting guess: `, this.state.userGuess);
  };
  shuffleLetters = () => {
    console.log(`🍏`);
  };
  skipWord = () => {
    console.log(`🍓`);
  };
  handleInput = e => {
    // console.log(`🐤: `, e.target.value);
    this.setState({ userGuess: e.target.value });
  };

  render() {
    return (
      <>
        <canvas ref="gameCanvas" width="705" height="190" />
        <input
          name="userGuess"
          // value="enter solution here"
          placeholder="enter solution here"
          onChange={this.handleInput}
        />
        <button name="startGame" onClick={this.handleClick}>
          start game
        </button>
        <button name="submitGuess" onClick={this.handleClick}>
          submit
        </button>
        <button name="shuffleLetters" onClick={this.handleClick}>
          shuffle
        </button>
        <button name="skipWord" onClick={this.handleClick}>
          skip
        </button>
      </>
    );
  }
}
export default GameComponent;
