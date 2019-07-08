import React from 'react';
import { NavLink } from "react-router-dom";

const HowToPlay = () => {
  return (
    <div className="how-to-play-container">
      <h2>How to Play</h2>
      <p>Welcome to Ocean Commotion, a word scramble game with an oceanic theme! When you hit start on the game page, the timer will begin counting down from 2 minutes and a scrambled word will be displayed. Every time you unscramble and guess a word correctly, 15 seconds will be added to the timer, up to a maximum of 5 minutes of gameplay. Within that time, solve as many words as you can to maximize your score! No time will be deducted if you use the shuffle button or enter an incorrect word, but you will get a 15 second penalty if you use the skip button to move on to a new word without guessing.</p>

      <h2>Tips for Gameplay</h2>
      <ul>
        <li>You can either click the submit button or click enter on the keyboard to submit your guess.</li>
        <li>If you want to skip a word, you can either click the skip button or hit the up key on your keyboard to move onto the next word.</li>
        <li>If you'd like to shuffle the letters in a word, you can either click the shuffle button, or hit the down key on your keyboard to move onto the next word.</li>
        <li>Your score will be calculated by the number of letters in each word you guess correctly, so the more words you answer, the higher your score!</li>
        <li>If you're really stuck, the skip button can be your friend. You'll lose 15 seconds of game time, but that
          may be a better choice than staying stuck on the word for a longer time.</li>
        <li>Remember, this is a THEMED puzzle, so if you guess a real word but it's not Ocean-related, you won't get
          points. But don't worry- we'll let you know if that happens.</li>
      </ul>

      <p id="last-p">When you're ready to play, click the button below to go to the game page.</p>

      <NavLink to="/play-game"><button className="start-button">Play Game</button></NavLink>
    </div>
  );
}

export default HowToPlay;


