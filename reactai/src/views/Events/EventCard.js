import React from 'react';

const EventCard = ({ post, year, onClick }) => {
  const { title, date, locationName } = post.fields;

  const eventDate = new Date(date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('no-NO', { month: 'short' }).toUpperCase();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onClick(e);  // Support keyboard navigation (Enter key)
    }
  };

  return (
    <div className="event-row">
      {/* Show year in first column if provided */}
      {year && <div className="event-year">{year}</div>}

      {/* Entire card is clickable and accessible */}
      <article
        className="event-card"
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex="0"                  // Focusable for keyboard users
        role="button"                  // Screen readers will treat it like a button
        aria-label={`Les mer om ${title}`} // Better screen reader announcement
      >
        <time dateTime={date} className="event-date">
          <p>{day}</p>
          <p>{month}</p>
        </time>

        <div className="event-info">
          <h3>{title}</h3>
          <p>{locationName}</p>
        </div>
      </article>
    </div>
  );
};

export default EventCard;