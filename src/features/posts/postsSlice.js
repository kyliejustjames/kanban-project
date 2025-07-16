// src/features/posts/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the async thunk for fetching posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ query = '', sortCategory = 'hot', after = null }, { rejectWithValue }) => {
    try {
      // Construct the URL for the Reddit API
      const url = query
        ? `https://www.reddit.com/search.json?q=${query}&sort=${sortCategory}&limit=10&after=${after || ''}`
        : `https://www.reddit.com/r/popular/${sortCategory}.json?limit=10&after=${after || ''}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();

      if (!json.data || !json.data.children) {
        throw new Error('Invalid data structure received from Reddit API.');
      }

      const posts = json.data.children.map(child => ({
        id: child.data.id,
        title: child.data.title,
        author: child.data.author,
        subreddit: child.data.subreddit,
        score: child.data.score,
        num_comments: child.data.num_comments,
        created_utc: child.data.created_utc,
        thumbnail: child.data.thumbnail,
        url: child.data.url,
        permalink: child.data.permalink,
        selftext_html: child.data.selftext_html,
        is_video: child.data.is_video,
        media: child.data.media,
        url_overridden_by_dest: child.data.url_overridden_by_dest,
        post_hint: child.data.post_hint,
        userVote: 0,
      }));

      return { posts, after: json.data.after };

    } catch (error) {
      console.error("Failed to fetch posts:", error);
      return rejectWithValue(error.message || 'Failed to fetch posts.');
    }
  }
);

// Define the async thunk for fetching comments
export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (permalink, { rejectWithValue }) => {
    try {
      const url = `https://www.reddit.com${permalink}.json`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();

      if (!json[1] || !json[1].data || !json[1].data.children) {
        return [];
      }

      const comments = json[1].data.children
        .filter(child => child.kind === 't1')
        .map(child => ({
          id: child.data.id,
          author: child.data.author,
          body: child.data.body,
          body_html: child.data.body_html,
          score: child.data.score,
          created_utc: child.data.created_utc,
        }));

      return comments;

    } catch (error) {
      console.error("Failed to fetch comments:", error);
      return rejectWithValue(error.message || 'Failed to fetch comments.');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
    selectedPost: null,
    comments: [],
    commentsStatus: 'idle',
    commentsError: null,
    currentQuery: '',
    currentSortCategory: 'hot',
    after: null,
    hasMore: true,
  },
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
      state.comments = [];
      state.commentsStatus = 'idle';
      state.commentsError = null;
    },
    resetPosts: (state, action) => {
      state.posts = [];
      state.status = 'idle';
      state.error = null;
      state.currentQuery = action.payload.query || '';
      state.currentSortCategory = action.payload.sortCategory || 'hot';
      state.after = null;
      state.hasMore = true;
    },
    upvotePost: (state, action) => {
      const postId = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        if (post.userVote === 1) {
          post.score -= 1;
          post.userVote = 0;
        } else if (post.userVote === -1) {
          post.score += 2;
          post.userVote = 1;
        } else {
          post.score += 1;
          post.userVote = 1;
        }
      }
      if (state.selectedPost && state.selectedPost.id === postId) {
        state.selectedPost.score = post.score;
        state.selectedPost.userVote = post.userVote;
      }
    },
    downvotePost: (state, action) => {
      const postId = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        if (post.userVote === -1) {
          post.score += 1;
          post.userVote = 0;
        } else if (post.userVote === 1) {
          post.score -= 2;
          post.userVote = -1;
        } else {
          post.score -= 1;
          post.userVote = -1;
        }
      }
      if (state.selectedPost && state.selectedPost.id === postId) {
        state.selectedPost.score = post.score;
        state.selectedPost.userVote = post.userVote;
      }
    },
    // THESE ARE THE NEW ACTIONS THAT NEED TO BE EXPORTED
    clearError: (state) => {
      state.error = null;
      state.status = 'idle';
      state.hasMore = true;
    },
    clearCommentsError: (state) => {
      state.commentsError = null;
      state.commentsStatus = 'idle';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        if (action.meta.arg.after === null) {
          state.posts = [];
          state.hasMore = true;
        }
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.concat(action.payload.posts);
        state.after = action.payload.after;
        state.hasMore = action.payload.after !== null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || action.payload || 'Failed to fetch posts.';
        state.hasMore = false;
      })
      .addCase(fetchComments.pending, (state) => {
        state.commentsStatus = 'loading';
        state.commentsError = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsStatus = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.commentsStatus = 'failed';
        state.commentsError = action.error.message || action.payload || 'Failed to fetch comments.';
      });
  }
});

export const {
  setSelectedPost,
  clearSelectedPost,
  resetPosts, // Make sure this is here
  upvotePost,
  downvotePost,
  clearError, // Make sure this is here
  clearCommentsError // Make sure this is here
} = postsSlice.actions;
export default postsSlice.reducer;

// Selectors
export const selectAllPosts = state => state.posts.posts;
export const selectPostsStatus = state => state.posts.status;
export const selectPostsError = state => state.posts.error;
export const selectSelectedPost = state => state.posts.selectedPost;
export const selectComments = state => state.posts.comments;
export const selectCommentsStatus = state => state.posts.commentsStatus;
export const selectCommentsError = state => state.posts.commentsError;
export const selectAfter = state => state.posts.after;
export const selectHasMore = state => state.posts.hasMore;
export const selectCurrentQuery = state => state.posts.currentQuery;
export const selectCurrentSortCategory = state => state.posts.currentSortCategory;