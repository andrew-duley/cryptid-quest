import React from 'react';
import { Link } from 'react-router-dom';

import { IMAGE_WIDTHS_GAME_CARD } from '../config/imageWidths.js';
import Picture from '../components/Picture';

export default function GameCard({ game }) {

  const {
    slug,
    title,
    blurb,
    cardImageUrl,  // optional base path for 9-image set
  } = game;

  return(
    <article className={`game-card card`}>
      <Link to={`/the-crypt/${slug}`} 
      className="game-card__media-link">
        <div className="game-card__media">
          <Picture 
            imagePath={cardImageUrl}
            imageWidths={IMAGE_WIDTHS_GAME_CARD}
            className = "game-card__background" 
            imgClassName = "game-card__background-img"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="game-card__body">
        <h2 className="game-card__title">
          <Link to={`/the-crypt/${slug}`} className="game-card__link">{title}</Link>
        </h2>

        <p className="game-card__blurb">{blurb}</p>

      
        <Link to={`/the-crypt/${slug}`} className="game-card__cta" aria-label={`${title} — Play now`}>Play →</Link>
      </div>
    </article>
  );
}
