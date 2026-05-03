import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Teknoloji from './pages/Teknoloji';
import Vizyon from './pages/Vizyon';
import Iletisim from './pages/Iletisim';

function App() {
  return (
    <div className="min-h-screen bg-bg-dark text-text-light font-sans overflow-x-hidden selection:bg-accent-purple selection:text-white">
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teknoloji" element={<Teknoloji />} />
          <Route path="/vizyon" element={<Vizyon />} />
          <Route path="/iletisim" element={<Iletisim />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
