import { useEffect, useState } from 'react';

import PageTemplate from '../layout/PageTemplate.jsx';
import Block from '../layout/Block.jsx';
import PageFooter from '../layout/PageFooter.jsx';

import PostCard from '../components/PostCard.jsx';

import { IMAGE_WIDTHS_BACKGROUND } from '../config/imageWidths.js';
import Picture from '../components/Picture.jsx';

import '../scss/pages/_blog.scss';  

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function TheLore() {

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`${API_BASE}/lore?limit=10`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error retrieving posts ' + res.statusText);
        }
        return res.json(); 
      })
      .then(json => {
        setPosts(json.data ?? []);
        setError(null);
      })
      .catch(error => {
        setPosts([]);
        setError("An error has occurred")
        console.log("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });     
  }, []); 

  return(
    <PageTemplate slug="the-lore" title="The Lore" className="the-lore">

      <Picture 
        imagePath="https://media.cryptid.quest/the-campfire/backgrounds/autumn/the-campfire-gathering/the-campfire-gathering-"
        imageWidths={IMAGE_WIDTHS_BACKGROUND}
        className = "the-lore__background" 
        imgClassName = "the-lore__background-img"
        loading="eager"
        fetchPriority="high"
      />

      <Block label="The Lore" subtitle="Discover the characters, places, and stories that make up the Northern Fringe">

        {isLoading && !error && ( 
          <p className="the-lore__loading">Loading posts...</p> 
        )}

        {error && !isLoading && (
          <p className="the-lore__error">{error}</p>
        )}

        {!isLoading && !error && posts.length === 0 && (
          <div className="the-lore__posts-none">
            <p>No posts yet—check back soon</p>
          </div>
        )}
      </Block>

      
      {!isLoading && !error && posts.length > 0 &&
      <Block label="At the Fire">
        <div className="the-lore__newest-posts">
          {posts.slice(0, 3).map(p => (
              <PostCard key={p.id ?? p.slug} post={p} />
          ))}
        </div>
      </Block>}
 
      {!isLoading && !error && posts.length > 3 &&
      <Block title="More from the Fire">
        <div className="card-grid the-lore__archive-posts">
          {posts.slice(3).map(p => (
            <PostCard key={p.id ?? p.slug} post={p} />
          ))}
        </div>
      </Block>}

      <PageFooter />
    </PageTemplate>
  );
}