// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~   functions     ~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function initializeCanvasWithANewWord(word) {
  // first, remove old letters
  if (allLetters.length > 0) {
    allLetters = [];
  }

  // convert word into an array of letters for easier handling
  wordArray = [];
  for (var i = 0; i < word.length; i++) {
    wordArray[i] = word[i];
  }

  // instantiate letter objects
  for (var i = 0; i < wordArray.length; i++) {
    new Letter(wordArray[i]);
  }

  // single call to display the letters in their initial position
  renderInitial();

  // wait
}

// call update
function startAnimatingCanvas() {
  // one time function calls
  animate = setInterval(drawCanvas, UPDATEINTERVAL); // call update every __ms
}

// drawCanvas , called constantly
function drawCanvas() {
  clearCanvas();
  // for each letter
  for (var i = 0; i < allLetters.length; i++) {
    // draw the letter
    allLetters[i].draw();

    //update the letter position
    allLetters[i].update();
  }
}

// clear canvas to white background , called constantly
// TODO: confirm with the group on whether we want a pure white background or not ~~~~~~~~~~~~~~~
function clearCanvas() {
  ctx.fillStyle = "rgb(225, 246, 255)";
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
}

// stop animation
// TODO: hook up to a button on the game page? is this function ever called when not in testing? ~~~~~~~~~~~~~~~
// maybe called on game over
function stopAnimate() {
  clearInterval(animate);
}

// call this function to render the letters initially
// TODO: eventually replace this with rippling letters spelling ' ocean commotion '
function renderInitial() {
  // canvas height
  var canvasHeight = document.getElementsByTagName("canvas")[0].height;

  // Y is about the middle of the canvas
  var wordY = canvasHeight / 2 + 23; // add an offset to center the word

  // get X coords
  var letterXCoordinates = generateXCoordinates(wordArray.length);

  for (var i = 0; i < allLetters.length; i++) {
    // set initial position
    allLetters[i].xInitial = letterXCoordinates[i];
    allLetters[i].yInitial = wordY;

    // immediately set x and y position to initial positions
    allLetters[i].xPosition = allLetters[i].xInitial;
    allLetters[i].yPosition = allLetters[i].yInitial;

    allLetters[i].draw();
  }
}

function handleWiggleButton() {
  var isMidSwap = false;
  for (var i = 0; i < allLetters.length; i++) {
    if (allLetters[i].xSwapping || allLetters[i].ySwapping) {
      isMidSwap = true;
    }
  }

  if (!isMidSwap) {
    for (var i = 0; i < allLetters.length; i++) {
      allLetters[i].assignWiggle();
      allLetters[i].wiggle(); // assigns a move
    }
  }
}

function handleSwapButton() {
  // is it already swapping?
  var swapIsUnderWay = false;
  for (var i = 0; i < allLetters.length; i++) {
    if (allLetters[i].xSwapping === true || allLetters[i].ySwapping === true) {
      swapIsUnderWay = true;
    }
  }

  // if not already swapping, initiate a swap
  if (!swapIsUnderWay) {
    // generate a new scramble
    // TODO: THE SCRAMBLE MIGHT NOT GO HERE!!!
    // SET THE WORD BEFORE HANDLE SWAP BUTTON
    // console.log('original word: ', shuffledList[roundCount]);
    // var newScramble = scrambledWord(roundCount);
    // console.log('newScramble: ', newScramble);

    // initiate swap
    initiateSwap();
  }
}

// take a swap command and convert it into a move command for each letter
function initiateSwap() {
  console.log("entering swap");
  console.log("existing scramble: ", oldWordScramble);
  console.log("target scramble: ", newWordScramble);

  // var newScrambleArray = []
  // for (var i = 0; i < newScramble.length; i++){
  //     newScrambleArray[i] = newScramble[i];
  // }

  var newWordScrambleArray = Array.from(newWordScramble);
  console.log("target scramble array: ", newWordScrambleArray);

  var oldWordScrambleArray = Array.from(oldWordScramble);
  console.log("current scramble: ", oldWordScrambleArray);

  var numLetters = newWordScrambleArray.length;
  // iterate thru the wordArray and generate new index positions
  var newIndexes = [];
  for (var i = 0; i < numLetters; i++) {
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
  var xCoords = generateXCoordinates(numLetters);

  // assign moves to new X Y positions
  for (var i = 0; i < allLetters.length; i++) {
    // this is where the magic happens
    var newX = xCoords[newIndexes[i]];

    // y doesn't ever change
    var newY = allLetters[i].yInitial;

    // command the move
    allLetters[i].assignSwap(newX, newY);
  }
}

// given a word length, returns an array of canvas-centered,
// evenly spaced X coordinates
function generateXCoordinates(numLetters) {
  // Global variables: letterSpacing, letterWidth

  var coordArray = [];
  // TODO: is this the best way to retrieve the canvas element?
  var canvasWidth = document.getElementsByTagName("canvas")[0].width;
  var spacing = letterSpacing + letterWidth;
  var wordLength = spacing * numLetters - letterSpacing;

  // word start X
  var wordStartX = canvasWidth / 2 - wordLength / 2 - letterWidth / 2 + 10;

  // calculate word positions and fill array
  for (var i = 0; i < numLetters; i++) {
    coordArray[i] = wordStartX + spacing * i;
  }

  return coordArray;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~ scramble word ~~~~~~~~~~~~~ // TODO: replace with calls to existing scramble functions ~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// takes a string, and returns a string that is scrambled
// string will not be equal to the original or the forbidden word
function scrambleWord(inputWord, forbiddenWord) {
  if (inputWord.length !== forbiddenWord.length) {
    console.log("serious issues");
  }

  var outputWord = "";
  var outputWordArray = [];

  var count = 0;

  var matchesInputWord = true;
  var matchesForbiddenWord = true;
  while (matchesInputWord && matchesForbiddenWord) {
    // convert to an array
    var inputWordArray = [];
    for (var i = 0; i < inputWord.length; i++) {
      inputWordArray[i] = inputWord[i];
    }

    // fill the array
    for (var i = 0; i < inputWord.length; i++) {
      // guess a random array index
      var randIndex = calcRand(inputWordArray.length);

      // save the letter
      var currentLetter = inputWordArray[randIndex];

      // and remove it from the input array
      inputWordArray.splice(randIndex, 1);

      // put it into the new array
      outputWordArray[i] = currentLetter;
    }

    // check for random output matches input word
    for (var i = 0; i < outputWordArray.length; i++) {
      if (outputWordArray[i] !== inputWord[i]) {
        matchesInputWord = false;
      }
    }

    // check for random output matches input word
    for (var i = 0; i < outputWordArray.length; i++) {
      if (outputWordArray[i] !== inputWord[i]) {
        matchesForbiddenWord = false;
      }
    }
  }

  // convert the array into a string
  for (var i = 0; i < outputWordArray.length; i++) {
    outputWord += outputWordArray[i];
  }

  return outputWord;
}

// returns random integer between 0 thru max-1
// pass word length if scrambling a word
function calcRand(max) {
  var randomInteger = Math.floor(Math.random() * max);

  return randomInteger;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
