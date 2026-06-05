import React from 'react'
import {NavLink} from 'react-router-dom';

import Picture from '../components/Picture';

function Header() {

  return(
    <header id="header" className="hero">

      {/* Background image {responsive}
      <picture className="hero__bg" aria-hidden="true">
        <source
          type="image/avif"
          srcSet="/images/backgrounds/misty-forest-800.avif 800w,
                  /images/backgrounds/misty-forest-1200.avif 1200w,
                  /images/backgrounds/misty-forest-1600.avif 1600w,
                  /images/backgrounds/misty-forest-2400.avif 2400w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/images/backgrounds/misty-forest-800.webp 800w,
                  /images/backgrounds/misty-forest-1200.webp 1200w,
                  /images/backgrounds/misty-forest-1600.webp 1600w,
                  /images/backgrounds/misty-forest-2400.webp 2400w"
          sizes="100vw"
        />
        <img 
          className="hero__bg-img"
          src="/images/backgrounds/hero-backgrounds/hero-background-1/hero-background-1.jpg"
          srcSet="/images/backgrounds/hero-backgrounds/hero-background-1/hero-background-1.jpg 1536w"
          sizes="100vw"
          alt=""
          width="2400" height="1000"
          fetchPriority="high"
          decoding="async"
        />
      </picture> */}

      <Picture src="./media/headers/winter/winter-tracks/winter-tracks-master.png" alt="Winter tracks" />

      {/* Overlay tint so text reads well */}
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__fog hero__fog--far" aria-hidden="true"></div>
      <div className="hero__fog hero__fog--near" aria-hidden="true"></div>
      <section className="hero__inner">
        <div className="hero__brand">

          <NavLink to="/" className="hero__home" aria-label="Crypted Quest home">
            <picture className="hero__logo">
              <source type="image/avif" srcSet="/images/branding/logo/logo-img-600.avif 1x" />
              <source type="image/webp" srcSet="/images/branding/logo/logo-img-600.webp 1x" />
              <img className="hero__logo-img" src="/images/branding/logo/logo-img-600.png" alt="" width="600" height="600" />                
            </picture>
          </NavLink>

          <div className="hero__title-tag">
            <h1 className="hero__title">
              <NavLink to="/" className="hero__title-link">Cryptid Quest</NavLink>
            </h1>
            <h3 className="hero__tagline">Welcome to the Northern Fringe—Where the Woods Watch Back...</h3>
            <p className="hero__note">
              <small><em>A living portfolio</em> of polished React + UI craft.</small>
              </p>
          </div>
        </div>
        <nav className="hero__nav" aria-label="Main">
          <ul className="hero__nav-list">
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