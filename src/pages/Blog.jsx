import { useEffect } from 'react';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

import '../games/shared/styles/index.scss'; 
import '../scss/pages/_blog.scss';    

export default function Blog() {
  // Set the <title> for this route
  useEffect(() => {
    document.title = 'Blog — Coming Soon | Cryptid Quest';
  }, []);

  return(
    <PageTemplate slug="blog" title="Blog">

      <Block title="Coming soon">
        <p>
          The blog chronicles the misadventures of the Cryptid Quest crew in the Northern Fringe — the creatures they cross paths with, the trouble they get into, the music they create, and the challenges that shape their journey.
        </p>
        <p>
          Along the way, I also share dev logs, design notes, and behind-the-scenes looks at the code, art, and systems that bring the world to life.
        </p>
      </Block>

      <Block title="Want an update when we launch?">
        <p className="blog__text">
          Shoot us an email:&nbsp;
          <a href="mailto:you@example.com?subject=Blog%20updates" className="blog__link">feedback@cryptid.quest</a>
        </p>
      </Block>
    
      <Block title="Planned posts">
        <ul className="blog__list">
          <li className="blog__card">Mascots: sketch → token → in-game (process)</li>
          <li className="blog__card">Tic-Tac-Toe AI ideas: from random to minimax</li>
          <li className="blog__card">Image pipeline: AVIF/WebP, JPG, sizes, and crispness</li>
        </ul>
      </Block>
  
      <PageFooter />
    </PageTemplate>
  );
}