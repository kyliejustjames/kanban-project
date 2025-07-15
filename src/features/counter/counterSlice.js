// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter', // A name for your slice (used in action types)
  initialState,    // The initial state for this slice
  reducers: {      // Define how state changes based on actions
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Selector to easily get the counter value from the state
export const selectCount = (state) => state.counter.value;

// The reducer for this slice
export default counterSlice.reducer;



