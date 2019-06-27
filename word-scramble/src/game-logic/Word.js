import Letter from "./Letter.js";
import { shuffle, scrambleWord } from "../util/util.js";

export default class Word {
  constructor(idealWord, scramble, height, width) {
    this.idealWord = idealWord;
    this.scramble = scramble;
    this.height = height;
    this.width = width;
    this.letters = [];

    this.letterSpacing = 20;
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
    let numLetters = this.word.length;
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
  renderInitial = () => {
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

        letters[i].draw();
    }
  }

  drawLetters = () => {

  }

  shuffle = () => {
    this.scramble = scrambleWord(this.scramble, this.idealWord);
  }

}