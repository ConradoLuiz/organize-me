import React from 'react';
import Router from './routes';
import './global.css';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Router/>
    </GlobalProvider>
  );
}

export default App;
