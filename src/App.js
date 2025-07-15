// src/App.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, selectCount } from './features/counter/counterSlice';
import './App.css'; // Keep original CSS if you want, or remove if not needed

function App() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Redux Counter Example</h1>
        <p>Count: {count}</p>
        <div>
          <button onClick={() => dispatch(increment())}>
            Increment
          </button>
          <button onClick={() => dispatch(decrement())}>
            Decrement
          </button>
          <button onClick={() => dispatch(incrementByAmount(5))}>
            Increment by 5
          </button>
        </div>
        <p style={{ marginTop: '20px', fontSize: '0.8em' }}>
          This counter is managed by Redux.
        </p>
      </header>
    </div>
  );
}

export default App;