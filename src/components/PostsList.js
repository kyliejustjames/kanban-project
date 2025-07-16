// src/components/PostsList.js
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllPosts, selectPostsStatus, selectPostsError } from '../features/posts/postsSlice';
import PostListItem from './PostListItem';

function PostsList() {
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  let content;

  if (postsStatus === 'loading') {
    content = <p className="text-center text-lg text-gray-700">Loading posts...</p>;
  } else if (postsStatus === 'succeeded') {
    content = (
      <div className="space-y-6"> {/* Increased from space-y-4 to space-y-6 */}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))
        ) : (
          <p className="text-center text-lg text-gray-700">No posts found. Try refreshing.</p>
        )}
      </div>
    );
  } else if (postsStatus === 'failed') {
    content = <p className="text-center text-lg text-orange-600">Error: {error}</p>;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      {}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Posts</h2>
      {content}
    </section>
  );
}

export default PostsList;