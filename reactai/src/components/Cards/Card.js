import React, { useCallback } from 'react';
import "./Card.css";

const Card = ({ post, onClick }) => {
  const { banner, title, description, date } = post.fields;

  // Wrap the click handler in useCallback to avoid re-creating it on every render
  const handleCardInteraction = useCallback((e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      onClick(e);
    }
  }, [onClick]);

  return (
    <article
      className="card"
      tabIndex="0" // Makes the entire card focusable with TAB
      role="button" // Helps screen readers understand it's interactive
      onClick={handleCardInteraction}
      onKeyDown={handleCardInteraction}
      aria-label={`Les mer om ${title}`} // Screen reader gets context
    >
      {/* Render the banner image or fallback background */}
      {banner ? (
        <figure className="card-image">
          <img
            src={banner.fields.file.url}
            alt={banner.fields.title || 'Bannerbilde'}
          />
        </figure>
      ) : (
        <div
          className="card-image fallback-background"
          aria-label="Placeholder image with text HSMC"
        >
          <p className="fallback-text">HSMC</p>
        </div>
      )}

      {/* Card content */}
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <time dateTime={new Date(date).toISOString()}>
          {new Intl.DateTimeFormat('no-NO', { dateStyle: 'long', timeStyle: 'short'}).format(new Date(date))}
        </time>
      </div>
    </article>
  );
};

export default Card;