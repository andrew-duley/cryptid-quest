import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {

  let year = new Date().getFullYear();

  return(
    <footer id="footer" className="">
      <h2 className="sr-only">Footer</h2> 
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <div className="orb orb-4"></div>
      <div className="sasquatch"></div>
      <div className="footer__columns">
        <section className="footer__column footer__column--1">
          <h3>Cryptid Quest</h3>
          <p>A <em>living</em> world of games, lore, and UI craft from the Northern Fringe</p>
          <ul>
            <li><NavLink to="/">Home—Return to Campfire</NavLink></li>
            <li><NavLink to="/the-crew">Meet the Crew</NavLink></li>
            <li><NavLink to="/the-crypt">Enter the Crypt</NavLink></li>
          </ul>
        </section>
        <section className="footer__column footer__column--2">
          <h3>Camp Notes</h3>
          <ul>
            <li><NavLink to="/about">About the Project</NavLink></li>
            <li><NavLink to="/contact">Contact Us</NavLink></li>
            <li><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
            <li><NavLink to="/accessibility">Accessibility</NavLink></li>
          </ul>
        </section>
        <section className="footer__column footer__column--3">
          <h3>Campfire Board</h3>
          <ul>
            <li><NavLink to="/community-rules">Camp Rules</NavLink></li>
            <li><NavLink to="/submit-a-sighting">Submit a Sighting</NavLink></li>
            <li><NavLink to="/how-to-report">How to Report</NavLink></li>
            <li><NavLink to="/faq">FAQ</NavLink></li>
          </ul>
        </section>
      </div> 
      <section className="copy">
        <small>&copy; 2025-{year} <strong>Cryptid Quest</strong>. All rights reserved.</small>
      </section>
    </footer>
  );
}

export default Footer;