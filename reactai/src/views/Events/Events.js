import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import * as contentful from 'contentful';
import EventCard from './EventCard';
import EventDetails from './EventDetails';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const client = contentful.createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
    });

    const currentDate = new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString();

    client.getEntries({
      content_type: 'event',
      'fields.published': true,
      'fields.date[gte]': currentDate,
    })
    .then((response) => {
      const sortedEvents = response.items.sort((a, b) => new Date(a.fields.date) - new Date(b.fields.date));
      setEvents(sortedEvents);
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
    });
  }, []);

  // Function to group events by year
  const renderEventsByYear = () => {
    let currentYear = null;
    return events.map((post) => {
      const eventYear = new Date(post.fields.date).getFullYear();
      const showYear = eventYear !== currentYear; // Only show the year if it changes
      currentYear = eventYear;
      return (
        <EventCard
          key={post.sys.id}
          post={post}
          year={showYear ? eventYear : null}  // Pass the year prop only if it's the first event of the year
          onClick={() => navigate(`/events/${post.sys.id}`)}
        />
      );
    });
  };

  return (
    <section className="container">
      <h2>Arrangement</h2>
      {/*Fjern*/} <em>Dette er en prosjekt side. Det er mye feilinformasjon her. Ikke se på dette som fakta.</em>
      {/*Fjern*/} <hr></hr>
      {/*Fjern*/} <br></br>
      <Routes>
        {/* Event list (cards) */}
        <Route
          path="/"
          element={(
            <section className="events">
              {events.length > 0 ? (
                renderEventsByYear()
              ) : (
                <p>No events available.</p>
              )}
            </section>
          )}
        />
        
        {/* Event details */}
        <Route path="/:id" element={<EventDetails />} />
      </Routes>
    </section>
  );
};

export default Events;
