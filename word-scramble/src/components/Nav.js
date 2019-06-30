import React from "react";
import { NavLink, Link } from "react-router-dom";

const Nav = props => {
  return (
    <nav>
      <ul>
        {/* <li><NavLink activeClassName="selected" to="/how-to-play">How to Play</NavLink></li>
        <li><NavLink activeClassName="selected" to="/play-game">Play Game</NavLink></li>
        <li><NavLink activeClassName="selected" to="/hi-scores">High Scores</NavLink></li>
        <li><NavLink activeClassName="selected" to="/about-us">About Us</NavLink></li> */}
        <NavLink activeClassName="selected" to="/how-to-play"><li>How to Play</li></NavLink>
        <NavLink activeClassName="selected" to="/play-game"><li>Play Game</li></NavLink>
        <NavLink activeClassName="selected" to="/hi-scores"><li>High Scores</li></NavLink>
        <NavLink activeClassName="selected" to="/about-us"><li>About Us</li></NavLink>
        {/* <Link activeClassName="selected" to="/how-to-play"><li>How to Play</li></Link>
        <Link activeClassName="selected" to="/play-game"><li>Play Game</li></Link>
        <Link activeClassName="selected" to="/hi-scores"><li>High Scores</li></Link>
        <Link activeClassName="selected" to="/about-us"><li>About Us</li></Link> */}
      </ul>
    </nav>
  );
};

export default Nav;
