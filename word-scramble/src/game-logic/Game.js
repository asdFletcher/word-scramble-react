class Game {

  constructor() {
    this.roundCount = 0;
    this.endGameScore = 0; // var endGameScore = [0];
    this.currentWordScramble = "";
    this.shuffledList = [];

    // Variables for swap animations
    let oldWordScramble = 0;
    let newWordScramble;
    let SWAPSPEED = 3.5;
    let SWAPYAMPLITUDE = 2;

    // Global Variables for Timer
    var timer; // pointer to setInterval for stopping and starting timer

    var updateInterval = 10; // time in ms between renders
    var startTime; // time user begins playing
    var initialTimeAllowed = 60 * 2 * 1000; // start time at beginning in ms
    var maxTimeAllowed = 60 * 5 * 1000; // max allowed time in ms
    var timeLeft = initialTimeAllowed; // remaining time
    var bonusTime = 0; // accumulated bonus time in ms
    var penaltyTime = 0; // accumulated time penalty
    var started = false; // tracks whether the game is started for initial render

    // Global Variables for Canvas & Canvas Creation
    // var canvasEl = document.getElementById('canvas');
    // var ctx = canvasEl.getContext("2d");
    // ctx.font = "75px 'Overpass Mono'";
    var letterSpacing = 20;
    var letterWidth = 35;
    var animate;
    var allLetters = [];
    var wordArray = [];
    var UPDATEINTERVAL = 10; //ms

  }

  print() {
    console.log(`woof: `, this.roundCount);
  }


}

export default Game;