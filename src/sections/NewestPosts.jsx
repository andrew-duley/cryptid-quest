import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PostCard from '../components/PostCard';

import Block from '../layout/Block';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function NewestPosts() {

  const [newestPosts, setNewestPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`${API_BASE}/posts?limit=3`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not okay: ' + res.statusText);
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
    <Block title="What's new in the Cryptid Quest Woods" subtitle="New footprints on the trail—some definitely not human" actions={<Link to="/posts" className="btn btn--posts">View all posts</Link>}>
    
        <p className="posts__dev-note dev-note">
          <small><strong>Build note:</strong> Dev logs, lore drops, and new releases.</small>
        </p>

      {isLoading ? <p className="posts__loading">Loading posts...</p> : null}
      {error ? <p className="posts__error">{error}</p> : null}

      {
        !isLoading && !error ? (
        newestPosts.length > 0 ? 
        <div className="posts">
          <div className="posts__grid">
            <div className="posts__featured">
              <PostCard post={newestPosts[0]} />
            </div>
            <div className="posts__secondary">
              {newestPosts.slice(1, 3).map(p => (
                <PostCard key={p.id ?? p.slug} post={p} />
              ))}
            </div>
          </div>
        </div>
      :
        <div className="posts posts--none">
          <p>No posts yet—check back soon</p>
        </div>)  
        : null
      }
      
    </Block>
  );
}