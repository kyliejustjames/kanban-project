// src/components/PostListItem.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedPost } from '../features/posts/postsSlice';

function PostListItem({ post }) {
  const dispatch = useDispatch();

  const handlePostClick = () => {
    dispatch(setSelectedPost(post));
  };

  return (
    <div
      onClick={handlePostClick}
      className="card" /* Use the new card class */
      style={{
        display: 'flex', // Use flexbox for internal layout
        alignItems: 'flex-start', // Align items to the top
        gap: '16px', // Space between image/thumbnail and text
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'}
    >
      {/* Thumbnail Image */}
      {post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && (
        <img
          src={post.thumbnail}
          alt={post.title}
          style={{
            width: '100px', // Fixed thumbnail width
            height: '100px', // Fixed thumbnail height
            objectFit: 'cover', // Crop image to fit
            borderRadius: '4px',
            flexShrink: 0, // Prevent image from shrinking
          }}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/cccccc/000000?text=No+Img"; }} // Smaller placeholder
        />
      )}

      {/* Post Content Area */}
      <div style={{ flexGrow: 1, overflow: 'hidden' }}> {/* Allow text content to take remaining space */}
        <h2 style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '8px', textAlign: 'left' }}>{post.title}</h2>
        {post.selftext_html && (
          <div
            className="markdown-content" /* Use the new markdown-content class */
            style={{
              color: '#555',
              fontSize: '0.9em',
              marginBottom: '16px',
              maxHeight: '96px', /* Limit height */
              overflow: 'hidden', /* Hide overflow */
              textOverflow: 'ellipsis', /* Add ellipsis for overflowing text */
            }}
            dangerouslySetInnerHTML={{ __html: post.selftext_html }}
          ></div>
        )}
        <p style={{ color: '#666', fontSize: '0.85em' }}>Author: {post.author}</p>
        <p style={{ color: '#666', fontSize: '0.85em' }}>Subreddit: r/{post.subreddit}</p>
      </div>
    </div>
  );
}

export default PostListItem;