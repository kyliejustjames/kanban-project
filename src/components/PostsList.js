// src/components/PostsList.js
import React, { useEffect, useRef } from 'react'; // IMPORTANT: Import useRef
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllPosts,
  selectPostsStatus,
  selectPostsError,
  fetchPosts, // IMPORTANT: Import fetchPosts
  selectAfter, // IMPORTANT: Import selectAfter
  selectHasMore, // IMPORTANT: Import selectHasMore
  selectCurrentQuery, // IMPORTANT: Import selectCurrentQuery
  selectCurrentSortCategory, // IMPORTANT: Import selectCurrentSortCategory
  clearError // IMPORTANT: Import clearError
} from '../features/posts/postsSlice';
import PostListItem from './PostListItem';

function PostsList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);
  const after = useSelector(selectAfter);
  const hasMore = useSelector(selectHasMore);
  const currentQuery = useSelector(selectCurrentQuery);
  const currentSortCategory = useSelector(selectCurrentSortCategory);

  const loader = useRef(null); // Ref for the loading indicator element

  // Effect for IntersectionObserver (Infinite Scrolling)
  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '200px', // Trigger when 200px from bottom
      threshold: 1.0, // Trigger when 100% of the target is visible
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      // If the loader is visible, there are more posts, and not already loading
      if (target.isIntersecting && hasMore && postsStatus !== 'loading') {
        // Dispatch fetchPosts with the current query, sort, and the 'after' token
        dispatch(fetchPosts({ query: currentQuery, sortCategory: currentSortCategory, after: after }));
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current); // Start observing the loader element
    }

    // Cleanup function: disconnect observer when component unmounts
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [after, hasMore, postsStatus, dispatch, currentQuery, currentSortCategory]); // Re-run effect if these change

  // Handler for retrying post fetches
  const handleRetryFetchPosts = () => {
    dispatch(clearError()); // Clear the error first
    // Re-dispatch the fetch based on current query/sort, starting from beginning
    dispatch(fetchPosts({ query: currentQuery, sortCategory: currentSortCategory, after: null }));
  };

  let content;

  // Conditional rendering for different states (loading, failed, no posts, succeeded)
  if (postsStatus === 'loading' && posts.length === 0) { // Only show initial loading if no posts yet
    content = <p style={{ textAlign: 'center', fontSize: '1.1em', color: 'var(--color-text-medium)' }}>Loading posts...</p>;
  } else if (postsStatus === 'failed' && posts.length === 0) { // Show retry for initial load failure
    content = (
      <div style={{ textAlign: 'center', padding: 'var(--spacing-md)', border: '1px solid var(--color-error)', borderRadius: 'var(--border-radius-md)', backgroundColor: '#fff5f5', margin: 'var(--spacing-md) auto' }}>
        <p style={{ color: 'var(--color-error)', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)' }}>Error loading posts: {error}</p>
        <button onClick={handleRetryFetchPosts}>Retry</button>
      </div>
    );
  } else if (posts.length === 0 && postsStatus !== 'loading') { // No posts found after search/filter
    content = <p style={{ textAlign: 'center', fontSize: '1.1em', color: 'var(--color-text-medium)' }}>No posts found. Try a different search or filter.</p>;
  } else { // Posts loaded successfully
    content = (
      <div className="flex-container" style={{ flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
    );
  }

  return (
    <section className="section-padding">
      <h2 style={{ fontSize: '1.8em', fontWeight: 'bold', color: 'var(--color-heading)', marginBottom: 'var(--spacing-lg)', textAlign: 'center' }}>Popular Posts</h2>
      {content}

      {/* Loading Indicator / End of Posts / Error for Infinite Scroll */}
      <div ref={loader} style={{ textAlign: 'center', padding: 'var(--spacing-md)' }}>
        {postsStatus === 'loading' && posts.length > 0 && ( // Show loading for infinite scroll
          <p style={{ color: 'var(--color-text-medium)' }}>Loading more posts...</p>
        )}
        {!hasMore && postsStatus === 'succeeded' && posts.length > 0 && (
          <p style={{ color: 'var(--color-text-medium)' }}>You've reached the end of the posts!</p>
        )}
        {postsStatus === 'failed' && posts.length > 0 && ( // Error for infinite scroll
          <div style={{ padding: 'var(--spacing-sm)', border: '1px solid var(--color-error)', borderRadius: 'var(--border-radius-sm)', backgroundColor: '#fff5f5', display: 'inline-block' }}>
            <p style={{ color: 'var(--color-error)', margin: 0, marginBottom: '4px' }}>Error loading more: {error}</p>
            <button onClick={handleRetryFetchPosts} style={{ padding: '6px 12px', fontSize: '0.9em' }}>Retry Load More</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default PostsList;