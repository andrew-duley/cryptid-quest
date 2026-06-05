import React from 'react';
import { Link } from 'react-router-dom';

import Picture from './Picture';

export default function PostCard({ post }) {

  const plainExcerpt = post.excerpt?.replace(/<[^>]*>/g, "") ?? "";

  return(
    <article className="post-card card">
      <Link to={`/the-campfire/${post.slug}`} className="post-card__media-link">
        <div className="post-card__media">
          {/* <img 
            src={post.hero_image_url} 
            alt={post.hero_image_alt}
            width="800"
            height="450"
            loading="lazy"
            decoding="async"
          /> */}
          <Picture src={post.hero_image_url} alt={post.hero_image_alt} />
        </div>
      </Link>

      <div className="post-card__body">
        <h2 className="post-card__title">
          <Link to={`/the-campfire/${post.slug}`}>{post.title}</Link>
        </h2>

        <section className="post-card__meta">
        <span className="post-card__cat pill">{post.slug}</span>
        <time dateTime={post.created_at}>
          {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
        </time>
        </section>

        <p className="post-card__excerpt">{plainExcerpt}</p>
        <Link to={`/the-campfire/${post.slug}`} className="post-card__more">Read more</Link>
      </div>
      
    </article>
  );
}