// src/features/posts/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit = 'popular') => {

    const url = subreddit === 'popular'
        ? '/.json' 
        : `/r/${subreddit}/.json`; 

    console.log(`Fetching from proxy: ${url}`); 

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'my-reddit-clone-app/1.0 (by your_reddit_username)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} from proxy path ${url}`);
    }

    const json = await response.json();

    return json.data.children.map(post => post.data);
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
    lastSuccessfulPosts: [],
    lastSuccessfulQuery: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
        state.lastSuccessfulPosts = action.payload;
        state.lastSuccessfulQuery = action.meta.arg;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;

        if (state.lastSuccessfulPosts.length > 0) {
          console.warn("API fetch failed, but displaying last successful data.");
          state.error = `Failed to load new data: ${action.error.message}. Displaying cached data.`;
        } else {
          state.posts = [];
        }
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;

export default postsSlice.reducer;