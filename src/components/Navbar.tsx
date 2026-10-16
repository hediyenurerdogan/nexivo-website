import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
export default function Navbar() {
  const [open,setOpen]=useState(false);
  const location=useLocation();
  const links=[['/nasil-calisir','Nasıl çalışır?'],['/vizyon','İş planı'],['/iletisim','İletişim']];
  return <header className="site-header"><nav className="shell navigation" aria-label="Ana menü">
    <Link to="/" onClick={()=>setOpen(false)} aria-label="NEXIVO ana sayfa" className="brand"><img src="/nexivo-logo.png" alt="nexivo" /></Link>
    <div className="desktop-links">{links.map(([path,label])=><Link key={path} to={path} aria-current={location.pathname===path?'page':undefined}>{label}</Link>)}</div>
    <a href="https://demo.nexivotr.com/" className="button nav-demo">Demoyu dene <ArrowUpRight size={18} /></a>
    <button className="menu-toggle" aria-label="Menüyü aç veya kapat" aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}>{open?<X />:<Menu />}</button>
    {open&&<div id="mobile-menu">{links.map(([path,label])=><Link key={path} to={path} onClick={()=>setOpen(false)}>{label}</Link>)}<Link to="/vizyon#yol-haritasi" onClick={()=>setOpen(false)}>Yol haritası</Link><a href="https://demo.nexivotr.com/" className="button primary">Demoyu dene <ArrowUpRight size={18}/></a></div>}
  </nav></header>;
}
