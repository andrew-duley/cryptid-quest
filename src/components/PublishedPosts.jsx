import react from 'react';

export default function PublishedPosts({ publishedPosts, onSelectedPublishedPost }) {
  return(
    <ul>
      {publishedPosts.map(post => {
        const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        const formattedCategory = post.category ?? "General";
        return <li key={post.id} className="post">
          <button type="button" onClick={() => onSelectedPublishedPost(post)}>
            <div className="post__title">
              {post.title}
            </div>
            <div className="post__meta">
              {formattedDate +  " • " + formattedCategory}
            </div>
          </button>
        </li>
      })}
    </ul>
  );
}