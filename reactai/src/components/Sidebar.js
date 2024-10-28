import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as contentful from 'contentful';
import '../css/Sidebar.css'; // Import the CSS file from the css folder

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
      order: '-fields.publishDate',
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

  // Function to render a card with a banner image or fallback
  //The card-image only works properly bacause of how react handles css, and loads all css at once. Even thought only the App.css, Home.css and Sidebar.css should work on home, all other css files are loaded here, and the card-image refers to the styling in Blog.css
  const renderCard = (item, type) => {
    const { title, description, banner, publishDate, date, location } = item.fields;
    const isBlog = type === 'blog';

    return (
      <div
        key={item.sys.id}
        className="sidebar-card"
        onClick={() => navigate(`/${isBlog ? 'blog' : 'events'}/${item.sys.id}`)}
      >
      {banner ? (
        <figure className="card-image">
          <img
            src={banner.fields.file.url}
            alt={banner.fields.title || 'Bannerbilde'}
          />
        </figure>
      ) : (
        <div className="card-image fallback-background">
          <p className="fallback-text">HSMC</p>
        </div>
      )}
        <div className="sidebar-card-content">
          <h4 className="sidebar-card-title">{title}</h4>
          <p className="sidebar-card-date">
            {new Date(isBlog ? publishDate : date).toLocaleDateString('no-NO')}
          </p>
          <p className="sidebar-card-description">{isBlog ? description : location}</p>
        </div>
      </div>
    );
  };

  return (
    <aside className="sidebar">
      <section className="sidebar-section">
        <h3>Fremhevede Blogginnlegg</h3>
        {featuredPosts.length > 0 ? (
          featuredPosts.map((post) => renderCard(post, 'blog'))
        ) : (
          <p>Ingen fremhevede blogginnlegg tilgjengelig.</p>
        )}
      </section>

      <section className="sidebar-section">
        <h3>Neste Arrangement</h3>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => renderCard(event, 'event'))
        ) : (
          <p>Ingen kommende arrangementer tilgjengelig.</p>
        )}
      </section>
    </aside>
  );
};

export default Sidebar;
