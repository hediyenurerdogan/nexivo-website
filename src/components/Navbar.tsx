import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMobileMenuOpen(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full top-0 z-[100] flex justify-between items-center px-6 md:px-[5vw] py-3 md:py-4 border-b border-border-subtle bg-bg-dark/80 backdrop-blur-md box-border transition-all duration-300">
      <div className="flex-1 flex justify-start">
        <Link to="/" onClick={closeMenu} className="navbar-logo-link" aria-label="NEXIVO ana sayfa">
          <img className="navbar-logo-image" src="/nexivo-logo-hero.png" alt="NEXIVO" />
        </Link>
      </div>

      <div className="hidden md:flex justify-center gap-8 items-center flex-1">
        <Link
          to="/teknoloji"
          className={`no-underline font-medium transition-colors duration-300 hover:text-white ${isActive('/teknoloji') ? 'text-white' : 'text-[#a1a1aa]'}`}
        >
          Teknoloji
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
        <Link
          to="/vizyon"
          className="hidden md:inline-block bg-accent-green/10 text-accent-green border border-accent-green px-5 py-2 rounded-lg font-semibold animate-pulse-border hover:bg-accent-green hover:text-black transition-all duration-300 whitespace-nowrap"
        >
          Yol Haritası
        </Link>

        <button
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menüyü aç veya kapat"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-bg-dark/95 backdrop-blur-xl border-b border-border-subtle z-50 md:hidden flex flex-col p-6 gap-6 shadow-2xl">
          <Link to="/teknoloji" onClick={closeMenu} className={`text-lg font-medium transition-colors ${isActive('/teknoloji') ? 'text-white' : 'text-[#a1a1aa] hover:text-white'}`}>Teknoloji</Link>
          <Link to="/vizyon" onClick={closeMenu} className={`text-lg font-medium transition-colors ${isActive('/vizyon') ? 'text-white' : 'text-[#a1a1aa] hover:text-white'}`}>İş Planı</Link>
          <Link to="/iletisim" onClick={closeMenu} className={`text-lg font-medium transition-colors ${isActive('/iletisim') ? 'text-white' : 'text-[#a1a1aa] hover:text-white'}`}>İletişim</Link>
          <Link
            to="/vizyon"
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
