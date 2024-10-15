import React from 'react';

const BlogPostCard = ({ post, onClick }) => {
  const { banner, title, description, publishDate } = post.fields;

  // Convert the publish date to UTC+2 for display
  const publishDateUTCPlus2 = new Date(publishDate);
  publishDateUTCPlus2.setHours(publishDateUTCPlus2.getHours() + 2);

  return (
    <div className="blog-post-card" onClick={onClick}>
      {/* Render the Banner (Header Image) or fallback to background color */}
      {banner ? (
        <div className="card-image">
          <img
            src={banner.fields.file.url}
            alt={banner.fields.title || 'Bannerbilde'}
          />
        </div>
      ) : (
        <div className="card-image fallback-background">
        <p className="fallback-text">HSMC</p> {/* Add "HSMC" text here */}
          {/* Fallback background color will be shown */}
        </div>
      )}

      {/* Card content with title, description, and date */}
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        {/* Format date in Norwegian Bokmål */}
        <p>{new Intl.DateTimeFormat('no-NO', { dateStyle: 'long' }).format(new Date(publishDate))}</p>
        {/* "Les mer" for the link */}
        <p style={{ color: 'blue', cursor: 'pointer' }}>Les mer</p>
      </div>
    </div>
  );
};

export default BlogPostCard;
