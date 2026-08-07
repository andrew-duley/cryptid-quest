import React from 'react';
import { Link } from 'react-router-dom';


import { IMAGE_WIDTHS_HERO } from '../config/imageWidths.js';
import Picture from '../components/Picture';

export default function PostCard({ post }) {

  const plainExcerpt = post.excerpt?.replace(/<[^>]*>/g, "") ?? "";

  return(
    <article className="post-card card">
      <Link to={`/the-campfire/${post.slug}`} className="post-card__media-link">
        <div className="post-card__media">
          <Picture 
            imagePath={post.hero_image_url}
            imageWidths={IMAGE_WIDTHS_HERO}
            alt={post.hero_image_alt}
            className = "post-card__hero"
            imgClassName = "post-card__hero-img"
            loading="lazy"
          />
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