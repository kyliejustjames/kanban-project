// src/components/Header.js
import React from 'react';

function Header() {
  return (
    <header className="bg-cyan-700 p-4 shadow-md rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold"> {/* text-white is good for dark blue background */}
          <span className="hidden sm:inline">My </span>Reddit Clone
        </h1>
        {/* Search and filter will go here later */}
        <div className="flex items-center space-x-4">
          {/* Placeholder for future search/filter input */}
          <input
            type="text"
            placeholder="Search Reddit..."
            className="p-2 rounded-md border border-gray-300 focus:outline-none 
                       focus:ring-2 focus:ring-cyan-700 text-gray-800 hidden md:block" // Changed focus:ring-red-400 to focus:ring-blue-400
          />
          {/* Login button: Keep white background, but change text color to match header blue */}
          <button className="bg-white text-cyan-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 transition duration-200 ease-in-out">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;