import { useEffect, useState } from 'react';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

import PostCard from '../components/PostCard';

import '../games/shared/styles/index.scss'; 
import '../scss/pages/_blog.scss';  

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function TheCampfire() {

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
    <PageTemplate slug="the-campfire" title="The Campfire" className={"the-campfire"}>

      <Block label="The Campfire" subtitle="Where the crew shares sightings, stories, and the occasional disaster" narrow={true}>
    
        <p className="the-campfire__dev-note dev-note">
          <small><strong>Build note:</strong> All Campfire entries—cryptid encounters, crew mishaps, project updates, and whatever else wanders in from the woods...</small>
        </p>

        {isLoading && !error && ( 
          <p className="the-campfire__loading">Loading posts...</p> 
        )}

        {error && !isLoading && (
          <p className="the-campfire__error">{error}</p>
        )}

        {!isLoading && !error && posts.length === 0 && (
          <div className="the-campfire__posts-none">
            <p>No posts yet—check back soon</p>
          </div>
        )}
      </Block>

      
      {!isLoading && !error && posts.length > 0 &&
      <Block title="Newest Posts" narrow={true}>
        <div className="the-campfire__newest-posts">
          {posts.slice(0, 3).map(p => (
              <PostCard key={p.id ?? p.slug} post={p} />
          ))}
        </div>
      </Block>}

      
      {!isLoading && !error && posts.length > 3 &&
      <Block title="Archive Posts">
        <div className="card-grid the-campfire__archive-posts">
          {posts.slice(3).map(p => (
            <PostCard key={p.id ?? p.slug} post={p} />
          ))}
        </div>
      </Block>}

      <PageFooter />
    </PageTemplate>
  );
}