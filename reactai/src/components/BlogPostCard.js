import React from 'react';

const BlogPostCard = ({ post, onClick }) => {
  const { banner, title, description, publishDate } = post.fields;
  
  return (
    <article className="blog-post-card" onClick={onClick}>
      {/* Render the Banner (Header Image) or fallback to background color */}
      {banner ? (
        <figure className="card-image">
          <img
            src={banner.fields.file.url}
            alt={banner.fields.title || 'Bannerbilde'}
          />
        </figure>
      ) : (
        <div className="card-image fallback-background">
          <p className="fallback-text">HSMC</p>
        </div>
      )}

      {/* Card content with title, description, and date */}
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{new Intl.DateTimeFormat('no-NO', { dateStyle: 'long', timeStyle: 'short'}).format(new Date(publishDate))}</p>
        <p style={{ color: 'blue', cursor: 'pointer' }}>Les mer</p>
      </div>
    </article>
  );
};

export default BlogPostCard;
