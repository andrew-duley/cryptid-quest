import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

import '../games/shared/styles/index.scss'; 
import '../scss/pages/_blog.scss';    

export default function TheCampfirePost() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { slug } = useParams();
  const { title, category, body, created_at } = post;

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`${API_BASE}/posts/${slug}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error retrieving posts ' + res.statusText);
        }
        return res.json();
      })
      .then(json => {
        setPost(json.data ?? []);
        setError(null);
      })
      .catch(error => {
        setPost([]);
        setError("An error has occurred")
        console.log("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
        console.log(post)
      });     
  }, []);

  return(
    <PageTemplate slug={`the-campfire/${slug}`} title={title}>

      <Block>
        <div className="the-campfire-post__meta">
          <span>Filed in: {category}</span>
          <time dateTime={created_at}>
            {new Date(created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
          </time>
          <span aria-hidden="true">•</span>
        </div>
      </Block>

      <Block label="Body">
    
        {isLoading ? <p className="the-campfire-post__loading">Loading posts...</p> : null}
        {error ? <p className="the-campfire__error">{error}</p> : null}

        {
          !isLoading && !error ? (
          posts.length > 0 ? 
          <div className="the-campfire-post__post">
            {body}
          </div>
        :
          <div className="posts posts--none">
            <p>No posts yet—check back soon</p>
          </div>)  
          : null
        }
        
      </Block>
  
      <PageFooter />
    </PageTemplate>
  );
}