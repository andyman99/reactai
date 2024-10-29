import React from 'react';

const EventCard = ({ post, year, onClick }) => {
  const { title, date, locationName } = post.fields;

  // Extract day and month from the event date
  const eventDate = new Date(date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('no-NO', { month: 'short' }).toUpperCase();

  return (
    <div className="event-row">
      {/* Only show the year in the first column when the year prop is passed */}
      {year && <div className="event-year">{year}</div>}
      <article className="event-card" onClick={onClick}>
        <div className="event-date">
          <p>{day}</p>
          <p>{month}</p>
        </div>
        <div className="event-info">
          <h3>{title}</h3>
          <p>{locationName}</p>
          <p style={{ color: 'blue', cursor: 'pointer' }}>Les mer</p>
        </div>
      </article>
    </div>
  );
};

export default EventCard;
