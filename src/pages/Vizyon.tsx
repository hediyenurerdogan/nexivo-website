import { Store, Users, Handshake, LineChart } from 'lucide-react';

const foundations = [
  ['Sınadığımız ihtiyaç', 'Nakit ihtiyacı olan bir müşteri, yakındaki bir mağazanın talebini karşılayıp karşılayamayacağını yola çıkmadan öğrenmek ister mi? Mağaza, ayırabileceği tutarı süreli ve kontrollü biçimde yönetebilir mi?'],
  ['Çözüm yaklaşımı', 'Müşterinin talebini mağazaya iletmek, görevlinin onayıyla rezervasyon oluşturmak ve tek kullanımlık kodla denemeyi tamamlamak. Belirsizliği, açık durumlar ve sürelerle azaltmayı hedefliyoruz.'],
  ['Bugünkü ürün', 'Mobil tarayıcıdan çalışan müşteri, mağaza ve yönetim ekranları. Gerçek para işlemi olmadan talep, ret, iptal, süre aşımı, kapasite ve kod doğrulama akışları denenebiliyor.'],
  ['Sonraki doğrulama', 'Mağaza görüşmeleri ve kullanıcı denemeleriyle ihtiyacı ölçmek; uygun finansal ortakla modelin koşullarını değerlendirmek. Gerçek para içeren saha pilotu bu çalışmalardan sonraki ayrı bir aşamadır.'],
];
const canvas = [
  { title: 'Hedef kullanıcılar', items: ['Yakınındaki mağazadan nakit alma fikrini denemek isteyen müşteriler.', 'Taleplere ayırabileceği tutarı ve hizmet saatlerini yönetebilecek mağazalar.', 'Gelecekteki model için görüşülecek finansal kuruluşlar.'] },
  { title: 'Değer önerisi', items: ['Müşteriye yola çıkmadan mağaza yanıtını görme olanağı.', 'Mağazaya limit, kapasite ve süre kontrolü.', 'Her iki tarafa aynı talebin durumunu takip etme olanağı. Bunların faydası pilotla ölçülecek.'] },
  { title: 'Dağıtım ve ilişki', items: ['Mobil web demosu ve birebir kullanıcı denemeleri.', 'Mağaza işletmecileriyle görüşmeler ve görevli eğitimi.', 'Finansal ortak adaylarıyla demo sunumları ve süreç değerlendirmeleri.'] },
  { title: 'Gerekli ortaklıklar', items: ['Finansal modelin tasarımı için uygun finansal ortak.', 'Süreçleri birlikte sınamak için pilot mağaza adayları.', 'Güvenlik, operasyon ve hukuki değerlendirme desteği. Bunlar ihtiyaçtır; mevcut anlaşma beyanı değildir.'] },
  { title: 'Temel çalışmalar', items: ['Talep iletimi, rezervasyon ve kapasite yönetimi.', 'Yetkilendirme, tek kullanımlık kod ve olay kaydı.', 'Kullanıcı geri bildirimi, mağaza güvenilirliği ve operasyon ölçümü.'] },
  { title: 'Kaynaklar ve maliyetler', items: ['Web uygulaması, veritabanı ve teknik bakım.', 'Mağaza görüşmeleri, eğitim ve pilot desteği.', 'Güvenlik testleri ve finansal ortakla yapılacak değerlendirmeler. Henüz doğrulanmış maliyet veya kârlılık hesabı yoktur.'] },
];
const roadmap = [
  ['Bugün · Çalışan demo', 'Talebi mağazaya ulaştırma, süreli kabul, kod doğrulama ve tamamlama akışını gerçek para kullanmadan gösterebiliyoruz.'],
  ['Sıradaki adım · İhtiyaç doğrulaması', 'Müşteriler ve mağaza görevlileriyle denemeler yaparak kullanım kolaylığını, yanıt davranışını ve operasyon yükünü ölçmek.'],
  ['Planlanan · Finansal ortak değerlendirmesi', 'Gerçek para akışı, sorumluluklar, güvenlik ve gerekli koşulları uygun finansal ortakla birlikte netleştirmek. Mevcut bir banka entegrasyonu yoktur.'],
  ['Koşullara bağlı · Sınırlı saha pilotu', 'Ortaklık, operasyon ve gerekli değerlendirmeler tamamlanırsa sınırlı bir mağaza grubuyla pilot tasarlamak. Henüz başlatılmış bir gerçek para pilotu yoktur.'],
];
const metrics = [
  'Toplam talep, mağaza kabulü ve tamamlanan demo sayısı',
  'Mağaza reddi ve yanıtsız kalan talep sayısı',
  'Ortalama mağaza yanıt süresi',
  'Süresi dolan rezervasyon sayısı',
  'Mağazanın kabul ettikten sonra iptal ettiği talep sayısı',
  'Görüşmelerde müşterinin ve görevlinin yaşadığı zorluklar',
];

