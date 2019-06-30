import { shuffle, scrambleWord } from "../util/util.js";
// import Word from "./Word.js";
import Letter from "./Letter.js";

class Game {
  constructor(options) {
    this.wordList = options.wordList;
    this.anagramList = options.anagramList;
    this.gameCanvas = options.gameCanvas;
    this.timerCanvas = options.timerCanvas;
    this.endGameCallback = options.endGameCallback;

    // game constants
    this.updateInterval = 10; // time in ms between renders
    this.initialTimeAllowed = 60 * 2 * 1000; // start time at beginning in ms
    this.maxTimeAllowed = 60 * 5 * 1000; // max allowed time in ms
    this.gameCtx = this.gameCanvas.getContext("2d");
    this.gameCtx.font = "75px 'Overpass Mono'";
    this.timerCtx = this.timerCanvas.getContext("2d");
    this.letterWidth = 35;
    this.letters = [];

    // instance constants
    this.setGameStartSetings();

    this.startAnimatingCanvas();
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~ game helper functions ~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  setGameStartSetings = () => {
    this.roundCount = 0;
    this.score = 0;
    this.currentWordScramble = "";
    this.shuffledWordList = [];
    this.setWord("Ocean Commotion");
    this.gameMessage = "";
    this.startTime = 0;
    this.timeLeft = this.initialTimeAllowed;
    this.bonusTime = 0;
    this.penaltyTime = 0;
    this.started = false;
    this.isOver = false;
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
    let timeElapsed;
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
      let extraBonusTime = this.timeLeft - this.maxTimeAllowed;
      //remove the exess bonus time
      this.bonusTime -= extraBonusTime;
      // cap time left
      this.timeLeft = this.maxTimeAllowed;
    }
  }

  endGame = () => {
    this.isOver = true;
    this.endGameCallback(this);
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
    let maxBonusTime = this.maxTimeAllowed - this.initialTimeAllowed;
    if (this.bonusTime > maxBonusTime) {
      this.bonusTime = maxBonusTime;
    }
  }

  subTime = () => {
    this.penaltyTime += 15000;
  }

