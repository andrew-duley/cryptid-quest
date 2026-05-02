import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify';

import NotFound from './NotFound';

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
  const [is404, setIs404] = useState(false);

  const { slug } = useParams();
  
  useEffect(() => {
    setPost();
    setIsLoading(true);
    setError(null);
    setIs404(false);
    fetch(`${API_BASE}/posts/${slug}`)
      .then(res => {
        if (res.status === 404) {
          setIs404(true);
          return null;
        }
        if (!res.ok) {
          throw new Error('Error retrieving posts ' + res.statusText);
        }
        return res.json();
      })
      .then(json => {
        if (json === null) {
          return;
        }
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

  const safeHTML = useMemo(() => {
    return DOMPurify.sanitize(post?.body ?? '');
  }, [post?.body]);

  if (isLoading) return <p>Loading...</p>

  if (is404) return <NotFound />

  if (error) return <p>{error}</p> 
  
  return(
    <PageTemplate slug={`the-campfire/${slug}`} title={post.title} narrow={true}>

      <Block label="Meta data">
        <div className="the-campfire-post__meta">
          <span>Filed in: {post.category} </span>
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
          </time>
        </div>
      </Block>

      <Block label="Body">
        <div className="the-campfire-post__post"
          dangerouslySetInnerHTML={{ __html: safeHTML }}
        /> 
      </Block>
  
      <PageFooter />
    </PageTemplate>
  );
}