// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~ letter class ~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Letter {
  constructor(letter) {
    this.letter = letter;
    this.xPosition = 0;
    this.yPosition = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;

    this.xInitial = 0;
    this.yInitial = 0;

    this.xMoving = false;
    this.yMoving = false;
    this.xDestination = 0;
    this.yDestination = 0;

    this.wiggling = false;
    this.wiggleCount = 0;

    this.ySwapping = false;
    this.xSwapping = false;

    this.SWAPYAMPLITUDE = 2;
    this.SWAPSPEED = 3.5;
  }

  // allLetters.push(this);
  // TODO: implement wave functionality 
  //this.age

  rand = (min, max) => {
    // credit https://stackoverflow.com/questions/8611830/javascript-random-positive-or-negative-number
    // TODO: add this credit to the readme.md ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var rand = (Math.floor(Math.random()*(max-min))+2) * (Math.random() < 0.5 ? -1 : 1);
    return rand;
  }

  // a wiggle is a short move to a random place close by
  wiggle = () => {
    var max = 20; 
    var min = 10;
    var randomX = this.rand(min, max);
    var randomY = this.rand(min, max);
    // confine the random number to be within 10px of the initial position
    var close = false;
    while (!close){
      // calculate move distance
      var xDistFromHome = (this.xPosition + randomX) - this.xInitial;
      var yDistFromHome = (this.yPosition + randomY) - this.yInitial;

      if (Math.abs(xDistFromHome) < 12 && Math.abs(yDistFromHome) < 12){
          close = true;
      } else {
          randomX = this.rand(min, max);
          randomY = this.rand(min, max);
      }
    }
    this.assignMove(this.xPosition + randomX, this.yPosition + randomY);
  }

  assignWiggle = () => {
    this.wiggleCount = 2;
    this.wiggling = true;
    this.xMoving = true;
    this.yMoving = true;
  }

  assignMove = (endX, endY) => {
    this.xMoving = true;
    this.yMoving = true;
    this.xDestination = endX;
    this.yDestination = endY;
  }

  assignSwap = (endX, endY) => {
    this.xSwapping = true;
    this.ySwapping = true;

    this.xMoving = true;
    this.yMoving = true;

    this.xDestination = endX;
    this.yDestination = endY;
  }

  draw(ctx) {
    ctx.fillStyle = "navy"; // set the letter color
    // draw the letter at current position
    ctx.fillText(`${this.letter}`, this.xPosition, this.yPosition);
  }

  incrementPosition = () => {
    var xDistance = this.xDestination - this.xPosition;
    var yDistance = this.yDestination - this.yPosition;

    // x motion for all moves
    if (Math.abs(xDistance) > 3 ) {
      this.xPosition = this.xPosition + this.xSpeed * Math.sign(xDistance);
    } else {
      // destination reached
      this.xMoving = false;
      this.xPosition = this.xDestination; // snap to destination
    }

    // y motion when wiggling
    if (this.wiggling){
      if (Math.abs(yDistance) > 3 ) {
        this.yPosition = this.yPosition + this.ySpeed * Math.sign(yDistance);
      } else {
        // destination reached
        this.yMoving = false;
        this.yPosition = this.yDestination; // snap to destination
      }
    }

    // y motion when swapping
    if (this.ySwapping){
      if (Math.abs(xDistance) > 1 ) {
        this.yPosition = this.yPosition + this.ySpeed;
      } else {
        // destination reached
        this.yMoving = false; // stop moving
        this.yPosition = this.yDestination; // snap to desired destination
      }
    }
  }

  executeWiggleLogic = () => {
    // decrement wiggles
    this.wiggleCount--;

    // if it still has more wiggling to do
    if (this.wiggleCount > 0) {
      this.wiggle();
    }
        
    // if it is done with all wiggles
    if (this.wiggleCount === 0) {
      this.xMoving = false;
      this.yMoving = false;
      this.assignMove(this.xInitial,this.yInitial); // return home
    }

    // if it has arrived at home, toggle off wiggle
    if (this.xPosition === this.xInitial && this.yPosition === this.yInitial && !this.wiggling){
      this.wiggling = false;
    }
  }

  calcSwapYVelocity = () => {
    // if swapping
    // y speed is a function of the remaining X distance
    // if x distance < 50 %, y velocity is upwards
    // if x distance > 50 %, y velocity is downwards

    // for triangular motion, y velocity is constant 
    // for circular motion, y velocity scales with x distance

    // x -------.-------->
    // y .              .
    //    .           .
    //          ^
    // max displacement = xDistance total travel * 1 (1 for circular motion)
    // 
    // for circular things trig functions can come in handy
    // For y velocity: at the start, we will use  cos(0) = 1 (Fast increasing Y)
    // For y velocity: at the middle, we will use cos(90) = 0 (sign change on Y)
    // For y velocity: at the end, we will use    cos(180) = -1 (Fast decreasing Y)
    // to calculate the "angle" to feed our cos, we need to convert X distance
    // "angle", or X positin, goes from 0 at start to 180 at end
    // we can calculate the % from 0 to 100% that x is on on it's journey
    // using: % trip completed: (this.xPosition - this.xInitial) / totalXTravel
    // to convert 0.0 to 1.0 to 0 to 180, we multiply by 180
    // so at 0% we'll be at 0, at 50% we'll be at 90, and 100% we'lll be at 180
    // However: JS uses radians, so convert our angle to radians
    // we need to scale 0 to 100, to 0 to pi() , or 3.1415
    // to convert 0.0 to 1.0 to 0 to PI, we multiply by PI

    // yVelocity = Math.cos(angle); <-- this normalized y velocity
    // which ranges from 0 to 1, which is too low
    // so we need to scale it by some arbitrary factor to make the motion visible

    var totalXTravel = this.xDestination - this.xInitial

    // if letter isn't already at it's destination
    if (Math.abs(totalXTravel) > 0) {
        var pctComplete = (this.xPosition - this.xInitial) / totalXTravel;
        var angle = pctComplete * Math.PI; // in radians
        var yVelocity = Math.cos(angle) * this.SWAPYAMPLITUDE;
    } else {
        var yVelocity = 0;
    }

    // apply new velocity to the letter
    this.ySpeed = yVelocity;
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // core move logic is this update function
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  update = () => {
    // if swapping
    // disable wiggling, and set speed higher
    if (this.xSwapping || this.ySwapping) {
      this.xSpeed = this.SWAPSPEED;
      this.calcSwapYVelocity();
      this.wiggling = false;
    }

    // if wiggling, set speed a little slower
    if (this.wiggling) {
      this.xSpeed = 0.5;
      this.ySpeed = 0.5;
    }

    if (this.xMoving || this.yMoving){
      this.incrementPosition(); 
      // NOTE: this can change moving flags but not wiggling or swapping flags
    }

    // if stopped and still wiggling, then it has completed a wiggle
    // begin the next wiggle, until all wiggles are complete
    if (!this.xMoving && !this.yMoving && this.wiggling){
      this.executeWiggleLogic();
    }

    // if stopped and still swapping, then it has completed a swap
    if (this.xMoving === false && this.yMoving === false && this.xSwapping && this.ySwapping){
      this.xSwapping = false;
      this.ySwapping = false;

      // set current position as new home
      // this facilitates wiggling and swapping
      this.xInitial = this.xPosition;
      this.yInitial = this.yPosition;
    }
  }
}

export default Letter;