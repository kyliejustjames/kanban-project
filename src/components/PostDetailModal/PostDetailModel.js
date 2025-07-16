// src/components/PostDetailModal/PostDetailModal.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedPost,
  clearSelectedPost,
  fetchComments,
  selectComments,
  selectCommentsStatus,
  selectCommentsError,
} from '../../features/posts/postsSlice';

const PostDetailModal = () => {
  const dispatch = useDispatch();
  const selectedPost = useSelector(selectSelectedPost);
  const comments = useSelector(selectComments);
  const commentsStatus = useSelector(selectCommentsStatus);
  const commentsError = useSelector(selectCommentsError);

  useEffect(() => {
    if (selectedPost && selectedPost.permalink) {
      dispatch(fetchComments(selectedPost.permalink));
    }
  }, [selectedPost, dispatch]);

  if (!selectedPost) {
    return null;
  }

  const handleCloseModal = () => {
    dispatch(clearSelectedPost());
  };

  let commentsContent;
  if (commentsStatus === 'loading') {
    commentsContent = <p style={{ textAlign: 'center', color: '#666', marginTop: '16px' }}>Loading comments...</p>;
  } else if (commentsStatus === 'succeeded') {
    if (comments.length === 0) {
      commentsContent = <p style={{ textAlign: 'center', color: '#666', marginTop: '16px' }}>No comments found for this post.</p>;
    } else {
      commentsContent = (
        <div style={{ marginTop: '24px', borderTop: '1px solid #eee', paddingTop: '16px' }}>
          <h3 style={{ fontSize: '1.4em', fontWeight: 'bold', marginBottom: '12px' }}>Comments:</h3>
          {comments.map((comment) => (
            comment.body && comment.body !== '[deleted]' && comment.body !== '[removed]' ? (
              <div key={comment.id} style={{
                backgroundColor: '#f9f9f9',
                borderRadius: '6px',
                padding: '12px',
                marginBottom: '12px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}>
                <p style={{ fontSize: '0.9em', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>{comment.author}</p>
                <div
                  className="markdown-content" /* Use the new markdown-content class */
                  style={{ color: '#444', fontSize: '0.9em', lineHeight: '1.4' }}
                  dangerouslySetInnerHTML={{ __html: comment.body_html }}
                ></div>
                <p style={{ fontSize: '0.75em', color: '#888', marginTop: '8px' }}>{comment.score} upvotes</p>
              </div>
            ) : null
          ))}
        </div>
      );
    }
  } else if (commentsStatus === 'failed') {
    commentsContent = (
      <p style={{ textAlign: 'center', color: '#dc3545', marginTop: '16px' }}>
        Error loading comments: {commentsError}.
      </p>
    );
  }

  return (
    <div className="modal-overlay"> {/* Use the new modal-overlay class */}
      <div className="modal-content"> {/* Use the new modal-content class */}
        <button onClick={handleCloseModal} className="modal-close-button">
          &times;
        </button>

        <h2 style={{ fontSize: '1.8em', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>{selectedPost.title}</h2>

        {selectedPost.url_overridden_by_dest && selectedPost.post_hint === 'image' && (
          <img
            src={selectedPost.url_overridden_by_dest}
            alt={selectedPost.title}
            style={{ width: '100%', borderRadius: '6px', marginBottom: '16px' }}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/cccccc/000000?text=Image+Not+Found"; }}
          />
        )}

        {selectedPost.is_video && selectedPost.media && selectedPost.media.reddit_video && (
          <video controls style={{ width: '100%', borderRadius: '6px', marginBottom: '16px' }}>
            <source src={selectedPost.media.reddit_video.fallback_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {selectedPost.selftext_html && (
          <div
            className="markdown-content" /* Use the new markdown-content class */
            style={{ marginBottom: '16px' }}
            dangerouslySetInnerHTML={{ __html: selectedPost.selftext_html }}
          ></div>
        )}

        {selectedPost.url && selectedPost.post_hint === 'link' && (
          <p style={{ color: '#007bff', textDecoration: 'underline', marginBottom: '16px' }}>
            <a href={selectedPost.url} target="_blank" rel="noopener noreferrer">
              View External Link: {selectedPost.url}
            </a>
          </p>
        )}

        <p style={{ color: '#666', fontSize: '0.9em' }}>Author: {selectedPost.author}</p>
        <p style={{ color: '#666', fontSize: '0.9em' }}>Subreddit: r/{selectedPost.subreddit}</p>
        <p style={{ color: '#666', fontSize: '0.9em' }}>Upvotes: {selectedPost.ups}</p>
        <p style={{ color: '#666', fontSize: '0.9em' }}>Comments: {selectedPost.num_comments}</p>

        {commentsContent}
      </div>
    </div>
  );
};

export default PostDetailModal;