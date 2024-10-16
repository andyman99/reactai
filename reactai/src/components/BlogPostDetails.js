import React, { useState, useEffect } from 'react';
import * as contentful from 'contentful';
import { useParams } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ImageModal from '../components/ImageModal';  // Import the ImageModal component for full-size image view

const BlogPostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // For the modal

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



  // Function to open the modal with the selected image
  const openModal = (index) => {
    setSelectedImageIndex(index);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImageIndex(null);
  };

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
          <figcaption>{banner.fields.description || ''}</figcaption>
        </figure>
      )}

      <header>
        <h2>{title}</h2>
        <p>Publisert: {new Intl.DateTimeFormat('no-NO', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(publishDate))}</p>


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

      {/* Rich Text Content */}
      {content && (
        <section className="rich-content">
          {documentToReactComponents(content)}
        </section>
      )}

      {/* Gallery Section */}
      {images && images.length > 0 && (
        <section className="gallery">
          <h3>Galleri</h3>
          <div className="gallery-grid">
            {images.map((image, index) => (
              <figure key={image.sys.id} onClick={() => openModal(index)} className="gallery-item">
                <img
                  src={image.fields.file.url}
                  alt={image.fields.title || 'Gallery Image'}
                  className="gallery-thumbnail"
                />
                {image.fields.title && <figcaption>{image.fields.title}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Image Modal */}
      {selectedImageIndex !== null && (
        <ImageModal
          images={images}
          selectedIndex={selectedImageIndex}
          onClose={closeModal}
        />
      )}
    </article>
  );
};

export default BlogPostDetails;
