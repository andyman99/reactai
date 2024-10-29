import React from 'react';
import "./Card.css";

const Card = ({ post, onClick }) => {
  const { banner, title, description, date } = post.fields;
  
  return (
    <article className="card" onClick={onClick}>
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
        <p>{new Intl.DateTimeFormat('no-NO', { dateStyle: 'long', timeStyle: 'short'}).format(new Date(date))}</p>
        <p style={{ color: 'blue', cursor: 'pointer' }}>Les mer</p>
      </div>
    </article>
  );
};

export default Card;
