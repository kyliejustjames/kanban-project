// src/components/SearchBar/SearchBar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// IMPORTANT: We are no longer using 'react-redux' Provider directly in tests,
// nor 'redux-mock-store'. We are mocking the hooks directly.
import * as reactRedux from 'react-redux'; // This import is for mocking purposes

import SearchBar from './SearchBar';
import { fetchPosts } from '../../features/posts/postsSlice';

// MOCK THE REACT-REDUX HOOKS
// This is the core of the new testing strategy to bypass redux-mock-store issues.
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(), // Mock useDispatch to be a Jest mock function
  useSelector: jest.fn(), // Mock useSelector to be a Jest mock function
}));

// MOCK THE ASYNC THUNK ACTION CREATOR
// When fetchPosts() is called in the component, it returns a thunk (a function).
// In our test, we want it to return a plain object action that our mocked dispatch can handle.
jest.mock('../../features/posts/postsSlice', () => ({
  ...jest.requireActual('../../features/posts/postsSlice'), // Keep original exports like selectPostsStatus
  fetchPosts: jest.fn((arg) => ({ type: 'posts/fetchPosts/pending', meta: { arg } })), // Mock fetchPosts to return a plain action object
}));

describe('SearchBar', () => {
  let mockDispatch; // Declare a variable to hold our mocked dispatch function

  beforeEach(() => {
    // Reset the mock for useDispatch before each test to ensure isolation
    mockDispatch = jest.fn();
    reactRedux.useDispatch.mockReturnValue(mockDispatch); // Make useDispatch return our mock

    // Clear calls to our mocked fetchPosts action creator
    fetchPosts.mockClear();
  });

  it('renders correctly', () => {
    // When mocking hooks directly, you render the component without <Provider>
    render(<SearchBar />);
    expect(screen.getByPlaceholderText(/Search Reddit.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText(/Search Reddit.../i);
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    expect(searchInput).toHaveValue('test query');
  });

  it('dispatches fetchPosts with correct query on form submission', async () => {
    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText(/Search Reddit.../i);
    const searchButton = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(searchInput, { target: { value: 'space exploration' } });
    fireEvent.click(searchButton);

    // Now, we assert that our mockDispatch was called with the result of fetchPosts
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(fetchPosts({ query: 'space exploration' }));
  });

  it('dispatches fetchPosts with empty query on empty submission', async () => {
    render(<SearchBar />);
    const searchButton = screen.getByRole('button', { name: /Search/i });

    fireEvent.click(searchButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(fetchPosts({ query: '' }));
  });
});