import React from 'react';
import {grey600} from 'material-ui/styles/colors';
import './App.css';

const Footer = (props) => {
  return (
    <footer style={{color: grey600}}>
      <p>Built by Laura Brandt as a part of the <a href="https://www.freecodecamp.org/challenges/build-a-nightlife-coordination-app">Free Code Camp</a> curriculum.</p>
      <a href="https://github.com/LauraBrandt/nightlife-coordinator">
        <i className="fab fa-github"></i>
        Github
      </a>
    </footer>
  );
}

export default Footer;