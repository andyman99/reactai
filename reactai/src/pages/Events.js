import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import * as contentful from 'contentful';
import EventCard from '../components/EventCard';
import EventDetails from '../components/EventDetails';
import '../css/Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const client = contentful.createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
    });

    const currentDate = new Date().toISOString();

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
      <Routes>
        {/* Event list route */}
        <Route 
          path="/" 
          element={(
            <section className="events">
              <h2>Arrangement</h2>
              {events.length > 0 ? (
                events.map((event) => (
                  <EventCard 
                    key={event.sys.id} 
                    post={event} 
                    onClick={() => navigate(`/events/${event.sys.id}`)}  // Navigate to event details
                  />
                ))
              ) : (
                <p>No events available.</p>
              )}
            </section>
          )}
        />
        {/* Event details route */}
        <Route path="/:id" element={<EventDetails />} />
      </Routes>
    </section>
  );
};

export default Events;
