import React from 'react';
import { Link } from 'react-router-dom';

import { IMAGE_WIDTHS_GAME_CARD } from '../config/imageWidths.js';
import Picture from '../components/Picture';

const STATUS_LABEL = {
  playable: 'Playable',
  prototype: 'Prototype',
  comingSoon: 'Coming soon',
}

function clampDifficulty(n) {
  const v = Number(n);
  if (!Number.isFinite(v)) return 1;
  return Math.max(1, Math.min(3, v));
}

export default function GameCard({ game }) {

  const {
    slug,
    title,
    blurb,
    status = 'comingSoon',
    difficulty = 1,
    cover,      // single image path (fallback)
    cardImageUrl,  // optional base path for 9-image set
  } = game;

  const isPlayable = status === 'playable';
  const diff = clampDifficulty(difficulty);

  const stars = '★'.repeat(diff) + '☆'.repeat(3 - diff);
  const statusLabel = STATUS_LABEL[status] || STATUS_LABEL.comingSoon

  const sizes = '(max-width: 700px) 92vw, 26rem';

  return(
    <article className={`game-card game-card--${status} card`}>
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
        <header className="game-card__top">
          <h2 className="game-card__title">
            <Link to={`/the-crypt/${slug}`}>{title}</Link>
          </h2>
          <span className={`game-card__status game-card__status--${status}`}>
            {statusLabel}
          </span>
        </header>

        <section className="game-card__meta">
          <span className="game-card__difficulty" aria-label={`Difficulty ${diff} of 3`}>
            Difficulty: <span>{stars}</span>
          </span>
        </section>

        <p className="game-card__blurb">{blurb}</p>

        {isPlayable ? (
        <Link to={`/the-crypt/${slug}`} className="game-card__cta" aria-label={`${title} — Play now`}>
            Play →
          </Link>
        ) : (
          <span className="game-card__cta game-card__cta--disabled" aria-disabled="true">
            Coming soon
          </span>
        )}
      </div>
    </article>
  );
}
