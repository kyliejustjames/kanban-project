// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';

import * as reactRedux from 'react-redux';

import App from './App';
import { fetchPosts, selectPostsStatus, selectPostsError, selectSelectedPost } from './features/posts/postsSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('./features/posts/postsSlice', () => ({
  ...jest.requireActual('./features/posts/postsSlice'),
  fetchPosts: jest.fn((arg) => ({ type: 'posts/fetchPosts/pending', meta: { arg } })),
  selectPostsStatus: jest.fn(),
  selectPostsError: jest.fn(),
  selectSelectedPost: jest.fn(),
}));


describe('App', () => {
  let mockDispatch;
  let mockSelector;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockSelector = jest.fn((selector) => {
      if (selector === selectPostsStatus) return 'idle';
      if (selector === selectSelectedPost) return null;
      if (selector === selectPostsError) return null;
      return undefined;
    });

    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    reactRedux.useSelector.mockImplementation(mockSelector);

    fetchPosts.mockClear();
  });

  test('renders app title and dispatches initial fetchPosts', async () => {
    render(<App />);

    // CHANGE HERE: Use getByRole to find the heading with "Reddit Clone" in its accessible name
    const appTitleElement = screen.getByRole('heading', { name: /Reddit Clone/i });
    expect(appTitleElement).toBeInTheDocument();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(fetchPosts({ query: 'popular', sortCategory: 'hot' }));
  });
});