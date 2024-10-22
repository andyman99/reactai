import React from 'react';

const EventCard = ({ post, onClick }) => {
  const { title, date, locationName } = post.fields;

  // Extract day, month, and year from the event date
  const eventDate = new Date(date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('no-NO', { month: 'short' }).toUpperCase();  // Get month and uppercase it

  return (
    <article className="event-card" onClick={onClick}>
      <div className="event-date">
        <p>{day}</p>  {/* Render the formatted day and uppercase month */}
        <p>{month}</p> {/* Render the year if you want */}
      </div>
      <div className="event-info">
        <h3>{title}</h3>
        <p>{locationName}</p>  {/* Location of the event */}
        <p style={{ color: 'blue', cursor: 'pointer' }}>Les mer</p>  {/* Read more link */}
      </div>
    </article>
  );
};

export default EventCard;
