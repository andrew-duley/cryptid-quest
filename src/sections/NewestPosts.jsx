import { useState, useEffect } from 'react';

import PostCard from '../components/PostCard';

const API_BASE = import.meta.env.VITE_API_BASE_URL

export default function NewestPosts() {
  // const newest = [...POSTS]
  //   .sort((a, b) => new Date(b.date) - new Date(a.date))
  //   .slice(0, 6);

  const [newestPosts, setNewestPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_BASE}/posts?limit=3`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not okay: ' + res.statusText);
        }
        return res.json();
      })
      .then(data => {
        const sortedPosts = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3);
        setNewestPosts(sortedPosts);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        setError("An error has occurred")
        console.log("Error fetching data:", error);
      });

      
  }, []);

  return(
    <section id="newest-posts" className="section section--bg-dark posts" aria-labelledby="latest-heading">
      <div className="container">
        <h2 id="latest-heading" className="section__title">What's New in the Cryptid Quest Woods</h2>
        <p className="section__subtitle">New footprints on the trail—some definitely not human</p>
        <p className="section__dev-note">
          <small><strong>Build note:</strong> Dev logs, lore drops, and new releases.</small>
        </p>

        {
          newestPosts.length > 0 ? 
          <div className="posts__grid">
            <div className="featured-post">
              <PostCard post={newestPosts[0]} />
            </div>
            <div className="secondary-posts">
              {newestPosts.slice(1, 3).map(p => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div> 
        :
          <div className="posts__none">
            <p>No posts yet—check back soon</p>
          </div>  
        }
      </div>
    </section>
  );
}