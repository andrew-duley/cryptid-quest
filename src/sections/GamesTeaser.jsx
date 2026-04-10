import React from 'react';
import { Link } from 'react-router-dom';

import Block from '../layout/Block';

import GameCard from '../components/GameCard';
import { GAMES } from '../data/games';

export default function GamesTeaser() {
  return(
    <Block title="Games from the Woods" subtitle="Playable prototypes and polished minis—pick a trail and jump in" actions={<Link to="/the-crypt" className="btn btn--games">View all games</Link>}>
      
      <div className="games-teaser">
        <p className="games-teaser__dev-note dev-note">
          <small><strong>Build note:</strong> Responsive card grid + image srcset pipeline; routing to game detail pages next</small>
        </p>
        <div className="card-grid games-teaser__grid">
          {GAMES.map(game => (
            <GameCard key={game.id ?? game.slug} game={game} />
          ))}
        </div>
      </div>

    </Block>
  );
}