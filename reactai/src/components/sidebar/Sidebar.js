import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as contentful from 'contentful';
import { Card } from '../../components'; // Import the Card component
import './Sidebar.css';

const Sidebar = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const client = contentful.createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
    });

    // Fetch featured blog posts
    client.getEntries({
      content_type: 'blogpost',
      'fields.featured': true,
      'fields.published': true,
      order: '-fields.date',
      limit: 2,
    })
    .then((response) => {
      setFeaturedPosts(response.items);
    })
    .catch((error) => {
      console.error("Error fetching featured blog posts:", error);
    });

    // Fetch upcoming events
    const currentDate = new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString();
    client.getEntries({
      content_type: 'event',
      'fields.published': true,
      'fields.date[gte]': currentDate,
      order: 'fields.date',
      limit: 2,
    })
    .then((response) => {
      setUpcomingEvents(response.items);
    })
    .catch((error) => {
      console.error("Error fetching upcoming events:", error);
    });
  }, []);

  return (
    <aside className="sidebar">
      <section className="sidebar-section">
        <h3>Fremhevede Blogginnlegg</h3>
        {featuredPosts.length > 0 ? (
          featuredPosts.map((post) => (
            <Card 
              key={post.sys.id}
              post={post}
              onClick={() => navigate(`/blog/${post.sys.id}`)}
            />
          ))
        ) : (
          <p>Ingen fremhevede blogginnlegg tilgjengelig.</p>
        )}
      </section>

      <section className="sidebar-section">
        <h3>Neste Arrangement</h3>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <Card 
              key={event.sys.id}
              post={event}
              onClick={() => navigate(`/events/${event.sys.id}`)}
            />
          ))
        ) : (
          <p>Ingen kommende arrangementer tilgjengelig.</p>
        )}
      </section>
    </aside>
  );
};

export default Sidebar;
