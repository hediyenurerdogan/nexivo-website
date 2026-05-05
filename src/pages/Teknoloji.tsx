import { ChevronDown, Cpu, Fingerprint, ShieldCheck } from 'lucide-react';

const technicalQuestions = [
  {
    question: '5 farklı katman 0.76 mm standart kart inceliğine nasıl sığacak?',
    answer:
      'Geleneksel sert devre kartları yerine giyilebilir teknolojilerde de tercih edilen "Esnek Baskılı Devre Kartları (Flexible PCB)" kullanıyoruz. Mikroçiplerde ise endüstri standardı ultra-ince paketlemeler (ultra-thin SoC) tercih edilerek boyut ve esneklik optimizasyonu sağlanmaktadır.',
  },
  {
    question: 'Çip krizi ve tedarik zinciri sorunlarından nasıl etkileniyorsunuz?',
    answer:
      'Tasarımımızda baştan sona özel üretim bir çip (ASIC) yerine, pazarda tedariği nispeten daha stabil olan ARM Cortex tabanlı standart işlemciler kullanılmıştır. İlk TRL aşamalarımızda üretim hacmimiz düşük olacağı için majör bir darboğaz öngörmüyoruz.',
  },
  {
    question: 'Biyometrik verilerin gizliliği ve KVKK/GDPR uyumluluğu nasıl sağlanıyor?',
    answer:
      'NEXIVO "Sıfır Güven" (Zero-Trust) mimarisiyle çalışır. Damar haritanız banka sunucularına veya buluta asla gönderilmez. Veri eşleştirme işlemi tamamen cihaz üzerinde (Edge AI) gerçekleşir ve dışarıya sadece "Doğrulandı" veya "Reddedildi" sinyali iletilir.',
  },
  {
    question: 'Kartın üretim maliyetleri bankalar için dezavantaj yaratmayacak mı?',
    answer:
      'Yüksek teknoloji barındırdığı için üretim maliyeti standart kartlardan yüksektir. Bu nedenle pazara giriş (Go-To-Market) stratejimiz standart perakende bankacılık değil; yüksek güvenlik gerektiren Private Banking (Özel Bankacılık) müşterileri, VIP portföyler ve kurumsal erişim altyapılarıdır.',
  },
];

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

        <section className="mt-20">
          <div className="max-w-3xl mb-8">
            <p className="text-accent-green font-bold tracking-[2px] text-sm mb-3">TEKNİK SORULAR</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Yatırımcıların Merak Ettikleri</h2>
            <p className="text-[#a1a1aa] text-lg leading-relaxed">
              Kart mimarisi, tedarik, veri gizliliği ve pazara giriş stratejisiyle ilgili temel cevaplar.
            </p>
          </div>

          <div className="divide-y divide-border-subtle border border-border-subtle rounded-2xl bg-card-dark/70 overflow-hidden">
            {technicalQuestions.map((item) => (
              <details key={item.question} className="faq-item group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 md:px-7 md:py-6 text-left text-white font-semibold hover:bg-white/[0.03] transition-colors">
                  <span>{item.question}</span>
                  <ChevronDown className="shrink-0 text-accent-green transition-transform duration-300 group-open:rotate-180" size={22} />
                </summary>
                <div className="px-5 pb-6 md:px-7 text-[#a1a1aa] leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
