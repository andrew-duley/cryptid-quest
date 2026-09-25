import React from 'react';
import { Link } from 'react-router-dom';

import Block from '../layout/Block';

import GameCard from '../components/GameCard';
import { GAMES } from '../data/games';

export default function GamesTeaser() {
  return(
    <Block title="Games from the Crypt" subtitle="Down beneath Longfire Lodge, game night is always waiting" actions={<Link to="/the-crypt" className="btn btn--games">View all games</Link>}>
      
      <div className="games-teaser">

        <div className="card-grid games-teaser__grid">
          {GAMES.slice(-4).map(g => (
            <GameCard key={g.id ?? g.slug} game={g} />
          ))}
        </div>
      </div>

    </Block>
  );
}