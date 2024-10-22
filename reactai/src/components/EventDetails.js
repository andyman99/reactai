import React, { useState, useEffect } from 'react';
import * as contentful from 'contentful';
import { useParams } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const EventDetails = () => {
  const { id } = useParams();  // Get the event ID from the URL
  const [post, setEvent] = useState(null);

  useEffect(() => {
    const client = contentful.createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
    });

    // Fetch the event entry
    client.getEntry(id)
      .then((entry) => {
        console.log("Fetched event entry:", entry);  // Log the full event data
        setEvent(entry);
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
      });
  }, [id]);

  if (!post) {
    return <p>Laster inn...</p>;  // Show loading state while fetching the event data
  }

  const { banner, title, date, locationName, content, register } = post.fields;

  return (
    <article className="event-details">
      {/* Render the Banner (Header Image) */}
      {banner && banner.fields && (
        <figure className="banner-image">
          <img
            src={banner.fields.file.url}
            alt={banner.fields.title || 'Bannerbilde'}
            style={{ width: '100%', height: 'auto' }}
          />
          <figcaption>{banner.fields.description || ''}</figcaption>
        </figure>
      )}

      <header>
        <h2>{title}</h2>
        <em>Dato: {new Intl.DateTimeFormat('no-NO', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(date))}</em>
        <p>Sted: {locationName}</p>
      </header>


      <div className='container'>

      {/* Render content if exists */}
      {content && (
        <section className="event-content">
          <h3>Beskrivelse</h3>
          <p>{content}</p>
        </section>
      )}
      {/* Render register info (rich text) */}
      {register ? (
        <section className="register">
          <h3>Påmelding</h3>
          {documentToReactComponents(register)}
        </section>
      ):<h3>ingenting å vise</h3>}

      </div>
      
    </article>
  );
};

export default EventDetails;
