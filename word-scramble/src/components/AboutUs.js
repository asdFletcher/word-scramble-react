import React from 'react';
import { shuffle } from '../util/util.js';

let bios = [];
bios.push({
  name: 'Jake Anderson',
  github: 'https://github.com/1anderson2jacob',
  linkedin: 'https://www.linkedin.com/in/jacob-merrill-anderson/',
  profilePic: require('../assets/img/Jake_Anderson_About.jpg'),
});

bios.push({
  name: 'Fletcher LaRue',
  github: 'https://github.com/asdFletcher',
  linkedin: 'https://www.linkedin.com/in/fletcher-larue/',
  profilePic: require('../assets/img/Fletcher_LaRue_About.jpg'),
});

bios.push({
  name: 'Brent Woodward',
  github: 'https://github.com/BrentTech',
  linkedin: 'https://www.linkedin.com/in/brenton-woodward/',
  profilePic: require('../assets/img/Brent_Woodward_About.jpg'),
});

bios.push({
  name: 'Becca Lee',
  github: 'https://github.com/beccalee123',
  twitter: 'https://twitter.com/the_becca_lee',
  linkedin: 'https://www.linkedin.com/in/becca-lee-805922110/',
  profilePic: require('../assets/img/Becca_Lee_About.jpg'),
});

const Twitter = (props) => {
  if (props.person.twitter) {
    return (
      <a href={props.person.twitter} target="_blank" rel="noopener noreferrer">
        <i className="icon-twitter"></i>
      </a>
    );
  }
  return null;
}
const Linkedin = (props) => {
  if (props.person.linkedin) {
    return (
      <a href={props.person.linkedin} target="_blank" rel="noopener noreferrer">
        <i className="icon-linkedin-sign"></i>
      </a>
    );
  }
  return null;
}
const Github = (props) => {
  if (props.person.github) {
    return (
      <a href={props.person.github} target="_blank" rel="noopener noreferrer">
        <i className="icon-github"></i>
      </a>
    );
  }
  return null;
}

const AboutUs = () => {
  bios = shuffle(bios);
  return (
    <div className="all-bios-container">
      {bios.map( (person, index) => {
        return (
          <div className="bio-contianer" key={index}>
            <h2>{person.name}</h2>
            <div className="profile-pic-container">
              <img src={person.profilePic} alt="a" title ="a"></img>
            </div>
            <div className="social-icons">
              <Twitter person={person} />
              <Linkedin person={person} />
              <Github person={person} />
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default AboutUs;
