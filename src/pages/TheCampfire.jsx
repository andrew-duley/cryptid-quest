import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

import PostCard from '../components/PostCard';

import '../games/shared/styles/index.scss'; 
import '../scss/pages/_blog.scss';    

export default function TheCampfire() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [newestPosts, setNewestPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`${API_BASE}/posts`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error retrieving posts ' + res.statusText);
        }
        return res.json();
      })
      .then(json => {
        setNewestPosts(json.data ?? []);
        setError(null);
      })
      .catch(error => {
        setNewestPosts([]);
        setError("An error has occurred")
        console.log("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });     
  }, []);

  return(
    <PageTemplate slug="the-campfire" title="The Campfire">

      <Block label="The Campfire" subtitle="Where the crew shares sightings, stories, and the occasional disaster">
    
        <p className="the-campfire__dev-note dev-note">
          <small><strong>Build note:</strong> All Campfire entries—cryptid encounters, crew mishaps, project updates, and whatever else wanders in from the woods...</small>
        </p>

      {isLoading ? <p className="the-campfire__loading">Loading posts...</p> : null}
      {error ? <p className="the-campfire__error">{error}</p> : null}

      {
        !isLoading && !error ? (
        newestPosts.length > 0 ? 
        <div className="the-campfire__posts">
          <div className="the-campfire__posts-grid">
            {newestPosts.map(p => (
                <PostCard key={p.id ?? p.slug} post={p} />
              ))}
          </div>
        </div>
      :
        <div className="posts posts--none">
          <p>No posts yet—check back soon</p>
        </div>)  
        : null
      }
      
    </Block>

      <Block title="Coming soon">
        <p>
          The campfire section chronicles the misadventures of the Cryptid Quest crew in the Northern Fringe — the creatures they cross paths with, the trouble they get into, the music they create, and the challenges that shape their journey.
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