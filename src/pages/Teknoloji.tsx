import React from 'react';
import { ShieldCheck, Fingerprint, Cpu } from 'lucide-react';

export default function Teknoloji() {
  return (
    <div className="min-h-screen pt-[120px] pb-20 px-6 md:px-[5vw] bg-bg-dark">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Teknoloji</h1>
        <p className="text-xl text-[#a1a1aa] mb-16 max-w-3xl leading-relaxed">
          NEXIVO, geleneksel yüzey biyometrisinin ötesine geçerek deri altı damar haritalama teknolojisi ile kopyalanamaz bir güvenlik katmanı sunar.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card-dark p-8 rounded-2xl border border-border-subtle hover:border-accent-green transition-colors duration-300">
            <div className="w-14 h-14 bg-accent-green/10 rounded-xl flex items-center justify-center mb-6">
              <Fingerprint className="text-accent-green" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Deri Altı Haritalama</h3>
            <p className="text-[#a1a1aa] leading-relaxed">
              Yüzeydeki parmak izi yerine, deri altındaki benzersiz damar yapısını kızılötesi ışınlarla analiz eder. Yapay dokularla taklit edilmesi fiziksel olarak imkansızdır.
            </p>
          </div>

          <div className="bg-card-dark p-8 rounded-2xl border border-border-subtle hover:border-accent-purple transition-colors duration-300">
            <div className="w-14 h-14 bg-accent-purple/10 rounded-xl flex items-center justify-center mb-6">
              <Cpu className="text-accent-purple" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Edge AI İşlemci</h3>
            <p className="text-[#a1a1aa] leading-relaxed">
              Biyometrik verileriniz hiçbir zaman dış bir sunucuya aktarılmaz. Tüm eşleştirme işlemleri kartın veya cihazın içindeki güvenli yongada (On-Device) gerçekleşir.
            </p>
          </div>

          <div className="bg-card-dark p-8 rounded-2xl border border-border-subtle hover:border-accent-green transition-colors duration-300">
            <div className="w-14 h-14 bg-accent-green/10 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-accent-green" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Zero-Trust Mimarisi</h3>
            <p className="text-[#a1a1aa] leading-relaxed">
              Sıfır Güven prensibiyle tasarlanan sistem, her işlemde kimliği yeniden doğrular. Şifrelerin veya PIN kodlarının çalınma riskini tamamen ortadan kaldırır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
