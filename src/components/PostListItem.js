// src/components/PostListItem.js
import React from 'react';

function timeAgo(timestamp) {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}

function PostListItem({ post }) {
  const defaultThumbnail = "https://placehold.co/60x60/FF5700/FFFFFF?text=R"; // Default if no thumbnail or invalid

  return (
    // Main Card Container:
    // - Removed my-4 (rely on space-y from PostsList for separation)
    // - Kept shadow-md, hover:shadow-lg, rounded-lg, transition for a sleek card look
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 transition-all duration-200 ease-in-out hover:shadow-lg">
      {/* Score/Votes Section */}
      {/* Increased padding for more visual space (px-3 py-2 vs p-2) */}
      {/* Added border-r and border-gray-200 for a subtle separator on larger screens */}
      <div className="flex flex-col items-center justify-center px-3 py-2 bg-gray-50 rounded-md w-full sm:w-auto flex-shrink-0 sm:border-r sm:border-gray-200">
        <button className="text-gray-400 hover:text-cyan-500 focus:outline-none transition duration-150 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <span className="font-bold text-lg text-gray-800">{post.score}</span> {/* Kept strong gray for score */}
        <button className="text-gray-400 hover:text-cyan-500 focus:outline-none transition duration-150 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail and Content */}
      {/* Added pl-4 on sm:flex-row to give some space when border-r is present on score section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center flex-grow space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:pl-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          <img
            src={post.thumbnail && post.thumbnail.startsWith('http') ? post.thumbnail : defaultThumbnail}
            alt="Post thumbnail"
            className="w-16 h-16 object-cover rounded-md"
            onError={(e) => { e.target.onerror = null; e.target.src = defaultThumbnail; }}
          />
        </div>

        {/* Post Details */}
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {/* Post Title: Changed text-red-700 to text-cyan-700 */}
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-cyan-700">
              {post.title}
            </a>
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Posted by <span className="font-medium text-cyan-700">{post.author}</span> in{' '} {/* Changed text-red-600 to text-cyan-700 */}
            <span className="font-medium text-cyan-600">r/{post.subreddit}</span> • {timeAgo(post.created_utc)} {/* Changed text-blue-600 to text-cyan-600 */}
          </p>
          {post.selftext && (
            <p className="text-gray-700 text-sm mt-1 line-clamp-3">
              {post.selftext}
            </p>
          )}
          <div className="flex items-center mt-3 text-gray-600 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span>{post.num_comments} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostListItem;