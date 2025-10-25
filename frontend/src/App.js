import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Builder from './pages/Builder';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Builder />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;