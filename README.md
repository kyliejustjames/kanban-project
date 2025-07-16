# My Reddit Clone App

## Project Overview

This is a single-page application (SPA) built with React and Redux that allows users to browse, search, and filter posts from Reddit. Users can also view a detailed modal for each post, including its comments.

## Live Demo

[Link to your GitHub Pages live site (once the proxy is set up and it's working)]
*(Note: As of now, the live site may not fully function due to Reddit API restrictions on client-side requests. A server-side proxy will be needed for full functionality.)*


## Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **Redux Toolkit:** The official, opinionated, batteries-included toolset for efficient Redux development, including `createSlice` and `createAsyncThunk`.
* **React Redux:** Official React bindings for Redux.
* **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
* **@tailwindcss/typography:** A Tailwind CSS plugin that provides a set of `prose` classes to add beautiful typographic defaults to raw HTML.
* **PostCSS:** A tool for transforming CSS with JavaScript plugins, used by Tailwind.
* **Autoprefixer:** A PostCSS plugin to parse CSS and add vendor prefixes to CSS rules.
* **`gh-pages`:** A utility to publish a `build` directory to a `gh-pages` branch on GitHub.
* **Reddit API:** Used to fetch post and comment data.

## Features

### Current Features:

* **Browse Popular Posts:** Displays a feed of popular posts from Reddit on initial load.
* **Search Posts:** Allows users to search Reddit posts by keywords using a dedicated search bar.
* **Filter Categories:** Provides buttons (Hot, New, Top) to filter the "popular" feed.
* **Detailed Post View (Modal):** Clicking on any post opens a modal displaying:
    * Full post title and content (text, images, videos, external links).
    * Author, subreddit, upvotes, and comment count.
    * Dynamically fetched and displayed comments for that specific post.
* **Responsive Design:** (To be fully implemented/verified) The application layout adapts to various screen sizes (desktop, tablet, mobile).
* **Error Handling:** Displays user-friendly messages for API fetch failures.

### Planned Features (Future Work):


* **Subreddit Navigation:** Allow users to directly navigate to specific subreddits (e.g., `/r/reactjs`).
* **Infinite Scrolling/Pagination:** Implement a way to load more posts as the user scrolls or clicks a "Load More" button to handle large datasets.
* **User Authentication (Optional):** Integrate Reddit's OAuth for user login, allowing upvoting/downvoting, saving posts, etc.
* **Improved Media Handling:** More robust handling for various media types (e.g., galleries, GIFs, embedded content).
* **Accessibility Enhancements:** Ensure the application is fully accessible (keyboard navigation, ARIA attributes).
* **Animations and Transitions:** Add delightful animations for UI interactions (e.g., modal open/close, post loading).
* **Unit and End-to-End Testing:** Implement comprehensive tests for components and user flows.
* **Lighthouse Optimization:** Optimize for performance, accessibility, best practices, and SEO to achieve high Lighthouse scores.
* **Server-Side Proxy:** Implement a small Node.js/Express (or similar) proxy server to bypass client-side `User-Agent` restrictions for live deployment on GitHub Pages.
* **Rate Limit Handling:** Programmatically address Reddit API rate limits (e.g., with caching, debouncing).

## Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/kyliejustjames/kanban-project.git](https://github.com/kyliejustjames/kanban-project.git)
    cd kanban-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up Tailwind CSS (for v4.x.x):**
    * Ensure `@tailwindcss/typography` is installed: `npm install @tailwindcss/typography`
    * Ensure `@tailwindcss/cli` is installed: `npm install -D @tailwindcss/cli`
    * Manually create `postcss.config.js` in your project root:
        ```javascript
        // postcss.config.js
        module.exports = {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        };
        ```
    * Manually create `tailwind.config.js` in your project root:
        ```javascript
        // tailwind.config.js
        /** @type {import('tailwindcss').Config} */
        module.exports = {
          content: [
            "./src/**/*.{js,jsx,ts,tsx}",
          ],
          theme: {
            extend: {},
          },
          plugins: [
            require('@tailwindcss/typography'),
          ],
        }
        ```
    * Ensure your `src/App.css` contains only:
        ```css
        /* src/App.css */
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```
4.  **Start the development server:**
    ```bash
    npm start
    ```
    The app will open in your browser at `http://localhost:3000`.

## Deployment

This application is deployed to GitHub Pages.
To deploy:
1.  Ensure `gh-pages` is installed: `npm install gh-pages --save-dev`
2.  Add the `homepage` and `deploy` scripts to your `package.json`:
    ```json
    "homepage": "[https://kyliejustjames.github.io/kanban-project](https://kyliejustjames.github.io/kanban-project)",
    "scripts": {
      // ... other scripts
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build"
    }
    ```
3.  Run the deploy command:
    ```bash
    npm run deploy
    ```



