import { ChevronDown, Cpu, Fingerprint, FlaskConical, LockKeyhole, Radar, ShieldCheck } from 'lucide-react';

const technicalQuestions = [
  {
    question: 'NEXIVO ilk aşamada ne geliştiriyor?',
    answer:
      'NEXIVO ilk aşamada ödeme kartı üretmez. İlk hedef, NIR tabanlı damar görüntüleme, şablon çıkarma, eşleştirme ve liveness kontrolünü çalışan bir teknik MVP ile doğrulamaktır. Kart vizyonu uzun vadede korunur; ancak çekirdek teknoloji önce kurumsal erişim ve yüksek güvenlikli kimlik doğrulama senaryolarında test edilir.',
  },
  {
    question: 'Damar biyometrisi teknik olarak nasıl okunur?',
    answer:
      'Yakın kızılötesi ışık, parmak veya avuç içindeki damar dokusunun görünür hale gelmesini sağlar. Hemoglobin ışığı farklı emdiği için damar deseni görüntü işleme adımlarıyla ayrıştırılır. NEXIVO bu görüntüden ham görsel yerine matematiksel bir doğrulama şablonu üretmeyi hedefler.',
  },
  {
    question: 'Biyometrik veri nasıl korunur?',
    answer:
      'Mimari, ham biyometrik görüntünün saklanmaması ve eşleştirmenin mümkün olduğunca cihaz üzerinde yapılması prensibine dayanır. Dış sistemlere biyometrik veri değil, yalnızca doğrulama sonucu veya kriptografik onay sinyali gönderilir. Bu yaklaşım KVKK, veri minimizasyonu ve kurumsal güvenlik ihtiyaçlarıyla uyumludur.',
  },
  {
    question: 'Neden önce kart değil doğrulama altyapısı?',
    answer:
      'Ödeme kartı form faktörü; optik donanım, enerji, sertifikasyon, bankacılık entegrasyonu ve üretim maliyeti açısından en zor başlangıç noktasıdır. NEXIVO önce damar biyometrisi doğrulama çekirdeğini kanıtlar; ardından bu çekirdeği erişim kontrolü, private banking, dijital kimlik ve uzun vadede kart uygulamalarına taşır.',
  },
  {
    question: 'Liveness / sahtecilik tespiti ürünün neresinde?',
    answer:
      'Liveness, ilk MVP’den itibaren teknik risk alanı olarak ele alınır. Amaç yalnızca damar deseni görmek değil; basılı görsel, ekran, yapay parmak veya statik sahte örneklere karşı dayanıklılığı ölçmektir. Bu nedenle presentation attack detection testleri doğrulama motorunun parçasıdır.',
  },
  {
    question: 'İlk pilot nerede yapılmalı?',
    answer:
      'İlk pilot için banka ödeme altyapısı yerine daha hızlı karar alınabilecek kurumsal erişim senaryoları önerilir: Ar-Ge laboratuvarı, veri merkezi, teknopark prototip odası, savunma sanayi tedarikçisi veya private banking şube içi doğrulama alanı.',
  },
  {
    question: 'BİGG ve kuluçka desteği neden önemli?',
    answer:
      'NEXIVO donanım, görüntü işleme, güvenlik, KVKK ve kurumsal entegrasyonu aynı anda gerektiren bir deep-tech girişimidir. TEKMER/kuluçka desteği; teknik mentor, ofis, laboratuvar bağlantısı, pilot kurum erişimi ve TÜBİTAK 1812/BİGG hazırlığı için kritik kaldıraç sağlar.',
  },
];

const roadmap = [
  ['Teknik Kanıt', 'NIR damar görüntüleme ve temel eşleştirme kontrollü ortamda doğrulanır.'],
  ['Doğrulama Motoru', 'Kayıt, şablon çıkarma, eşleştirme ve hata metrikleri geliştirilir.'],
  ['Liveness Katmanı', 'Sahtecilik ve presentation attack risklerine karşı ilk testler yapılır.'],
  ['Güvenli Mimari', 'Biyometrik veri dışarı çıkmadan doğrulama sonucu üreten yapı tasarlanır.'],
  ['Kurumsal Pilot', 'Erişim kontrolü veya özel müşteri doğrulama senaryosu seçilir.'],
  ['Kart Vizyonu', 'Teknoloji olgunlaştıktan sonra güvenli kart ve ödeme ortaklıkları değerlendirilir.'],
];

const useCases = [
  'Ar-Ge merkezleri ve teknoparklar',
  'Savunma sanayi tedarikçileri',
  'Veri merkezleri ve kritik altyapı',
  'Laboratuvarlar ve ilaç Ar-Ge alanları',
  'Private banking müşteri doğrulaması',
  'Fintech ve dijital kimlik şirketleri',
  'Güvenlik entegratörleri',
];