  checkAnagram = (altWord) => {
    if (this.anagramList.includes(altWord.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  addPoints = () => {
    this.score += this.idealWord.length;
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~ game inputs ~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~
  handleStart() {
    this.shuffledWordList = shuffle(this.wordList);
    this.startTimer();
    this.roundCount = 0;
    this.setWord(this.shuffledWordList[this.roundCount]);
  }

  handleRestart = () => {
    this.stopAllIntervals();
    this.clearCanvases();
    this.setGameStartSetings();
    this.startAnimatingCanvas();
  }

  handleSubmit = (input) => {
    input = input.toUpperCase();
    this.idealWord = this.idealWord.toUpperCase();

    if (input === this.idealWord || this.checkAnagram(input)) {
      this.addTime();
      this.addPoints();
      this.setNextWord();
      this.gameMessage = ``;
    } else if (input === ``) {
      this.gameMessage = 'Field cannot be empty';
      this.handleWiggleButton();
    } else {
      this.gameMessage = `Nice try, but ${input} didn't seal the deal.`;
      this.handleWiggleButton();
    }
  };

  handleSkipWord = () => {
    if (this.started){   
      this.subTime();
      this.setNextWord();
      this.gameMessage = `Looks like you had a whale of a time with that one. The correct answer was ${this.shuffledWordList[this.roundCount - 1].toUpperCase()}.`;
    }
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~ controlling the word ~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
    // generate scramble:
    if (wordStr === "Ocean Commotion") {
      this.letterSpacing = 10;
      this.currentWordScramble = wordStr;
    } else {
      this.letterSpacing = 20;
      wordStr = wordStr.toUpperCase();
      this.currentWordScramble = scrambleWord(wordStr, wordStr);
    }
    this.idealWord = wordStr;
    this.initializeCanvasWithANewWord(this.currentWordScramble);
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~ controlling canvases ~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  startAnimatingCanvas(){
    this.animate = setInterval(this.drawCanvases, this.updateInterval);
  }

  // drawCanvas , called constantly
  drawCanvases = () => {
    this.clearCanvases();
    this.drawTimer();
    this.drawWord();
  }

  // clear canvases , called constantly
  clearCanvases = () => {
    // clear timer canvas
    this.timerCtx.clearRect(0, 0, this.timerCanvas.width, this.timerCanvas.height);

    // clear game canvas
    this.gameCtx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
  }

  drawTimer = () => {
    // let timerBarWidth = Math.floor((this.timeLeft/this.maxTimeAllowed) * this.timerCanvas.width);
    // if (timerBarWidth % 2 === 1) { timerBarWidth++; }
    // let offset = Math.floor((this.timerCanvas.width - timerBarWidth) / 2);

    // let grd = this.timerCtx.createLinearGradient(0, 0, 0, this.timerCanvas.height);
    // grd.addColorStop(0, 'rgb(37, 207, 37)');
    // grd.addColorStop(1, 'rgb(18, 105, 18)');
    // this.timerCtx.fillStyle = grd;
    // this.timerCtx.fillRect(offset,0,timerBarWidth,this.timerCanvas.height);
    // this.timerCtx.fillRect(0,0,this.timerCanvas.width,this.timerCanvas.height)
    
    let width = Math.floor((this.timeLeft/this.maxTimeAllowed) * 675);

    if (width % 2 === 1) {
      width++;
    }
    this.timerCanvas.width = width;
    console.log(``);
  }

  initializeCanvasWithANewWord = (word) => {
    this.letters = [];

    for(let i = 0; i < word.length; i++) {
      this.letters.push(new Letter(word[i]))
    }

    // single call to display the letters in their initial position
    this.renderInitial();
  }

  // drawCanvas , called constantly
  drawWord = () => {
    for (let i = 0; i < this.letters.length; i++){
        // draw the letter
        this.letters[i].draw(this.gameCtx);
        //update the letter position
        this.letters[i].update();
    }
  }

  // call this function to render the letters initially
  renderInitial = () => {
    // Y is about the middle of the canvas
    let wordY = this.gameCanvas.height/2 + 23; // add an offset to center the word

    // get X coords
    let letterXCoordinates = this.generateXCoordinates(this.letters.length);

    for (let i = 0; i < this.letters.length; i++){
        // set initial position
        this.letters[i].xInitial = letterXCoordinates[i];
        this.letters[i].yInitial = wordY;

        // immediately set x and y position to initial positions
        this.letters[i].xPosition = this.letters[i].xInitial;
        this.letters[i].yPosition = this.letters[i].yInitial;

        this.letters[i].draw(this.gameCtx);
    }
  }

  handleWiggleButton = () => {
    let isMidSwap = false;
    for (let i = 0; i < this.letters.length; i++){
      if (this.letters[i].xSwapping || this.letters[i].ySwapping){
        isMidSwap = true;
      }
    }
    if (!isMidSwap) {
      for (let i = 0; i < this.letters.length; i++){
        this.letters[i].assignWiggle();
        this.letters[i].wiggle(); // assigns a move
      }
    }    
  }

  handleSwapButton = () => {
    this.oldWordScramble = this.currentWordScramble;
    this.currentWordScramble = scrambleWord(this.idealWord, this.oldWordScramble);

    // is it already swapping?
    let swapIsUnderWay = false;
    for (let i = 0; i < this.letters.length; i++){
        if (this.letters[i].xSwapping === true || this.letters[i].ySwapping === true){
            swapIsUnderWay = true;
        }
    }
    // if not already swapping, initiate a swap
    if (!swapIsUnderWay){
        // initiate swap
        this.initiateSwap();
    }
  }
  
  // take a swap command and convert it into a move command for each letter
  initiateSwap = () => {
    let currentWordScrambleArray = Array.from(this.currentWordScramble);
    let oldWordScrambleArray = Array.from(this.oldWordScramble);

    let numLetters = currentWordScrambleArray.length;
    // iterate thru the wordArray and generate new index positions
    let newIndexes = [];
    for (let i = 0; i < numLetters; i++){

        // find the index of the letter in the new word
        let currentLetter = oldWordScrambleArray[i];

        // newIndex is the index of the current letter in the new array
        let newIndex = currentWordScrambleArray.indexOf(currentLetter);

        // save the new index in the array that keeps track of new positions
        newIndexes[i] = newIndex;

        // remove instance of that letter, -1 will never be in any letter
        // because indexOf returns the first instance of the thing in the array
        currentWordScrambleArray[newIndex] = -1;
    }
    
    // generate new X Y positions
    let xCoords = this.generateXCoordinates(numLetters);

    // assign moves to new X Y positions
    for (let i = 0; i < this.letters.length; i++){

        // this is where the magic happens
        let newX = xCoords[newIndexes[i]];

        // y doesn't ever change
        let newY = this.letters[i].yInitial;

        // command the move
        this.letters[i].assignSwap(newX, newY);
    }
  }

  // given a word length, returns an array of canvas-centered,
  // evenly spaced X coordinates
  generateXCoordinates = (numLetters) =>{
    let coordArray = [];

    let spacing = this.letterSpacing + this.letterWidth;
    let wordLength = (spacing * numLetters) - this.letterSpacing;

    // word start X
    let wordStartX = (this.gameCanvas.width / 2) - (wordLength / 2) - this.letterWidth/2 + 10;

    // calculate word positions and fill array
    for (let i = 0; i < numLetters; i++){
        coordArray[i] = wordStartX + spacing * i;
    }
    return coordArray;
  }
  

}

export default Game;