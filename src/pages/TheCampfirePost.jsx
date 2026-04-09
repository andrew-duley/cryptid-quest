import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

import '../games/shared/styles/index.scss'; 
import '../scss/pages/_blog.scss';    

export default function TheCampfirePost() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { slug } = useParams();
  
  useEffect(() => {
    setPost();
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
        setPost(json.data);
      }) 
      .catch(error => {
        setError("An error has occurred")
        console.log("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });     
  }, [slug]);

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>{error}</p> 

  if (!post) return <p>Sorry, post not found</p>
  
  return(
    <PageTemplate slug={`the-campfire/${slug}`} title={post.title}>

      <Block label="Meta data">
        <div className="the-campfire-post__meta">
          <span>Filed in: {post.category}</span>
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
          </time>
          <span aria-hidden="true">•</span>
        </div>
      </Block>

      <Block label="Body">
        <div className="the-campfire-post__post">
          {post.body}
        </div> 
      </Block>
  
      <PageFooter />
    </PageTemplate>
  );
}