// src/components/Header.js
import React from 'react';

function Header() {
  return (
    <header style={{
      backgroundColor: '#A3C2DF', /* Blue */
      color: 'white',
      padding: '16px 0',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex', // Use flexbox for layout
      justifyContent: 'space-between', // Space out items
      alignItems: 'center', // Vertically align items
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Main App Title */}
        <h1 style={{ fontSize: '2.5em', margin: 10, fontWeight: 'bold' }}>
          <span style={{ display: window.innerWidth >= 640 ? 'inline' : 'none' }}>My </span>Reddit Clone
        </h1>

        {/* Search and Login Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Search Input - hidden on small screens, block on medium screens */}
          <input
            type="text"
            placeholder="Search Reddit..."
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '1em',
              color: '#333',
              display: window.innerWidth >= 768 ? 'block' : 'none', 
              flexGrow: 1, // Allow input to grow
            }}
          />
          {/* Login button */}
          <button style={{
            backgroundColor: 'white',
            color: '#B3CDD7', // Match header blue
            padding: '8px 16px',
            borderRadius: '4px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'} // hover:bg-gray-100
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;