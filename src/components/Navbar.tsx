import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMobileMenuOpen(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav aria-label="Ana menü" className="fixed w-full top-8 z-[100] flex justify-between items-center gap-4 px-6 md:px-[5vw] py-3 md:py-4 border-b border-border-subtle bg-bg-dark/80 backdrop-blur-md box-border">
      <div className="flex-1 flex justify-start">
        <Link to="/" onClick={closeMenu} className="navbar-logo-link" aria-label="NEXIVO ana sayfa">
          <img className="navbar-logo-image" src="/nexivo-logo-hero.png" alt="NEXIVO" />
        </Link>
      </div>

      <div className="hidden lg:flex justify-center gap-8 items-center flex-1 whitespace-nowrap">
        <Link
          to="/nasil-calisir"
          className={`no-underline font-medium transition-colors duration-300 hover:text-white ${isActive('/nasil-calisir') || isActive('/teknoloji') ? 'text-white' : 'text-[#a1a1aa]'}`}
        >
          Nasıl çalışır?
        </Link>
        <Link
          to="/vizyon"
          className={`no-underline font-medium transition-colors duration-300 hover:text-white ${isActive('/vizyon') ? 'text-white' : 'text-[#a1a1aa]'}`}
        >
          İş Planı
        </Link>
        <Link
          to="/iletisim"
          className={`no-underline font-medium transition-colors duration-300 hover:text-white ${isActive('/iletisim') ? 'text-white' : 'text-[#a1a1aa]'}`}
        >
          İletişim
        </Link>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4">
        <a
          href="https://demo.nexivotr.com/"
          className="hidden lg:inline-block text-accent-green font-semibold whitespace-nowrap hover:text-white"
        >
          Demoyu dene
        </a>
        <Link
          to="/vizyon#yol-haritasi"
          className="hidden lg:inline-block bg-accent-green/10 text-accent-green border border-accent-green px-5 py-2 rounded-lg font-semibold hover:bg-accent-green hover:text-black transition-colors whitespace-nowrap"
        >
          Yol Haritası
        </Link>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menüyü aç veya kapat"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="absolute top-full left-0 w-full bg-bg-dark/95 backdrop-blur-xl border-b border-border-subtle z-50 lg:hidden flex flex-col p-6 gap-6 shadow-2xl">
          <Link to="/nasil-calisir" onClick={closeMenu} className={`text-lg font-medium transition-colors ${isActive('/nasil-calisir') || isActive('/teknoloji') ? 'text-white' : 'text-[#a1a1aa] hover:text-white'}`}>Nasıl çalışır?</Link>
          <Link to="/vizyon" onClick={closeMenu} className={`text-lg font-medium transition-colors ${isActive('/vizyon') ? 'text-white' : 'text-[#a1a1aa] hover:text-white'}`}>İş Planı</Link>
          <Link to="/iletisim" onClick={closeMenu} className={`text-lg font-medium transition-colors ${isActive('/iletisim') ? 'text-white' : 'text-[#a1a1aa] hover:text-white'}`}>İletişim</Link>
          <a href="https://demo.nexivotr.com/" onClick={closeMenu} className="text-lg font-semibold text-accent-green hover:text-white">Demoyu dene</a>
          <Link
            to="/vizyon#yol-haritasi"
            onClick={closeMenu}
            className="bg-accent-green/10 text-accent-green border border-accent-green px-5 py-3 rounded-lg font-semibold text-center animate-pulse-border hover:bg-accent-green hover:text-black transition-all duration-300 mt-2"
          >
            Yol Haritası
          </Link>
        </div>
      )}
    </nav>
  );
}