export default function Teknoloji() {
  return (
    <div className="min-h-screen pt-[120px] pb-20 px-6 md:px-[5vw] bg-bg-dark">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl">
          <p className="text-accent-green font-bold tracking-[2px] text-sm mb-3">TEKNOLOJİ STRATEJİSİ</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Damar biyometrisi doğrulama altyapısı</h1>
          <p className="text-xl text-[#a1a1aa] mb-12 max-w-3xl leading-relaxed">
            NEXIVO, kart üretimiyle başlamaz. İlk hedef; NIR tabanlı damar görüntüleme, cihaz üstü doğrulama, güvenli şablon mimarisi ve liveness katmanını teknik MVP ile kanıtlamaktır.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card-dark p-8 rounded-2xl border border-border-subtle hover:border-accent-green transition-colors duration-300">
            <div className="w-14 h-14 bg-accent-green/10 rounded-xl flex items-center justify-center mb-6">
              <Fingerprint className="text-accent-green" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Damar Biyometrisi</h3>
            <p className="text-[#a1a1aa] leading-relaxed">
              Parmak izi veya yüz gibi yüzeyden kopyalanabilen işaretler yerine deri altındaki damar desenleri analiz edilir. Amaç, kopyalanması daha zor bir biyometrik sinyali doğrulama altyapısına dönüştürmektir.
            </p>
          </div>

          <div className="bg-card-dark p-8 rounded-2xl border border-border-subtle hover:border-accent-purple transition-colors duration-300">
            <div className="w-14 h-14 bg-accent-purple/10 rounded-xl flex items-center justify-center mb-6">
              <Cpu className="text-accent-purple" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Cihaz Üstü Doğrulama</h3>
            <p className="text-[#a1a1aa] leading-relaxed">
              Eşleştirme mümkün olduğunca cihaz üzerinde yapılır. Böylece gizlilik, gecikme, KVKK uyumu ve kurumsal entegrasyon gereksinimleri ürün tasarımına en baştan dahil edilir.
            </p>
          </div>

          <div className="bg-card-dark p-8 rounded-2xl border border-border-subtle hover:border-accent-green transition-colors duration-300">
            <div className="w-14 h-14 bg-accent-green/10 rounded-xl flex items-center justify-center mb-6">
              <FlaskConical className="text-accent-green" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Doğrulanabilir MVP</h3>
            <p className="text-[#a1a1aa] leading-relaxed">
              İlk çıktı satış ürünü değil; damar görüntüsü, tekrar tanıma, farklı kişi ayrımı, liveness ve güvenli şablon yaklaşımını belgeleyen gösterilebilir bir prototiptir.
            </p>
          </div>
        </div>

        <section className="mt-20">
          <div className="max-w-3xl mb-8">
            <p className="text-accent-green font-bold tracking-[2px] text-sm mb-3">ÜRÜNLEŞME ROTASI</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Kart vizyonu korunur, başlangıç altyapıdan yapılır</h2>
            <p className="text-[#a1a1aa] text-lg leading-relaxed">
              NEXIVO’nun iş planındaki aşamalar, teknik riski azaltıp pilotlanabilir bir ürüne doğru ilerler.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {roadmap.map(([title, description], index) => (
              <div key={title} className="bg-card-dark/80 border border-border-subtle rounded-xl p-6">
                <div className="text-accent-green font-bold text-sm mb-3">Aşama {index + 1}</div>
                <h3 className="text-white text-xl font-bold mb-3">{title}</h3>
                <p className="text-[#a1a1aa] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid lg:grid-cols-[1fr_1.25fr] gap-8 items-start">
          <div>
            <p className="text-accent-green font-bold tracking-[2px] text-sm mb-3">İLK KULLANIM ALANLARI</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Öncelik ödeme kartı değil, yüksek güvenlikli kurumlar</h2>
            <p className="text-[#a1a1aa] text-lg leading-relaxed">
              İlk hedef kitle; hızlı pilot yapılabilecek, güvenlik ihtiyacı net olan ve cihaz üstü biyometrik doğrulamadan somut fayda görebilecek kurumlardır.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-card-dark border border-border-subtle rounded-xl p-4">
                <Radar className="text-accent-purple shrink-0" size={20} />
                <span className="text-white font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="max-w-3xl mb-8">
            <p className="text-accent-green font-bold tracking-[2px] text-sm mb-3">TEKNİK SORULAR</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">MVP, gizlilik ve pilot odağı</h2>
            <p className="text-[#a1a1aa] text-lg leading-relaxed">
              Bu bölüm NEXIVO’nun iş planındaki problem, çözüm, teknik MVP ve pazara giriş yaklaşımıyla birebir uyumludur.
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

        <section className="mt-20 bg-card-dark border border-border-subtle rounded-2xl p-8 md:p-10">
          <div className="flex items-start gap-4">
            <div className="bg-accent-green/10 p-3 rounded-xl">
              <LockKeyhole className="text-accent-green" size={26} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Güvenlik dili</h2>
              <p className="text-[#a1a1aa] text-lg leading-relaxed">
                NEXIVO, “imkansız” gibi mutlak iddialar yerine daha savunulabilir bir güvenlik dili kullanır: damar biyometrisi, yüzey biyometrilerine göre daha zor taklit edilebilir; veri minimizasyonu ve cihaz üstü eşleştirme ile gizlilik riski azaltılır; liveness testleriyle sahtecilik dayanıklılığı ölçülür.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
