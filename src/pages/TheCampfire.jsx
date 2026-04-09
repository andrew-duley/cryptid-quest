import { useEffect, useState } from 'react';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

import PostCard from '../components/PostCard';

import '../games/shared/styles/index.scss'; 
import '../scss/pages/_blog.scss';    

export default function TheCampfire() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`${API_BASE}/posts?limit=10`)
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
    <PageTemplate slug="the-campfire" title="The Campfire">

      <Block label="The Campfire" subtitle="Where the crew shares sightings, stories, and the occasional disaster" narrow={true}>
    
        <p className="the-campfire__dev-note dev-note">
          <small><strong>Build note:</strong> All Campfire entries—cryptid encounters, crew mishaps, project updates, and whatever else wanders in from the woods...</small>
        </p>

        {isLoading ? <p className="the-campfire__loading">Loading posts...</p> : null}
        {error ? <p className="the-campfire__error">{error}</p> : null}

        {error ? <div className="posts posts--none">
          <p>No posts yet—check back soon</p>
        </div> : null}
      </Block>

      <Block title="Newest Posts" narrow={true}>
        {!isLoading && !error ?
        <div className="the-campfire__newest-posts">
          {posts.slice(0, 3).map(p => (
              <PostCard key={p.id ?? p.slug} post={p} />
          ))}
        </div> : null}
      </Block>

      <Block title="Archive Posts">
        {!isLoading && !error ?
        <div className="card-grid the-campfire__archive-posts">
          {posts.slice(3).map(p => (
            <PostCard key={p.id ?? p.slug} post={p} />
          ))}
        </div> : null}
      </Block>

      <PageFooter />
    </PageTemplate>
  );
}