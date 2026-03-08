import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return(
    <article className="post-card card">
      <Link to={`/the-campfire/${post.slug}`} className="post-card__media media-frame media-frame--contain">
        <img 
          src={post.cover} 
          alt="" 
          width="800"
          height="450"
          loading="lazy"
          decoding="async"
        />
      </Link>

      <section className="post-card__meta">
        <span className="post-card__cat pill">{post.slug}</span>
        <time dateTime={post.created_at}>
          {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
        </time>
        <span aria-hidden="true">•</span>
        <span>{post.minutes} min read</span>
      </section>

      <h3 className="post-card__title">
        <Link to={`/the-campfire/${post.slug}`}>{post.title}</Link>
      </h3>

      <p className="post-card__excerpt">{post.excerpt}</p>
      <Link to={`/the-campfire/${post.slug}`} className="post-card__more">Read more</Link>
    </article>
  );
}