import React from 'react';

const EventCard = ({ post, onClick }) => {
  const { title, date, locationName } = post.fields;

  return (
    <article className="event-card" onClick={onClick}>
      <div className="event-card-content">
        {/* Date section on the left */}
        <div className="event-date">
          <p>{new Intl.DateTimeFormat('no-NO', { day: 'numeric' }).format(new Date(date))}</p>
          <p>{new Intl.DateTimeFormat('no-NO', { month: 'short' }).format(new Date(date))}</p>
        </div>

        {/* Vertical line */}
        <div className="vertical-line"></div>

        {/* Title and Location on the right */}
        <div className="event-info">
          <h3>{title}</h3>
          <p>{new Intl.DateTimeFormat('no-NO', { timeStyle: 'short' }).format(new Date(date))} | {locationName}</p>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
