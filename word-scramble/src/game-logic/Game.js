import { shuffle, scrambleWord } from "../util/util.js";
import Word from "./Word.js";

class Game {
  constructor(options) {
    this.wordList = options.wordList;
    this.anagramList = options.anagramList;
    this.canvas = options.gameCanvas;
    this.updateCallback = options.updateCallback;

    // game constants
    this.updateInterval = 10; // time in ms between renders
    this.initialTimeAllowed = 60 * 2 * 1000; // start time at beginning in ms
    this.maxTimeAllowed = 60 * 5 * 1000; // max allowed time in ms
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "75px 'Overpass Mono'";

    // instance constants
    this.setGameStartSetings();

    // intervals
    var animate;
    var timer; // pointer to setInterval for stopping and starting timer

    this.startAnimatingCanvas();

    // Variables for swap animations
    let oldWordScramble = 0;
    let newWordScramble;
    // let SWAPSPEED = 3.5;
    // let SWAPYAMPLITUDE = 2;

  }

  setGameToStartingState = () => {
    this.stopAllIntervals();
    this.clearCanvas();

    this.setGameStartSetings();

    this.startAnimatingCanvas();
  }

  setGameStartSetings = () => {
    this.roundCount = 0;
    this.score = 0;
    this.currentWordScramble = "";
    this.shuffledList = [];
    let initialWord = "Ocean Commotion";
    this.setWord(initialWord);
    this.gameMessage = "";
    this.startTime = 0; // time user begins playing
    this.timeLeft = this.initialTimeAllowed; // remaining time
    this.bonusTime = 0; // accumulated bonus time in ms
    this.penaltyTime = 0; // accumulated time penalty
    this.started = false; // tracks whether the game is started for initial render
  }

  startAnimatingCanvas(){
    this.animate = setInterval(this.drawCanvas, this.updateInterval);
    this.updater = setInterval(this.updateCallback, this.updateInterval);
  }

  start() {
    this.shuffledWordList = shuffle(this.wordList);
    this.startTimer();
    this.roundCount = 0;
    this.setWord(this.shuffledWordList[this.roundCount]);
  }

  startTimer = () => {
    if (!this.started) {
      this.startTime = Date.now();
    }
    this.started = true;
    this.timer = setInterval(this.incrementTime, this.updateInterval);
  }

  stopAllIntervals = () => {
    clearInterval(this.animate);
    clearInterval(this.timer);
  }

  incrementTime = () => {
    // if game hasn't started render 0 sec time elapsed
    var timeElapsed;
    if (this.started) {
      timeElapsed = Date.now() - this.startTime;
    } else {
      timeElapsed = 0;
    }
  
    // ~~~~~~ main decrement time ~~~~~~~~~
    this.timeLeft = this.initialTimeAllowed - timeElapsed + this.bonusTime - this.penaltyTime;
    // game over
    if (this.timeLeft < 0) {
      this.timeLeft = 0;
      clearInterval(this.timer); // cancel constant timer calls to this function
      this.endGame();
    }
  
    // if too much bonus time
    if (this.timeLeft > this.maxTimeAllowed) {
      // calculate extra bonus time
      var extraBonusTime = this.timeLeft - this.maxTimeAllowed;
  
      //remove the exess bonus time
      this.bonusTime -= extraBonusTime;
  
      // cap time left
      this.timeLeft = this.maxTimeAllowed;
    }
  }

  endGame = () => {
    console.log(`Game has ended`);
  }

  resetTimer = () => {
    // disable interval function calls
    this.timeLeft = this.initialTimeAllowed; // remaining time
    this.bonusTime = 0; // accumulated bonus time in ms
    this.penaltyTime = 0; // accumulated time penalty
  
    clearInterval(this.timer);
    this.started = false;
    this.bonusTime = 0;
  }

  addTime = () => {
    this.bonusTime = this.bonusTime + 15000;
    
    // cap bonus time
    var maxBonusTime = this.maxTimeAllowed - this.initialTimeAllowed;
    if (this.bonusTime > maxBonusTime) {
      this.bonusTime = maxBonusTime;
    }
  }

  subTime = () => {
    this.penaltyTime += 15000;
  }

  // clear canvas to white background , called constantly
  clearCanvas = () => {
    this.ctx.fillStyle = "rgb(225, 246, 255)";
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
  }

  // drawCanvas , called constantly
  drawCanvas = () => {
    this.clearCanvas();
    if (!this.started) {
      this.ctx.fillStyle = "navy";
      this.ctx.fillText(this.wordObj.scramble.toUpperCase(), 75, 75);
    } else {
      this.ctx.fillStyle = "navy";
      this.ctx.fillText(this.wordObj.scramble.toUpperCase(), 75, 75);
    }
  }

  // for advancing the round and setting the next word
  setNextWord = () => {
    this.roundCount++;
    if (this.roundCount === this.wordList.length - 1) {
      this.roundCount = 0;
    }
    this.currentWord = this.wordList[this.roundCount].toUpperCase();
    this.setWord(this.currentWord);
  }

  // set a specific word
  setWord = (wordStr) => {
    this.currentWord = wordStr;

    // generate scramble:
    if (wordStr === "Ocean Commotion") {
      this.currentWordScramble = wordStr;
    } else {
      this.currentWordScramble = scrambleWord(wordStr, wordStr);
    }

    // create word object
    let canvas = this.canvas;
    this.wordObj = new Word(wordStr, this.currentWordScramble, canvas.height, canvas.width);
  }

  //Button & Input Functionality
  handleSubmit = (input) => {
    input = input.toUpperCase();
    this.currentWord = this.currentWord.toUpperCase();

    if (input === this.currentWord || this.checkAnagram(input)) {
      this.addTime();
      this.addPoints();
      this.setNextWord();
      this.gameMessage = ``;
    } else if (input === ``) {
      this.gameMessage = 'Field cannot be empty';
      // handleWiggleButton(); // add wiggle
    } else {
      this.gameMessage = `Nice try, but ${input} didn't seal the deal.`;
      // handleWiggleButton(); // add wiggle
    }

  };

  addPoints = () => {
    this.score += this.currentWord.length;
  }

  checkAnagram = (altWord) => {
    if (this.anagramList.includes(altWord.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  skipWord = () => {
    if (this.started){   
      // clearInput();
      this.subTime();
      this.setNextWord();
      this.gameMessage = ``;
      // document.getElementById('alerts').innerHTML = `Looks like you had a whale of a time with that one. The correct answer was ${shuffledList[roundCount - 1].toUpperCase()}.`;
      // resetFocus();
    }
  }

  reset() {
    this.stopAllIntervals();
  }

  shuffleLetters = () => {
    this.wordObj.shuffle();
  }

}

export default Game;