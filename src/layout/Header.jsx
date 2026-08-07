import React from 'react'
import {NavLink} from 'react-router-dom';


import { IMAGE_WIDTHS_BACKGROUND } from '../config/imageWidths.js';
import Picture from '../components/Picture';

function Header() {

  return(
    <header id="header" className="header">

      <Picture 
        imagePath="https://media.cryptid.quest/headers/winter/winter-tracks/winter-tracks-"
        imageWidths={IMAGE_WIDTHS_BACKGROUND}
        className = "header__background"
        imgClassName = "header__background-img"
        loading="eager"
        fetchPriority="high"
      />

      {/* Overlay tint so text reads well */}
      <div className="header__overlay" aria-hidden="true" />

      <div className="header__fog header__fog--far" aria-hidden="true"></div>
      <div className="header__fog header__fog--near" aria-hidden="true"></div>
      <section className="header__inner">
        <div className="header__brand">

          <NavLink to="/" className="header__home" aria-label="Crypted Quest home">
            <picture className="header__logo">
              <source type="image/avif" srcSet="https://media.cryptid.quest/site-ui/logos/logo-img-600.avif 1x" />
              <source type="image/webp" srcSet="https://media.cryptid.quest/site-ui/logos/logo-img-600.webp 1x" />
              <img className="hero__logo-img" src="https://media.cryptid.quest/site-ui/logos/logo-img-600.png" alt="Cryptid Quest logo" width="600" height="600" />                
            </picture>
          </NavLink>

          <div className="header__title-tag">
            <h1 className="header__title">
              <NavLink to="/" className="header__title-link">Cryptid Quest</NavLink>
            </h1>
            <h3 className="header__tagline">Welcome to the Northern Fringe—Where the Woods Watch Back...</h3>
            <p className="header__note">
              <small><em>A living portfolio</em> of polished React + UI craft.</small>
              </p>
          </div>
        </div>
        <nav className="header__nav" aria-label="Main">
          <ul className="header__nav-list">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/the-campfire">The Campfire</NavLink></li>
            <li><NavLink to="/the-crew">The Crew</NavLink></li>
            <li><NavLink to="/the-crypt">The Crypt</NavLink></li>
          </ul>
        </nav>
      </section>
    </header>
  );
}

export default Header;