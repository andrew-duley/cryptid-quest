import React from 'react';
import { NavLink } from 'react-router-dom';

import { IMAGE_WIDTHS_FOOTER_BACKGROUND } from '../config/imageWidths.js';

import Picture from '../components/Picture';

function Footer() {

  const year = new Date().getFullYear();

  return(
    <footer className="footer">
      <h2 className="sr-only">Footer</h2> 

      <Picture 
        imagePath="https://media.cryptid.quest/footers/master/footer-"
        imageWidths={IMAGE_WIDTHS_FOOTER_BACKGROUND}
        className = "footer__background" 
        imgClassName = "footer__background-img"
        loading="lazy"
        fetchPriority="high"
      />
      
      <div className="footer__columns">
        <section className="footer__column footer__column--1">
          <h2>Cryptid Quest</h2>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/the-campfire">The Campfire</NavLink></li>
            <li><NavLink to="/the-crew">The Crew</NavLink></li>
            <li><NavLink to="/the-crypt">The Crypt</NavLink></li>
          </ul>
        </section>
        <section className="footer__column footer__column--2">
          <h2>Information</h2>
          <ul>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
            <li><NavLink to="/accessibility">Accessibility</NavLink></li>
          </ul>
        </section>
        <section className="footer__column footer__column--3">
          <h2>Behind the Scenes</h2>
          <ul>
            <li><a href="https://github.com/andrew-duley" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/andrew-duley/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </section>
      </div> 
      <section className="copy">
        <p>&copy; 2025—{year} <strong>Cryptid Quest</strong> | All rights reserved</p>
      </section>
    </footer>
  );
}

export default Footer;