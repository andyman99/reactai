import React, { useState, useEffect } from 'react';
import * as contentful from 'contentful';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const client = contentful.createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
    });

    // Get the current date in ISO format (Contentful uses ISO 8601 format for dates)
    const currentDate = new Date().toISOString();

    // Fetch entries that are published and where the publish date is greater than or equal to the current date
    client.getEntries({
      content_type: 'blogpost',  // Replace with your actual content type ID
      'fields.published': true,  // Filter for entries with the "published" boolean set to true
      'fields.publishDate[lte]': currentDate,  // Fetch posts where publishDate is greater than or equal to now
    })
    .then((response) => {
      setPosts(response.items);  // Set filtered blog posts in state
    })
    .catch((error) => {
      console.error("Error fetching blog posts:", error);
    });
  }, []);

  return (
    <div>
      <h2>Blog</h2>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.sys.id}>
              {/* Render the Banner (Header Image) */}
              {post.fields.banner && (
                <img
                  src={post.fields.banner.fields.file.url}
                  alt={post.fields.banner.fields.title || 'Banner Image'}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
                
              <h2>{post.fields.title}</h2>
              <p>{post.fields.description}</p>
              <p>{post.fields.content}</p>
              <p><em>Published on: {new Date(post.fields.publishDate).toDateString()}</em></p>
                
                {/* Render the Gallery Images (if any) */}
                {post.fields.images && post.fields.images.length > 0 && (
                <div className="gallery">
                  {post.fields.images.map((image) => (
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
          ))
        ) : (
          <p>No blog posts available.</p>
        )}
      </div>
    </div>
  );
}

export default Blog;
