import React from "react";
import { Link } from "react-router-dom";

const Nav = props => {
  return (
    <nav>
      <ul>
        <Link to="/how-to-play"><li>How to Play</li></Link>
        <Link to="/play-game"><li>Play Game</li></Link>
        <Link to="/hi-scores"><li>High Scores</li></Link>
        <Link to="/about-us"><li>About Us</li></Link>
      </ul>
    </nav>
  );
};

export default Nav;
