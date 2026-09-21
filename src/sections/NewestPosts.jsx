import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PostCard from '../components/PostCard';

import Block from '../layout/Block';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function NewestPosts() {

  const [newestPosts, setNewestPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fakePosts = [
  {
    id: 1,
    title: "Something Strange Near the South Entrance",
    slug: "something-strange-near-the-south-entrance",
    excerpt: "Jervas finds a set of unusual tracks outside Baird, and the crew begins asking questions.",
    category: "Stories",
    hero_image_url: "https://placehold.co/800x450",
    hero_image_alt: "Large canine tracks near the edge of a forest",
    created_at: "2026-09-18T10:30:00Z",
  },
  {
    id: 2,
    title: "Controlled Chaos Is Now Playable",
    slug: "controlled-chaos-is-now-playable",
    excerpt: "Sparkplug, Brutus, Grumbit, and Burnella turn a simple memory game into exactly what the name promises.",
    category: "Games",
    hero_image_url: "https://placehold.co/800x450",
    hero_image_alt: "The crew causing controlled chaos",
    created_at: "2026-09-12T14:15:00Z",
  },
  {
    id: 3,
    title: "A Quiet Evening at Baird Lake",
    slug: "a-quiet-evening-at-baird-lake",
    excerpt: "Dredsky takes the western path toward the lake for some much-needed peace and quiet.",
    category: "Stories",
    hero_image_url: "https://placehold.co/800x450",
    hero_image_alt: "Baird Lake at twilight",
    created_at: "2026-09-05T19:45:00Z",
  },
];

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
    
        {/* <p className="newest-posts__dev-note dev-note">
          <small><strong>Build note:</strong> Dev logs, lore drops, and new releases.</small>
        </p> */}

      {isLoading ? <p className="newest-posts__loading">Loading posts...</p> : null}
      {error ? <p className="newest-posts__error">{error}</p> : null}

      {
        !isLoading && !error ? (
        newestPosts.length === 0 ? 
        <div className="newest-posts">
          <div className="card-grid newest-posts__grid">
            {/* <div className="newest-posts__featured">
              <PostCard post={newestPosts[0]} />
            </div> */}
            {/* {newestPosts.slice(0, 3).map(p => (
              <PostCard key={p.id ?? p.slug} post={p} />
            ))} */}
            {fakePosts.map(p => (
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