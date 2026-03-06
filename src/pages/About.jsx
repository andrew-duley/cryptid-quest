import { Link } from 'react-router-dom';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

export default function About() {
  return(
    <PageTemplate 
      slug="about"
      title="About Cryptid Quest"
    >
      <Block label="About introduction">
        <p>Cryptid Quest is my playground for building polished, modern web experiences. It's also home to the Cryptid Quest Woods—the foggy treeline where my ragtag crew of anti-heroes—equal parts game-addicted troublemakers and the masterminds behind the would-be Viking band, Cairn Fjell, roam.</p>

        <p>You can jump into their world by playing quick web games in <Link to="/the-crypt">The Crypt</Link>, following their antics with updates from around <Link to="/the-campfire">the campfire</Link>, and (soon) listening to the band's first full album, <em>Welcome to the Northern Fringe</em>, currently in production.</p>

        <p>Behind the lore, this site is my living portfolio: I build and refine everything here to push my JavaScript and front-end skills further. If you're looking for a developer who ships, iterates, and obsesses over polish, I'm available.</p>
      </Block>

      <Block title="How to Explore">
        <ul>
          <li><strong>Meet:</strong> Our outrageous band and team members, AKA <Link to="/the-crew">The Crew</Link>.</li>
          <li><strong>Play:</strong> Mini-games live in <Link to="/the-crypt">The Crypt</Link>.</li>
          <li><strong>Follow:</strong> Updates and lore drops from around the <Link to="/the-campfire">The Campfire</Link>.</li>
          <li><strong>Listen:</strong> The band's music will live on <Link to="/music">Music</Link> (soon).</li>
        </ul>
      </Block>

      <Block title="How it's Built">
        <p>Cryptid Quest is a hands-on project where I practice clean UI, responsive layout, accessibility basics, and solid game logic—then iterate until it feels finished.</p>

        <ul className="about__tags" aria-label="Core tools and focus areas">
          <li>JavaScript</li>
          <li>React</li>
          <li>SCSS</li>
          <li>UI polish</li>
          <li>Accessibility</li>
        </ul>

        <p>As the site grows, I'll be expanding into more full-stack features (blog tooling, content workflows, and backend experimentation) while keeping performance and clarity front and center.</p>
      </Block>

      <Block title="About Me">
        <p>I'm Andrew—web dev, game tinkerer, crypted enjoyer, and music lover. If you want a developer who keeps shipping and improving, you can reach me here:</p>

        <div className="about__cta">
          <Link to="/contact" className="about__button">
            Get in Touch
          </Link>
          <a href="https://github.com/awduley" className="about__button about__button--secondary" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </Block> 

      <PageFooter />
    </PageTemplate>
  );
}