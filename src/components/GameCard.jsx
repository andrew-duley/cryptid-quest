import React from 'react';
import { Link } from 'react-router-dom';

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
    coverBase,  // optional base path for 9-image set
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
          {coverBase ? (
            <picture>
              <source 
                type="image/avif"
                srcSet={`
                  ${coverBase}-640.avif 640w,
                  ${coverBase}-960.avif 960w,
                  ${coverBase}-1200.avif 1200w
                `}
                sizes={sizes}
              />
              <source 
                type="image/webp"
                srcSet={`
                  ${coverBase}-640.webp 640w,
                  ${coverBase}-960.webp 960w,
                  ${coverBase}-1200.webp 1200w
                `}
                sizes={sizes}
              />
              <img src={`${coverBase}-640.jpg`}
                srcSet={`
                  ${coverBase}-640.jpg 640w,
                  ${coverBase}-960.jpg 960w,
                  ${coverBase}-1200.jpg 1200w
                `}
                sizes={sizes} 
                alt={`${title} — cover art`}
                width="1200"
                height="675"
                loading="lazy"
                decoding="async"
              />
            </picture>
          ) : (
            <img  
              src={cover} 
              alt={`${title} — cover art`}
              width="800"
              height="450"
              loading="lazy"
              decoding="async"
            />
          )}
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
