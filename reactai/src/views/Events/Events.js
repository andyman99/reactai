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

    // Get current date (adjust for timezone if needed)
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

  // Group events by year and render EventCards
  const renderEventsByYear = () => {
    let currentYear = null;
    return events.map((post) => {
      const eventYear = new Date(post.fields.date).getFullYear();
      const showYear = eventYear !== currentYear;
      currentYear = eventYear;

      return (
        <EventCard
          key={post.sys.id}
          post={post}
          year={showYear ? eventYear : null}
          onClick={() => navigate(`/events/${post.sys.id}`)}
        />
      );
    });
  };

  return (
    <section className="container">
      <h2>Arrangement</h2>
      <em>Dette er en prosjekt side. Det er mye feilinformasjon her. Ikke se på dette som fakta.</em>
      <hr />
      <br />

      <Routes>
        {/* Events list */}
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

        {/* Event details page */}
        <Route path="/:id" element={<EventDetails />} />
      </Routes>
    </section>
  );
};

export default Events;