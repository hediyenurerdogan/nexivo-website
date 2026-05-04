import { ShieldCheck, Fingerprint, Cpu } from 'lucide-react';

export default function Teknoloji() {
  return (
    <div className="min-h-screen pt-[120px] pb-20 px-6 md:px-[5vw] bg-bg-dark">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Teknoloji</h1>
        <p className="text-xl text-[#a1a1aa] mb-16 max-w-3xl leading-relaxed">
          NEXIVO, kopyalanabilir yüzey biyometrileri yerine damar yapısına dayanan, pilot uygulamalarla doğrulanabilir yeni nesil kimlik doğrulama altyapısı geliştirir.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card-dark p-8 rounded-2xl border border-border-subtle hover:border-accent-green transition-colors duration-300">
            <div className="w-14 h-14 bg-accent-green/10 rounded-xl flex items-center justify-center mb-6">
              <Fingerprint className="text-accent-green" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Damar Biyometrisi</h3>
            <p className="text-[#a1a1aa] leading-relaxed">
              Sistem, parmak izi veya yüz gibi yüzeyden kopyalanabilen işaretler yerine deri altındaki damar desenlerini analiz etmeyi hedefler. Bu yaklaşım finans, erişim kontrolü ve yüksek güvenlikli kimlik doğrulama senaryoları için tasarlanmıştır.
            </p>
          </div>

          <div className="bg-card-dark p-8 rounded-2xl border border-border-subtle hover:border-accent-purple transition-colors duration-300">
            <div className="w-14 h-14 bg-accent-purple/10 rounded-xl flex items-center justify-center mb-6">
              <Cpu className="text-accent-purple" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Cihaz Üstü İşleme</h3>
            <p className="text-[#a1a1aa] leading-relaxed">
              Mimari, biyometrik eşleştirmeyi mümkün olduğunca cihaz üzerinde tutacak şekilde kurgulanır. Bu sayede gizlilik, gecikme ve kurumsal entegrasyon gereksinimleri erken aşamadan itibaren ürün tasarımına dahil edilir.
            </p>
          </div>

          <div className="bg-card-dark p-8 rounded-2xl border border-border-subtle hover:border-accent-green transition-colors duration-300">
            <div className="w-14 h-14 bg-accent-green/10 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-accent-green" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Doğrulanabilir Yol Haritası</h3>
            <p className="text-[#a1a1aa] leading-relaxed">
              NEXIVO, teknolojisini yatırımcılar ve stratejik iş ortaklarıyla ölçülebilir pilotlar üzerinden büyütmeyi amaçlar: güvenlik doğrulaması, kullanıcı deneyimi ve entegrasyon kabiliyeti aynı anda test edilir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
