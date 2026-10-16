import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Teknoloji from './pages/Teknoloji';
import Vizyon from './pages/Vizyon';
import Iletisim from './pages/Iletisim';

function App() {
  const location = useLocation();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [location]);
  return (
    <div className="min-h-screen bg-white text-text-light font-sans">
      <div className="demo-disclosure">Demo — gerçek para işlemi yapılmaz</div>
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teknoloji" element={<Teknoloji />} />
          <Route path="/nasil-calisir" element={<Teknoloji />} />
          <Route path="/vizyon" element={<Vizyon />} />
          <Route path="/iletisim" element={<Iletisim />} />
        </Routes>
      </main><footer className="site-footer"><div className="shell footer-inner"><p>NEXIVO · Mağazadan nakit fikrini birlikte deneyelim.<br />Demo — gerçek para işlemi yapılmaz.</p><div className="footer-links"><a href="#/vizyon#yol-haritasi">Yol haritası ↗</a><a href="#/iletisim">İletişim ↗</a></div></div></footer>
    </div>
  );
}

export default App;
