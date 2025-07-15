// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice'; // Import your counter reducer

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Add your counter reducer here
    // other features will go here
  },
});
