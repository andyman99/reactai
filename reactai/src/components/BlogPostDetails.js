import React, { useState, useEffect } from 'react';
import * as contentful from 'contentful';
import { useParams } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const BlogPostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const client = contentful.createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
    });

    client.getEntry(id)
      .then((entry) => {
        setPost(entry);

        if (entry.fields.author) {
          client.getEntry(entry.fields.author.sys.id)
            .then((authorEntry) => {
              setAuthor({
                name: authorEntry.fields.authorName,
                profilePicture: authorEntry.fields.profilepicture ? authorEntry.fields.profilepicture.fields.file.url : null,
              });
            })
            .catch((error) => {
              console.error('Error fetching author:', error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching blog post:", error);
      });
  }, [id]);

  if (!post) {
    return <p>Laster inn...</p>;
  }

  const { banner, title, publishDate, description, content, images } = post.fields;
  const publishDateUTCPlus2 = new Date(publishDate);
  publishDateUTCPlus2.setHours(publishDateUTCPlus2.getHours() + 2);

  return (
    <article className="blog-post-details">
      {/* Render the Banner (Header Image) */}
      {banner && (
        <figure className="banner-image">
          <img
            src={banner.fields.file.url}
            alt={banner.fields.title || 'Bannerbilde'}
            style={{ width: '100%', height: 'auto' }}
          />
          <figcaption>{banner.fields.description || 'Banner'}</figcaption>
        </figure>
      )}

      <header>
        <h2>{title}</h2>
        <p>Publisert: {new Intl.DateTimeFormat('no-NO', { dateStyle: 'long' }).format(publishDateUTCPlus2)}</p>

        {/* Author */}
        {author && (
          <section className="author-info">
            <p>Forfatter: {author.name}</p>
            {author.profilePicture && (
              <img 
                src={author.profilePicture} 
                alt={`Profilbilde av ${author.name}`} 
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
            )}
          </section>
        )}
      </header>

      <p>{description}</p>

      {/* Content (if it exists) */}
      {content && (
        <section className="rich-content">
          {documentToReactComponents(content)}
        </section>
      )}

      {/* Gallery Images (if any) */}
      {images && images.length > 0 && (
        <section className="gallery">
          <h3>Bilder</h3>
          {images.map((image) => (
            <figure key={image.sys.id}>
              <img
                src={image.fields.file.url}
                alt={image.fields.title || 'Gallery Image'}
                style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
              />
              {image.fields.title && <figcaption>{image.fields.title}</figcaption>}
            </figure>
          ))}
        </section>
      )}
    </article>
  );
};

export default BlogPostDetails;
