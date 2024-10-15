import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import * as contentful from 'contentful';
import BlogPostCard from '../components/BlogPostCard';
import BlogPostDetails from '../components/BlogPostDetails';  // Import BlogPostDetails

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const client = contentful.createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
    });

    const currentDate = new Date().toISOString();

    client.getEntries({
      content_type: 'blogpost',
      'fields.published': true,
      'fields.publishDate[lte]': currentDate,
    })
    .then((response) => {
      // Sort posts by publishDate (newest first)
      const sortedPosts = response.items.sort((a, b) => new Date(b.fields.publishDate) - new Date(a.fields.publishDate));
      setPosts(sortedPosts);
    })
    .catch((error) => {
      console.error("Error fetching blog posts:", error);
    });
  }, []);

  return (
    <div className='container'>
      <h2>Blogg</h2>
      
      <Routes>
        {/* Blog post list (cards) */}
        <Route
          path="/"
          element={(
            <div className="blog-posts">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <BlogPostCard key={post.sys.id} post={post} onClick={() => navigate(`/blog/${post.sys.id}`)} />
                ))
              ) : (
                <p>No blog posts available.</p>
              )}
            </div>
          )}
        />
        
        {/* Blog post details */}
        <Route path="/:id" element={<BlogPostDetails />} />
      </Routes>
    </div>
  );
};

export default Blog;
