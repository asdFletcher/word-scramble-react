import React from "react";
import { NavLink } from "react-router-dom";

const Nav = props => {
  return (
    <nav>
      <ul>
        <NavLink activeClassName="selected" to="/how-to-play"><li>How to Play</li></NavLink>
        <NavLink activeClassName="selected" to="/play-game"><li>Play Game</li></NavLink>
        <NavLink activeClassName="selected" to="/hi-scores"><li>High Scores</li></NavLink>
        <NavLink activeClassName="selected" to="/about-us"><li>About Us</li></NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
