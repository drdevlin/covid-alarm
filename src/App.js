import React from 'react';
import { Gauge } from './features/gauge/Gauge';
import { Header } from './features/header/Header';
import './App.css';

function App() {
  return (
    <main className="App">
      <Header />
      <Gauge />
    </main>
  );
}

export default App;
