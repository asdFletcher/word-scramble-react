import Letter from "./Letter.js";
import { shuffle, scrambleWord } from "../util/util.js";

export default class Word {
  constructor(idealWord, scramble, canvas) {
    this.idealWord = idealWord;
    this.scramble = scramble;
    this.canvas = canvas;
    this.ctx =  this.canvas.getContext("2d");
    this.height = canvas.height;
    this.width = canvas.width;
    this.letters = [];

    this.letterSpacing = 10;
    this.letterWidth = 35;
    this.initLetters(idealWord);
  }

  initLetters = (word) => {
    let characters = Array.from(word);
    characters.forEach( char => {
      this.letters.push(new Letter(char));
    });
  }

  // given a word length, returns an array of canvas-centered,
  // evenly spaced X coordinates
  generateXCoordinates = () => {
    let numLetters = this.idealWord.length;
    let coordArray = [];
    let spacing = this.letterSpacing + this.letterWidth;
    let wordLength = spacing * numLetters - this.letterSpacing;

    // word start X
    var wordStartX = this.width / 2 - wordLength / 2 - this.letterWidth / 2 + 10;

    // calculate word positions and fill array
    for (var i = 0; i < numLetters; i++) {
      coordArray[i] = wordStartX + spacing * i;
    }
    return coordArray;
  }

  // call this function to render the letters initially
  // TODO: eventually replace this with rippling letters spelling ' ocean commotion '
  asssignCoordinatesToLetters = () => {
    // Y is about the middle of the canvas
    var wordY = this.height/2 + 23; // add an offset to center the word

    // get X coords
    var letterXCoordinates = this.generateXCoordinates();
    let letters = this.letters;

    for (var i = 0; i < this.letters.length; i++){
        // set initial position
        letters[i].xInitial = letterXCoordinates[i];
        letters[i].yInitial = wordY;

        // immediately set x and y position to initial positions
        letters[i].xPosition = letters[i].xInitial;
        letters[i].yPosition = letters[i].yInitial;

        // letters[i].draw();
    }
  }

  handleWiggleButton = () => {
    console.log(`🍊 in Word handle wiggle button`);
    // check if the word is already wiggling
    this.isMidSwap = false;
    for (let i = 0; i < this.letters.length; i++){
      if (this.letters[i].xSwapping || this.letters[i].ySwapping){
        this.isMidSwap = true;
      }
    }
    
    // if it is not, wiggle it
    if (!this.isMidSwap) {
      for (let i = 0; i < this.letters.length; i++){
        this.letters[i].assignWiggle();
        this.letters[i].wiggle();
      }
    }
  }

  handleSwapButton = () => {
    // is it already swapping?
    var swapIsUnderWay = false;
    for (var i = 0; i < this.letters.length; i++){
      if (this.letters[i].xSwapping === true || this.letters[i].ySwapping === true){
        swapIsUnderWay = true;
      }
    }
    
    // if not already swapping, initiate a swap
    if (!swapIsUnderWay){
      this.initiateSwap();
    }
  }

  initiateSwap = () => {
    console.log('entering swap');
    console.log('existing scramble: ', this.oldWordScramble);
    console.log('target scramble: ', this.newWordScramble);

    // var newScrambleArray = []
    // for (var i = 0; i < newScramble.length; i++){
    //     newScrambleArray[i] = newScramble[i];
    // }

    var newWordScrambleArray = Array.from(this.newWordScramble);
    console.log('target scramble array: ', newWordScrambleArray);
    
    var oldWordScrambleArray = Array.from(this.oldWordScramble);
    console.log('current scramble: ', oldWordScrambleArray);

    var numLetters = newWordScrambleArray.length;
    // iterate thru the wordArray and generate new index positions
    var newIndexes = [];
    for (var i = 0; i < numLetters; i++){
      // find the index of the letter in the new word
      var currentLetter = oldWordScrambleArray[i];

      // newIndex is the index of the current letter in the new array
      var newIndex = newWordScrambleArray.indexOf(currentLetter);

      // save the new index in the array that keeps track of new positions
      newIndexes[i] = newIndex;

      // remove instance of that letter, -1 will never be in any letter
      // because indexOf returns the first instance of the thing in the array
      newWordScrambleArray[newIndex] = -1;
    }
    
    // generate new X Y positions
    var xCoords = this.generateXCoordinates(numLetters);

    // assign moves to new X Y positions
    for (var i = 0; i < this.letters.length; i++){
      // this is where the magic happens
      var newX = xCoords[newIndexes[i]];

      // y doesn't ever change
      var newY = this.letters[i].yInitial;

      // command the move
      this.letters[i].assignSwap(newX, newY);
    }
  }

  calcPositions = () => {
    // this.generateXCoordinates();
    this.asssignCoordinatesToLetters();
  }

  handleShuffleLetters = () => {
    this.scramble = scrambleWord(this.scramble, this.idealWord);
  }

  drawWord = () => {
    this.ctx.fillStyle = "navy";

    this.calcPositions();
    for (let i = 0; i < this.letters.length; i++) {
      let letter = this.letters[i];
      letter.update();
      this.ctx.fillText(letter.letter, letter.xPosition, letter.yPosition);
    }

  }

}