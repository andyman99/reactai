import React, { useState, useEffect } from 'react';
import * as contentful from 'contentful';
import { useParams } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';  // For rich text rendering

const BlogPostDetails = () => {
  const { id } = useParams();  // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);  // Store author details (name and profile picture)

  useEffect(() => {
    const client = contentful.createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
    });

    // Fetch the blog post entry
    client.getEntry(id)
      .then((entry) => {
        setPost(entry);

        // Fetch the author if there's an author reference
        if (entry.fields.author) {
          client.getEntry(entry.fields.author.sys.id)
            .then((authorEntry) => {
              setAuthor({
                name: authorEntry.fields.authorName,  // Fetch the author's name
                profilePicture: authorEntry.fields.profilepicture ? authorEntry.fields.profilepicture.fields.file.url : null,  // Fetch the profile picture if available
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

  // Convert publish date to UTC+2 for display
  const publishDateUTCPlus2 = new Date(publishDate);
  publishDateUTCPlus2.setHours(publishDateUTCPlus2.getHours() + 2);

  return (
    <div className="blog-post-details">
      {/* Render the Banner (Header Image) */}
      {banner && (
        <div className="banner-image">
          <img
            src={banner.fields.file.url}
            alt={banner.fields.title || 'Bannerbilde'}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}

      {/* Title */}
      <h1>{title}</h1>

      {/* Publish date */}
      <p>Publisert: {new Intl.DateTimeFormat('no-NO', { dateStyle: 'long' }).format(publishDateUTCPlus2)}</p>

      {/* Author */}
      {author && (
        <div className="author-info">
          <p>Forfatter: {author.name}</p>
          {author.profilePicture && (
            <img 
              src={author.profilePicture} 
              alt={`Profilbilde av ${author.name}`} 
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
          )}
        </div>
      )}

      {/* Description */}
      <p>{description}</p>

      {/* Content (if it exists) */}
      {content && (
        <div>
          {documentToReactComponents(content)}
        </div>
      )}

      {/* Gallery Images (if any) */}
      {images && images.length > 0 && (
        <div className="gallery">
          <h3>Bilder</h3>
          {images.map((image) => (
            <img
              key={image.sys.id}
              src={image.fields.file.url}
              alt={image.fields.title || 'Gallery Image'}
              style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPostDetails;
