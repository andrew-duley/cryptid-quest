import React from 'react';
import { GAMES } from '../data/games';
import GameCard from '../components/GameCard.jsx';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

export default function TheCrypt() {

  // the two featured games I choose from time to time
  const featuredGames = GAMES.filter(game => game.featured);

  return(
    <PageTemplate slug="the-crypt" title="The Crypt">

      <Block label="Join the fun">
        <p>Join the fun and try your hand at some of the various games the crew have been tirelessly working on!</p>
      </Block>

      <Block title="Featured Cryptid Quest Games">
        <p className="section__subheading">Hand selected games from the crew</p>
        <div className="the-crypt__grid--featured">
          {featuredGames.map(game => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </Block>
       
      <Block title="All Cryptid Quest Games">
        <p className="section__subheading">Here you can find our full library of games. From playable, to prototype, to coming soon, they're all here.</p>
        <div className="the-crypt__grid--all">
          {GAMES.map(game => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </Block>
        
      <PageFooter />
    </PageTemplate>
  );
}