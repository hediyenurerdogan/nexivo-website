import { Building2, Handshake, LineChart, Network, PackageCheck, Users } from 'lucide-react';

const businessPlanSections = [
  {
    title: 'Problem',
    text: 'Şifre, PIN, yüz ve ses doğrulaması giderek daha kolay taklit ediliyor. Kurumlar, biyometrik veriyi dışarı çıkarmadan çalışan daha güçlü doğrulama katmanlarına ihtiyaç duyuyor.',
  },
  {
    title: 'Çözüm',
    text: 'NEXIVO, NIR tabanlı damar görüntüleme, güvenli şablon üretimi, cihaz üstü eşleştirme ve liveness kontrolünü bir doğrulama altyapısında birleştirir.',
  },
  {
    title: 'İlk MVP',
    text: 'İlk çıktı satış ürünü değil; damar görüntüsü alma, aynı kişiyi tekrar tanıma, farklı kişileri ayırma, liveness riski ve KVKK uyumlu mimariyi belgeleyen teknik prototiptir.',
  },
  {
    title: 'İlk Pazar',
    text: 'Ar-Ge merkezleri, veri merkezleri, savunma sanayi tedarikçileri, laboratuvarlar, private banking ve güvenlik entegratörleri hedeflenir.',
  },
];

const modelCanvas = [
  {
    title: 'Key Partnerships',
    items: [
      'TEKMER, ARDVENTURE ve Ankara kuluçka ağları',
      'BİGG uygulayıcı kuruluşları ve mentörler',
      'Üniversite laboratuvarları ve akademik danışmanlar',
      'Elektronik/prototipleme atölyeleri',
      'Güvenlik entegratörleri',
      'Pilot kurumlar: Ar-Ge, veri merkezi, private banking',
      'KVKK ve siber güvenlik danışmanları',
    ],
  },
  {
    title: 'Key Activities',
    items: [
      'NIR damar görüntüleme Ar-Ge’si',
      'Eşleştirme algoritması ve liveness/PAD',
      'Güvenli şablon ve cihaz üstü mimari',
      'Prototip üretimi ve test raporları',
      'Pilot kurum görüşmeleri',
      'BİGG/hibe/kuluçka başvuruları',
    ],
  },
  {
    title: 'Value Propositions',
    items: [
      'Damar biyometrisiyle zor taklit edilebilir doğrulama',
      'Biyometrik veriyi dışarı çıkarmayan cihaz üstü yaklaşım',
      'Şifre, yüz, ses ve parmak izi risklerine güçlü alternatif',
      'KVKK uyumlu veri minimizasyonu tasarımı',
      'Kurumsal erişim ve özel müşteri doğrulamasına modüler entegrasyon',
      'Ödeme, dijital kimlik ve kurumsal güvenlik sistemlerine lisanslanabilir çekirdek teknoloji',
    ],
  },
  {
    title: 'Customer Relationships',
    items: [
      'Pilot proje bazlı yakın çalışma',
      'Kuruma özel güvenlik senaryosu tasarımı',
      'Teknik entegrasyon ve saha desteği',
      'Gizlilik, uyum ve tehdit modeli danışmanlığı',
      'Uzun vadeli bakım ve güncelleme ilişkisi',
    ],
  },
  {
    title: 'Customer Segments',
    items: [
      'Yüksek güvenlik ihtiyacı olan kurumlar',
      'Ar-Ge merkezleri ve teknopark şirketleri',
      'Savunma sanayi tedarikçileri',
      'Veri merkezleri ve kritik altyapı işletmeleri',
      'Laboratuvarlar, hastane/ilaç Ar-Ge alanları',
      'Private banking ve özel müşteri doğrulama ekipleri',
      'Fintech/dijital kimlik şirketleri',
      'Güvenlik entegratörleri',
    ],
  },
  {
    title: 'Key Resources',
    items: [
      'NIR sensör, LED ve optik prototip',
      'Damar görüntüleme veri seti',
      'Biyometri/görüntü işleme know-how',
      'Teknik mentor veya fractional CTO',
      'Güvenli şablon mimarisi',
      'NEXIVO markası ve pitch materyalleri',
      'Kuluçka/ofis ve akademik destek',
    ],
  },
  {
    title: 'Channels',
    items: [
      'TEKMER/kuluçka demo günleri',
      'BİGG ve teknopark ağları',
      'LinkedIn ve kurucu ağı',
      'Güvenlik entegratörleri',
      'Banka/fintech iş birlikleri',
      'Pilot sunumları ve teknik raporlar',
    ],
  },
  {
    title: 'Cost Structure',
    items: [
      'NIR kamera, 850/940 nm LED, optik parça, PCB',
      'Görüntü işleme, gömülü sistem ve güvenlik danışmanlığı',
      'Test, kalibrasyon, veri toplama ve liveness denemeleri',
      'KVKK/hukuk, marka/patent ve belgelendirme hazırlığı',
      'Kuluçka dışı ofis, demo ve pilot entegrasyon giderleri',
    ],
  },
  {
    title: 'Revenue Streams',
    items: [
      'Pilot proje ücreti',
      'Cihaz + yazılım lisansı',
      'API/SDK aboneliği',
      'Entegrasyon ve kurulum hizmeti',
      'Bakım, güncelleme ve destek paketi',
      'Güvenlik entegratörlerine teknoloji lisansı',
      'Ödeme, dijital kimlik ve kurumsal güvenlik ortaklıklarından lisans geliri',
    ],
  },
];

