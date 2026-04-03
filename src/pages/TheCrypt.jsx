import React from 'react';
import { Link } from 'react-router-dom';
import { GAMES } from '../data/games';
import GameCard from '../components/GameCard.jsx';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

export default function TheCrypt() {
  return(
    <PageTemplate slug="the-crypt" title="Enter the Crypt" className={`the-crypt`}> 

      <Block label="The Games of Cryptid Quest">
        <p>The Crypt is the playable side of Cryptid Quest — a collection of games, prototypes, and experimental builds shaped by cryptids, folklore, and the darker edges of the Northern Fringe. Some are polished, others are rougher, but each one explores a different path through design, interaction, and worldbuilding.</p>
        <p className="the-crypt__dev-note dev-note">
          <small><strong>Build note:</strong> Playable projects and experiments built with React and modern web tools.</small>
        </p>
      </Block>
       
      <Block title="Playable Archives">
        <p>Here you can find the crew's full library of games. From playable, to prototype, to coming soon, they're all here.</p>
        <div className="card-grid card-grid__the-crypt">
          {GAMES.map(game => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </Block>
        
      <PageFooter />
    </PageTemplate>
  );
}