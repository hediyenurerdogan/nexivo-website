import React from 'react';

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-5 pt-[80px] bg-[radial-gradient(circle_at_center,#18181b_0%,#09090b_100%)]">
      <h1 className="text-5xl md:text-[4.5rem] mb-4 bg-gradient-to-br from-white to-[#a1a1aa] bg-clip-text text-transparent font-bold leading-tight animate-fade-in-up">
        Impossible to Spoof.
      </h1>
      <p className="text-lg md:text-[1.3rem] text-[#a1a1aa] max-w-[600px] mb-12 leading-relaxed">
        Biyometrik güvenlikte yeni standart: "Sıfır Güven" mimarisiyle tasarlanmış, deri altı damar haritalama teknolojisi.
      </p>
      
      {/* TEKMER Call to Action Kutusu */}
      <div className="bg-card-dark border border-accent-purple p-8 md:p-12 rounded-2xl max-w-[700px] w-full shadow-[0_20px_40px_rgba(139,92,246,0.1)] relative overflow-hidden text-left group transition-transform duration-500 hover:-translate-y-2">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-purple to-accent-green"></div>
        
        <div className="text-accent-purple font-bold mb-4 tracking-[2px] text-sm md:text-base">ÖZEL SUNUM</div>
        <h2 className="mt-0 text-white text-2xl md:text-3xl font-bold mb-4">MEXT TWINnovation Challenge</h2>
        <p className="text-[#a1a1aa] text-base md:text-[1.1rem] mb-8 leading-relaxed">
          Ankara TEKMER Demo Day için hazırladığımız, NEXIVO'nun mimarisini ve Dinamik CVV teknolojisini detaylandıran interaktif sunumumuzu inceleyin.
        </p>
        
        <a 
          href="/tekmer.html" 
          className="inline-block bg-text-light text-bg-dark px-6 py-3 md:px-8 md:py-4 rounded-lg no-underline font-bold text-base md:text-[1.1rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
        >
          İnteraktif Sunumu Başlat
        </a>
      </div>
    </section>
  );
}
