import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import * as contentful from 'contentful';
import EventCard from '../components/EventCard';
import EventDetails from '../components/EventDetails';  // Import EventDetails'
import '../css/Events.css';

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

  return (
    <section className="container">
      <h2>Arrangement</h2>

      <Routes>
        {/* Event list (cards) */}
        <Route
          path="/"
          element={(
            <section className="events">
              {events.length > 0 ? (
                events.map((post) => (
                  <EventCard key={post.sys.id} post={post} onClick={() => navigate(`/events/${post.sys.id}`)} />
                ))
              ) : (
                <p>No events available.</p>
              )}
            </section>
          )}
        />
        
        {/* Event details */}
        <Route path="/events/:id" element={<EventDetails />} />  {/* Make sure the route is "/events/:id" */}
      </Routes>
    </section>
  );
};

export default Events;
