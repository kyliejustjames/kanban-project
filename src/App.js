// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import PostsList from './components/PostsList';
import { fetchPosts, selectPostsStatus, selectPostsError } from './features/posts/postsSlice';
import './App.css'; 

function App() {

  const dispatch = useDispatch();
  const postsStatus = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts('popular'));
    }
  }, [postsStatus, dispatch]);
  
  return (
    <div className="min-h-screen bg-sky-50">
      <Header />
      <main>
        <PostsList />
      </main>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-blue-700 text-white p-3 rounded-lg shadow-lg">
          <p>{error}</p>
        </div>
    </div>
  );
}

export default App;