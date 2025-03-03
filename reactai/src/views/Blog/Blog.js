import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import * as contentful from 'contentful';
import {Card} from '../../components/index';
import BlogPostDetails from './BlogPostDetails';  // Import BlogPostDetails'
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const client = contentful.createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
    });

    const currentDate = new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString();

    client.getEntries({
      content_type: 'blogpost',
      'fields.published': true,
      'fields.date[lte]': currentDate,
    })
    .then((response) => {
      // Sort posts by publishDate (newest first
      const sortedPosts = response.items.sort((a, b) => new Date(b.fields.date) - new Date(a.fields.date));
      setPosts(sortedPosts);
    })
    .catch((error) => {
      console.error("Error fetching blog posts:", error);
    });
  }, []);

  return (
    <section className="container">
      <h2>Blogg</h2>
      {/*Fjern*/} <em>Dette er en prosjekt side. Det er mye feilinformasjon her. Ikke se på dette som fakta.</em>
      {/*Fjern*/} <hr aria-hidden="true" />
      {/*Fjern*/} <br></br>
      
      <Routes>
        {/* Blog post list (cards) */}
        <Route
          path="/"
          element={(
            <section className="blog-posts">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Card key={post.sys.id} post={post} onClick={() => navigate(`/blog/${post.sys.id}`)} />
                ))
              ) : (
                <p>No blog posts available.</p>
              )}
            </section>
          )}
        />
        
        {/* Blog post details */}
        <Route path="/:id" element={<BlogPostDetails />} />
      </Routes>
    </section>
  );
};

export default Blog;
