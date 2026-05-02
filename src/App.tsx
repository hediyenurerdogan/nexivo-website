import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-dark text-text-light font-sans overflow-x-hidden selection:bg-accent-purple selection:text-white">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-[100] flex justify-between items-center px-6 md:px-[5vw] py-6 border-b border-border-subtle bg-bg-dark/80 backdrop-blur-md box-border">
        <a href="#" className="text-2xl md:text-[1.8rem] font-extrabold tracking-[1px] text-white no-underline">
          NEXIVO
        </a>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="#" className="text-[#a1a1aa] no-underline font-medium transition-colors duration-300 hover:text-white">Teknoloji</a>
          <a href="#" className="text-[#a1a1aa] no-underline font-medium transition-colors duration-300 hover:text-white">Vizyon</a>
          <a href="mailto:destek@nexivotr.com" className="text-[#a1a1aa] no-underline font-medium transition-colors duration-300 hover:text-white">İletişim</a>
          <a 
            href="tekmer.html" 
            className="bg-accent-green/10 text-accent-green border border-accent-green px-5 py-2.5 rounded-lg font-semibold animate-pulse-border hover:bg-accent-green hover:text-black transition-all duration-300"
          >
            ▶ TWINnovation Pitch
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-[85px] left-0 w-full bg-bg-dark/95 backdrop-blur-xl border-b border-border-subtle z-50 md:hidden flex flex-col p-6 gap-6 shadow-2xl">
          <a href="#" className="text-lg text-[#a1a1aa] font-medium hover:text-white transition-colors">Teknoloji</a>
          <a href="#" className="text-lg text-[#a1a1aa] font-medium hover:text-white transition-colors">Vizyon</a>
          <a href="mailto:destek@nexivotr.com" className="text-lg text-[#a1a1aa] font-medium hover:text-white transition-colors">İletişim</a>
          <a 
            href="tekmer.html" 
            className="bg-accent-green/10 text-accent-green border border-accent-green px-5 py-3 rounded-lg font-semibold text-center animate-pulse-border hover:bg-accent-green hover:text-black transition-all duration-300 mt-2"
          >
            ▶ TWINnovation Pitch
          </a>
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-5 pt-[100px] md:pt-[60px] bg-[radial-gradient(circle_at_center,#18181b_0%,#09090b_100%)]">
        <h1 className="text-5xl md:text-[4.5rem] mb-4 bg-gradient-to-br from-white to-[#a1a1aa] bg-clip-text text-transparent font-bold leading-tight">
          Impossible to Spoof.
        </h1>
        <p className="text-lg md:text-[1.3rem] text-[#a1a1aa] max-w-[600px] mb-12 leading-relaxed">
          Biyometrik güvenlikte yeni standart: "Sıfır Güven" mimarisiyle tasarlanmış, deri altı damar haritalama teknolojisi.
        </p>
        
        {/* TEKMER Call to Action Kutusu */}
        <div className="bg-card-dark border border-accent-purple p-8 md:p-12 rounded-2xl max-w-[700px] w-full shadow-[0_20px_40px_rgba(139,92,246,0.1)] relative overflow-hidden text-left group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-purple to-accent-green"></div>
          
          <div className="text-accent-purple font-bold mb-4 tracking-[2px] text-sm md:text-base">ÖZEL SUNUM</div>
          <h2 className="mt-0 text-white text-2xl md:text-3xl font-bold mb-4">MEXT TWINnovation Challenge</h2>
          <p className="text-[#a1a1aa] text-base md:text-[1.1rem] mb-8 leading-relaxed">
            Ankara TEKMER Demo Day için hazırladığımız, NEXIVO'nun mimarisini ve Dinamik CVV teknolojisini detaylandıran interaktif sunumumuzu inceleyin.
          </p>
          
          <a 
            href="tekmer.html" 
            className="inline-block bg-text-light text-bg-dark px-6 py-3 md:px-8 md:py-4 rounded-lg no-underline font-bold text-base md:text-[1.1rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
          >
            İnteraktif Sunumu Başlat
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;
