import React from 'react';

export default function PostCardSkeleton() {
  return(
    <article className="post-card--skeleton card">
      <section className="post-card__media--skeleton media-frame media-frame--contain"></section>

      <section className="post-card__meta--skeleton">
        <span className="post-card__cat--skeleton pill"></span>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
        </time>
        <span aria-hidden="true">•</span>
        <span>{post.minutes} min read</span>
      </section>

      <h3 className="post-card__title">
        <a href={`/the-campfire/${post.slug}`}>{post.title}</a>
      </h3>

      <p className="post-card__excerpt">{post.excerpt}</p>
      <a href={`/the-campfire/${post.slug}`} className="post-card__more">Read more</a>
    </article>
  );
}