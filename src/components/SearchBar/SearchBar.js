// src/components/SearchBar/SearchBar.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../features/posts/postsSlice'; 

// SearchBar component handles user input for searching Reddit posts.
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    dispatch(fetchPosts(searchTerm));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
      <input
        type="text"
        placeholder="Search Reddit..."
        value={searchTerm}
        onChange={handleInputChange}
        style={{ flexGrow: 1 }} 
      />
      <button type="submit">Search</button> 
    </form>
  );
}

export default SearchBar;
