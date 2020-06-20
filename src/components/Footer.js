import React from 'react';

import './Footer.css';
import Tmdb from '../assets/tmdb-blue_short.svg';

function Footer() {
  return(
    <footer id="main-footer">
      <div className="made">
        <span>Por <strong>Higor Santos</strong> com muito &#9749;</span>
      </div>
      <div className="powered">
        <div>
          <span>Powered by </span>
          <img src={Tmdb} alt="Logo do The Movie Data Base"/>
        </div>
        <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
      </div>
      
    </footer>

    );
}

export default Footer;