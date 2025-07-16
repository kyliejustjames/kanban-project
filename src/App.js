// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import {
  fetchPosts,
  selectPostsStatus,
  selectPostsError,
  selectSelectedPost,
  resetPosts,
  clearError
} from './features/posts/postsSlice';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import PostDetailModal from './components/PostDetailModal/PostDetailModel.js'; 
import PostsList from './components/PostsList';

function App() {
  const dispatch = useDispatch();
  const postsStatus = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);
  const selectedPost = useSelector(selectSelectedPost);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(resetPosts({ query: 'popular', sortCategory: 'hot' }));
      dispatch(fetchPosts({ query: 'popular', sortCategory: 'hot', after: null }));
    }
  }, [postsStatus, dispatch]);

  const handleDismissError = () => {
    dispatch(clearError());
  };

  return (
    <div className="app-container">
      <Header />
      <main className="container section-padding">
        <SearchBar />
        <CategoryFilter />
        <PostsList />
      </main>
      {error && (
        <div style={{
          position: 'fixed',
          bottom: 'var(--spacing-sm)',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--color-error)',
          color: 'var(--color-white)',
          padding: 'var(--spacing-xs) var(--spacing-sm)',
          borderRadius: 'var(--border-radius-sm)',
          boxShadow: 'var(--shadow-soft)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-xs)',
        }}>
          <p style={{ margin: 0 }}>{error}</p>
          <button
            onClick={handleDismissError}
            style={{
              background: 'none',
              border: '1px solid var(--color-white)',
              color: 'var(--color-white)',
              padding: '4px 8px',
              borderRadius: 'var(--border-radius-sm)',
              cursor: 'pointer',
              fontSize: '0.8em',
              fontWeight: 'normal',
              transition: 'background-color var(--transition-speed), color var(--transition-speed)',
              boxShadow: 'none',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Dismiss
          </button>
        </div>
      )}
      {selectedPost && <PostDetailModal />} {/* This is line 83 where the error occurs, ensure PostDetailModal is correctly imported above */}
    </div>
  );
}

export default App;