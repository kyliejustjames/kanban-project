// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice'; // This import should already be here

export const store = configureStore({
  reducer: {
    posts: postsReducer, // This entry should already be here
  },
});