const successCriteria = [
  'Çalışan NIR damar görüntüleme prototipi',
  'Küçük veri setinde aynı kişi/farklı kişi ayrımını gösteren teknik rapor',
  'En az bir teknik mentor veya akademik danışman desteği',
  'En az bir kuluçka/TEKMER ön kabulü veya düzenli mentorluk ilişkisi',
  'En az bir kurumsal pilot görüşmesi veya niyet beyanı',
  'BİGG başvurusu için net problem, çözüm, MVP, ekip ve pazar planı',
];

export default function Vizyon() {
  return (
    <div className="min-h-screen pt-[120px] pb-20 px-6 md:px-[5vw] bg-bg-dark">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl">
          <p className="text-accent-green font-bold tracking-[2px] text-sm mb-3">İŞ PLANI</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Damar biyometrisi doğrulama altyapısı</h1>
          <p className="text-xl leading-relaxed mb-10 text-[#d4d4d8]">
            NEXIVO, yüksek güvenlikli kurumlar için cihaz üstü, gizlilik odaklı kimlik doğrulama altyapısı geliştirmeyi ve bunu teknik MVP ile kanıtlamayı hedefler.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-5 mb-16">
          {businessPlanSections.map((section) => (
            <div key={section.title} className="bg-card-dark border border-border-subtle rounded-xl p-6">
              <h2 className="text-white text-xl font-bold mb-3">{section.title}</h2>
              <p className="text-[#a1a1aa] leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>

        <section className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start mb-20">
          <div className="bg-card-dark border border-border-subtle rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-5">
              <PackageCheck className="text-accent-green" size={28} />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Ürünleşme yaklaşımı</h2>
            </div>
            <p className="text-[#a1a1aa] text-lg leading-relaxed mb-6">
              NEXIVO’nun ilk işi satış ürünü çıkarmak değil; teknik kanıt üretmektir. NIR damar görüntüleme, eşleştirme, liveness ve güvenli şablon mimarisi kanıtlandıktan sonra modüler ürünleşme başlar.
            </p>
            <div className="space-y-3">
              {['Teknik kanıt', 'Doğrulama motoru', 'Liveness ve güvenlik katmanı', 'Güvenli mimari', 'Kurumsal pilot', 'Modüler ürün', 'Stratejik ortaklıklar'].map((item, index) => (
                <div key={item} className="flex items-center gap-3 text-white">
                  <span className="w-7 h-7 rounded-full bg-accent-green/10 text-accent-green flex items-center justify-center text-sm font-bold">{index + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-card-dark border border-border-subtle rounded-xl p-6">
              <Building2 className="text-accent-purple mb-4" size={28} />
              <h3 className="text-xl text-white font-bold mb-3">Hedef pazar</h3>
              <p className="text-[#a1a1aa] leading-relaxed">Ar-Ge merkezleri, teknoparklar, veri merkezleri, laboratuvarlar, savunma sanayi tedarikçileri, private banking ve güvenlik entegratörleri.</p>
            </div>
            <div className="bg-card-dark border border-border-subtle rounded-xl p-6">
              <Users className="text-accent-green mb-4" size={28} />
              <h3 className="text-xl text-white font-bold mb-3">Ekip ihtiyacı</h3>
              <p className="text-[#a1a1aa] leading-relaxed">Kurucu liderlik, teknik mentor/fractional CTO, görüntü işleme uzmanı, gömülü sistem uzmanı, KVKK/güvenlik danışmanı ve akademik danışman.</p>
            </div>
            <div className="bg-card-dark border border-border-subtle rounded-xl p-6">
              <Handshake className="text-accent-green mb-4" size={28} />
              <h3 className="text-xl text-white font-bold mb-3">Destek stratejisi</h3>
              <p className="text-[#a1a1aa] leading-relaxed">TEKMER/kuluçka desteği, BİGG uygulayıcı kuruluşları, akademik laboratuvar bağlantıları ve pilot kurum görüşmeleri önceliklidir.</p>
            </div>
            <div className="bg-card-dark border border-border-subtle rounded-xl p-6">
              <LineChart className="text-accent-purple mb-4" size={28} />
              <h3 className="text-xl text-white font-bold mb-3">Gelir modeli</h3>
              <p className="text-[#a1a1aa] leading-relaxed">Pilot proje ücreti, cihaz + yazılım lisansı, API/SDK aboneliği, entegrasyon, bakım/destek ve uzun vadede teknoloji lisanslama.</p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="max-w-3xl mb-8">
            <p className="text-accent-green font-bold tracking-[2px] text-sm mb-3">BUSINESS MODEL CANVAS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">NEXIVO iş modeli</h2>
            <p className="text-[#a1a1aa] text-lg leading-relaxed">
              Aşağıdaki bloklar, NEXIVO’nun hazırlanan Business Model Canvas dosyasındaki içerikle birebir eşleşir.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {modelCanvas.map((block) => (
              <div key={block.title} className="bg-card-dark border border-border-subtle rounded-xl p-6">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3 className="text-xl text-white font-bold">{block.title}</h3>
                  <Network className="text-accent-green shrink-0" size={22} />
                </div>
                <ul className="space-y-2 text-[#a1a1aa] leading-relaxed">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-accent-green mt-[2px]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card-dark border border-border-subtle rounded-2xl p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Başarı kriterleri</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {successCriteria.map((item) => (
              <div key={item} className="flex items-start gap-3 text-[#d4d4d8]">
                <span className="text-accent-green font-bold">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
