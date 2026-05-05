import { ChevronDown, Cpu, Fingerprint, ShieldCheck } from 'lucide-react';

const technicalQuestions = [
  {
    question: 'Deri altı damar haritası teknik olarak tam olarak nasıl okunuyor?',
    answer:
      'Kartımızın içinde yer alan ve 850-940 nm dalga boyunda çalışan yakın kızılötesi (NIR) LED dizisi, parmağınız karta temas ettiğinde deri altına nüfuz eden güvenli bir ışık gönderir. Kandaki hemoglobinin bu ışığı emme oranı sayesinde deri altındaki eşsiz damar ağınızın net bir haritası çıkarılır. Bu harita, kartın üzerindeki Edge AI (ARM Cortex-M4F) işlemcimiz tarafından saniyeler içinde anlık olarak analiz edilerek eşleştirme işlemi doğrudan cihaz üzerinde gerçekleştirilir.',
  },
  {
    question: 'Biyometrik verim kartın içinde nasıl depolanıyor ve çalınmaya karşı nasıl korunuyor?',
    answer:
      'NEXIVO, "Sıfır Güven" (Zero-Trust) mimarisi üzerine inşa edilmiştir. Biyometrik veriniz ham bir görsel olarak değil, matematiksel ve geri döndürülemez şifreli bir şablon olarak karttaki ISO/IEC 7816 standartlarına sahip "Güvenli Eleman" (Secure Element) katmanında saklanır. Doğrulama işlemi tamamen cihaz üstünde yapıldığı için biyometrik veriniz hiçbir zaman kartın dışına çıkmaz, bir okuyucu cihaza, banka sunucusuna veya buluta aktarılmaz. Bu "cihaz üstü" (on-device) gizlilik yaklaşımı sayesinde verinizin uzaktan veya fiziksel olarak kopyalanması imkansız hale getirilir.',
  },
  {
    question: 'NEXIVO\'da "Sıfır Güven" (Zero-Trust) mimarisi tam olarak nasıl işliyor?',
    answer:
      '"Sıfır Güven" prensibimiz gereği, kartımız iletişim kurduğu hiçbir dış cihaza, ağa veya POS terminaline peşinen güvenmez. Geleneksel sistemlerde parmak izi veya şifre verisi doğrulama için karşı sisteme iletilirken; NEXIVO\'da biyometrik okuma ve eşleştirme tamamen kartın içindeki yalıtılmış donanımda (Edge AI ve Güvenli Eleman) gerçekleşir. Dış dünyaya, yani ödeme terminaline veya erişim noktasına, sadece kriptografik olarak şifrelenmiş, tek kullanımlık bir "onay" sinyali gönderilir. Bu sayede işlem yapılan terminal hacklense bile, sistemde çalınabilecek veya kopyalanabilecek hiçbir kişisel veri bulunmaz.',
  },
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
  {
    question: 'Bu projenin ortalama maliyeti neye göre belirlenir?',
    answer:
      'NEXIVO’da maliyet yalnızca tek bir kartın üretim bedeliyle değil; esnek PCB tasarımı, NIR LED dizisi, güvenli eleman, ARM tabanlı işlemci, Edge AI yazılımı, prototip iterasyonları, laboratuvar testleri ve pilot entegrasyon süreçleriyle birlikte değerlendirilir. İlk Ar-Ge ve düşük adetli prototip aşamalarında birim maliyet doğal olarak yüksektir. Hedefimiz, teknik doğrulama ve pilotlardan sonra üretim tasarımını sadeleştirerek maliyeti seçili yüksek güvenlik segmentleri için sürdürülebilir seviyeye indirmektir.',
  },
  {
    question: 'Ar-Ge aşamasında neden yatırım desteğine ihtiyacımız var?',
    answer:
      'NEXIVO yalnızca bir yazılım fikri değil; donanım, biyometrik okuma, güvenli veri saklama, cihaz üstü yapay zeka ve kurumsal entegrasyonu aynı üründe birleştiren derin teknoloji girişimidir. Yatırım desteği; prototip üretimi, elektronik tasarım iterasyonları, güvenlik testleri, yazılım geliştirme, fikri mülkiyet hazırlığı ve pilot kurumlarla doğrulama süreçlerini hızlandırır. Bu destek sayesinde ürün riski azalır, TRL seviyesi yükselir ve yatırımcılar ile stratejik ortaklara gösterilebilir somut bir demo/pilot çıktısı oluşur.',
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