export default function Vizyon() {
  return <div className="content-page"><div className="max-w-6xl mx-auto">
    <p className="section-kicker">NEXIVO İŞ PLANI</p>
    <h1 className="page-title">Önce çalışan süreç.<br />Sonra doğrulanmış model.</h1>
    <p className="page-lead">Mağazadan nakit alma fikrini müşteri ve mağazanın birlikte kullanabildiği bir demoyla sınamaya başladık. Bugünkü hedefimiz talep, süreli kabul ve takip akışını doğrulamak.</p>
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-16">{foundations.map(([title, text]) => <article className="plan-card" key={title}><h2>{title}</h2><p>{text}</p></article>)}</div>
    <section className="mb-16">
      <h2 className="section-title">İki tarafın da kullanabildiği bir süreç</h2>
      <div className="grid md:grid-cols-2 gap-5">
        <article className="plan-card"><Users className="text-accent-green mb-4" size={28} /><h3>Müşteri açısından</h3><p>Mağazaları görmek, tutarı seçmek, mağazanın yanıtını beklemek ve rezervasyonu takip etmek. Mağaza onayı gelmeden tutarın hazır olduğu varsayılmaz.</p></article>
        <article className="plan-card"><Store className="text-accent-green mb-4" size={28} /><h3>Mağaza açısından</h3><p>Hizmeti açıp kapatmak, demo kapasitesi ve işlem limiti belirlemek, talepleri kabul veya gerekçeyle reddetmek. Mevcut rezervasyonlar yeni taleplerden ayrı takip edilir.</p></article>
      </div>
    </section>
    <section className="mb-16">
      <p className="section-kicker">İŞ MODELİ TASLAĞI</p>
      <h2 className="section-title">Pilotla sınanacak varsayımlar</h2>
      <p className="section-lead">Aşağıdaki başlıklar bir çalışma planıdır. Mevcut müşteri ağı, finansal anlaşma veya doğrulanmış ticari sonuç anlamına gelmez.</p>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">{canvas.map(({title, items}) => <article className="plan-card" key={title}><h3>{title}</h3><ul className="plan-list">{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div>
    </section>
    <section className="grid md:grid-cols-2 gap-5 mb-16">
      <article className="plan-card"><LineChart className="text-accent-purple mb-4" size={28} /><h2>Gelir modeli henüz doğrulanmadı</h2><p>Mağazalara veya finansal ortağa sunulan yazılım ve operasyon hizmeti için abonelik ya da kullanım bazlı ücretlendirme, görüşmelerde sınanabilecek seçeneklerdir. Fiyat, ücretin kim tarafından karşılanacağı ve gelir paylaşımı henüz belirlenmedi. Demo ücretsizdir; komisyon tahsil edilmez.</p></article>
      <article className="plan-card"><Handshake className="text-accent-green mb-4" size={28} /><h2>Birlikte doğrulamak istediğimiz konular</h2><p>Müşteri ihtiyacı, mağazanın ayırabileceği tutar, görevlinin işlem yükü, rezervasyona uyum ve olası modelin ekonomik sürdürülebilirliği. Bunları varsayımsal başarı oranlarıyla değil, deneme ve görüşme sonuçlarıyla değerlendireceğiz.</p></article>
    </section>
    <section id="yol-haritasi" className="mb-16">
      <p className="section-kicker">YOL HARİTASI</p>
      <h2 className="section-title">Demodan kontrollü saha denemesine</h2>
      <ol className="flow-list">{roadmap.map(([title, text], i) => <li key={title}><span className="flow-number">{String(i + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
    </section>
    <section className="mb-16 plan-card"><h2>Başarıyı nasıl ölçeceğiz?</h2><p className="mb-5">Demo yönetiminde yalnızca kaydedilmiş işlemlerin sayıları gösterilir. Bir akışın tamamlanması, gerçek nakit teslimini veya ticari talebi kanıtlamaz.</p><ul className="grid md:grid-cols-2 gap-4 plan-list">{metrics.map(item => <li key={item}>{item}</li>)}</ul></section>
    <section className="plan-card"><h2>Bugün gösterebildiğimiz şey</h2><p className="text-xl mb-6">“Bir müşterinin talebini mağazaya ulaştırabiliyoruz; mağaza süreli olarak kabul edebiliyor ve süreci takip edebiliyoruz.”</p><div className="flex flex-wrap gap-4"><a href="/mobil-demo/" className="hero-primary-action">Demoyu dene</a><a href="#/iletisim" className="hero-secondary-action">Pilot fikrini konuşalım</a></div></section>
  </div></div>;
}
