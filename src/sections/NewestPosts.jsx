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
  setNewestPosts([
    {
      id: 1,
      title: "The Fire Still Burns",
      excerpt: "A quiet night at the campfire reveals something watching from the trees...",
      created_at: new Date().toISOString(),
      category: "Lore",
      cover: "/images/test1.jpg"
    },
    {
      id: 2,
      title: "Footprints in the Frost",
      excerpt: "We followed the trail north, but something followed us back.",
      created_at: new Date().toISOString(),
      category: "Expedition",
      cover: "/images/test2.jpg"
    },
    {
      id: 3,
      title: "The Lake Went Silent",
      excerpt: "No wind. No birds. Just the sound of something beneath the ice.",
      created_at: new Date().toISOString(),
      category: "Encounter",
      cover: "/images/test3.jpg"
    }
  ]);
}, []);

  // useEffect(() => {
  //   setIsLoading(true);
  //   setError(null);

  //   fetch(`${API_BASE}/posts?limit=3`)
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error('Network response was not okay: ' + res.statusText);
  //       }
  //       return res.json();
  //     })
  //     .then(json => {
  //       setNewestPosts(json.data ?? []);
  //       setError(null);
  //     })
  //     .catch(error => {
  //       setNewestPosts([]);
  //       setError("An error has occurred")
  //       console.log("Error fetching data:", error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });     
  // }, []);

    return(
    <Block title="What's new in the Cryptid Quest Woods" subtitle="New footprints on the trail—some definitely not human" actions={<Link to="/the-campfire" className="btn btn--the-campfire">View all campfire posts</Link>}>
    
        <p className="newest-posts__dev-note dev-note">
          <small><strong>Build note:</strong> Dev logs, lore drops, and new releases.</small>
        </p>

      {isLoading ? <p className="newest-posts__loading">Loading posts...</p> : null}
      {error ? <p className="newest-posts__error">{error}</p> : null}

      {
        !isLoading && !error ? (
        newestPosts.length > 0 ? 
        <div className="newest-posts">
          <div className="card-grid newest-posts__grid">
            {/* <div className="newest-posts__featured">
              <PostCard post={newestPosts[0]} />
            </div> */}
            {newestPosts.slice(0, 3).map(p => (
              <PostCard key={p.id ?? p.slug} post={p} />
            ))}
          </div>
        </div>
      :
        <div className="newest-posts newest-posts--none">
          <p>No posts yet—check back soon</p>
        </div>)  
        : null
      }
      
    </Block>
  );
}