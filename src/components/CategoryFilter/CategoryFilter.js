// src/components/CategoryFilter/CategoryFilter.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../features/posts/postsSlice';

const CategoryFilter = () => {
  const dispatch = useDispatch();

  const categories = [
    { name: 'Hot', path: 'hot' },
    { name: 'New', path: 'new' },
    { name: 'Top', path: 'top' },
  ];

  const handleClick = (categoryPath) => {
    dispatch(fetchPosts({ query: 'popular', sortCategory: categoryPath })); 
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
      <button
        onClick={() => handleClick('hot')}
        style={{
          backgroundColor: categories === 'hot' ? '#81A7CC' : '#A3C2DF', /* Darker blue if active */
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
        }}
      >
        Hot
      </button>
      <button
        onClick={() => handleClick('new')}
        style={{
          backgroundColor: categories === 'new' ? '#81A7CC' : '#A3C2DF',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
        }}
      >
        New
      </button>
      <button
        onClick={() => handleClick('top')}
        style={{
          backgroundColor: categories === 'top' ? '#81A7CC' : '#A3C2DF',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
        }}
      >
        Top
      </button>
    </div>
  );
}

export default CategoryFilter;