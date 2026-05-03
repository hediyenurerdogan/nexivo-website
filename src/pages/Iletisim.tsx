import React from 'react';
import { Mail, Globe, MapPin } from 'lucide-react';

export default function Iletisim() {
  return (
    <div className="min-h-screen pt-[120px] pb-20 px-6 md:px-[5vw] bg-bg-dark">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">İletişim</h1>
        <p className="text-xl text-[#a1a1aa] mb-16 max-w-2xl leading-relaxed">
          Potansiyel ortaklıklar, yatırım fırsatları ve teknik detaylar için bizimle iletişime geçebilirsiniz.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* İletişim Bilgileri */}
          <div className="space-y-8">
            <div className="bg-card-dark p-6 rounded-2xl border border-border-subtle flex items-start gap-4">
              <div className="bg-accent-green/10 p-3 rounded-lg">
                <Mail className="text-accent-green" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">E-posta</h3>
                <a href="mailto:destek@nexivotr.com" className="text-[#a1a1aa] hover:text-accent-green transition-colors">
                  destek@nexivotr.com
                </a>
              </div>
            </div>

            <div className="bg-card-dark p-6 rounded-2xl border border-border-subtle flex items-start gap-4">
              <div className="bg-accent-purple/10 p-3 rounded-lg">
                <Globe className="text-accent-purple" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Web Sitesi</h3>
                <a href="https://www.nexivotr.com" target="_blank" rel="noopener noreferrer" className="text-[#a1a1aa] hover:text-accent-purple transition-colors">
                  www.nexivotr.com
                </a>
              </div>
            </div>

            <div className="bg-card-dark p-6 rounded-2xl border border-border-subtle flex items-start gap-4">
              <div className="bg-white/5 p-3 rounded-lg">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Konum</h3>
                <p className="text-[#a1a1aa]">
                  Ankara TEKMER<br />
                  Türkiye
                </p>
              </div>
            </div>
          </div>

          {/* İletişim Formu (Görsel amaçlı) */}
          <div className="bg-card-dark p-8 rounded-2xl border border-border-subtle">
            <h3 className="text-2xl font-bold text-white mb-6">Bize Yazın</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-[#a1a1aa] mb-2">Adınız Soyadınız</label>
                <input 
                  type="text" 
                  className="w-full bg-bg-dark border border-border-subtle rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-green transition-colors"
                  placeholder="Adınız"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#a1a1aa] mb-2">E-posta Adresiniz</label>
                <input 
                  type="email" 
                  className="w-full bg-bg-dark border border-border-subtle rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-green transition-colors"
                  placeholder="ornek@sirket.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#a1a1aa] mb-2">Mesajınız</label>
                <textarea 
                  rows={4}
                  className="w-full bg-bg-dark border border-border-subtle rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-green transition-colors resize-none"
                  placeholder="Size nasıl yardımcı olabiliriz?"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors mt-2"
              >
                Mesaj Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
