import { ChevronDown, Store, Clock3, QrCode, ShieldCheck } from 'lucide-react';

const steps = [
  ['Mağazanı seç, talebini ilet', 'Örnek mağazaları, hizmet saatlerini ve işlem limitlerini gör. 100 TL’nin katlarıyla demo tutarını seç. Telefon, kimlik, IBAN veya kart bilgisi gerekmez.'],
  ['Mağazanın yanıtını bekle', 'Görevli talebi kabul eder veya gerekçesiyle reddeder. Varsayılan yanıt süresi iki dakikadır. Mağaza onaylamadan yola çıkmayın. Bu işlem yalnızca demodur.'],
  ['Onayla rezervasyon başlasın', 'Onay anından itibaren varsayılan 10 dakikalık rezervasyon oluşur. Mağaza, adres, tutar ve kalan süre müşteri ekranına yansır. Müşteri bu aşamada da iptal edebilir.'],
  ['Kodunu mağazada göster', 'Tek kullanımlık QR veya alternatif kod, görevli teslim adımına hazır olduğunda gösterilir. Görevli kodu doğrular; yalnızca doğrulamak demoyu tamamlamaz.'],
  ['Demo teslimini tamamla', 'Görevli mağazayı ve tutarı kontrol eder, ayrı bir düğmeyle denemeyi bitirir. İki ekranda sonuç görünür. Bu adım gerçek nakit tesliminin kanıtı değildir.'],
];
const roles = [
  { icon: Store, title: 'Müşteri', text: 'Mağazayı seçer, tek aktif talebini takip eder ve isterse iptal eder.' },
  { icon: Clock3, title: 'Mağaza görevlisi', text: 'Kendi mağazasının taleplerini yönetir; kapasiteyi, rezervasyonları ve kod doğrulamayı takip eder.' },
  { icon: ShieldCheck, title: 'Yönetici', text: 'Mağazaları, yetkileri, demo ayarlarını ve olay geçmişini yönetir. Yalnızca kaydedilmiş sonuçları görür.' },
];
const questions = [
  ['Gerçek para alabilir miyim?', 'Hayır. Bu sürümde gerçek banka hesabı, kart, para transferi veya nakit teslimi kullanılmaz. Yalnızca müşteri ile mağazanın süreci birlikte yürütebilmesi denenir.'],
  ['“Talep kabul ediyor” ne anlama geliyor?', 'Mağazanın yeni demo taleplerine açık olduğunu gösterir; nakdin kesin hazır olduğu anlamına gelmez. Rezervasyon ancak mağaza talebi onaylayınca oluşur.'],
  ['Tutar ve süre sınırları nedir?', 'Varsayılan tutar aralığı 100–2.000 TL, tutar adımı 100 TL’dir. Mağaza daha düşük işlem limiti belirleyebilir. Yanıt için iki dakika, onay sonrası rezervasyon için on dakika tanınır. Yönetici bu demo ayarlarını değiştirebilir. Bunlar ürün testi limitleridir; yasal limit değildir.'],
  ['Talep iptal edilir veya süre dolarsa ne olur?', 'Müşteri onaydan önce veya sonra iptal edebilir. Yanıtsız talepler ve süresi dolan rezervasyonlar sunucu tarafından kapanır. Mağaza kabul ettiği rezervasyonu karşılayamıyorsa gerekçe belirtir; müşteri bilgilendirilir ve ayrılan kapasite serbest bırakılır.'],
  ['Demo kapasitesi bir bakiye mi?', 'Hayır. Mağazanın bu denemede taleplere ayırabileceğini beyan ettiği tutardır. Bekleyen talepler kapasite ayırmaz; kabul edilenler ayırır. Tamamlanma beyan kapasitesini bir kez azaltır. Bu değer kasa veya banka bakiyesi değildir.'],
  ['İki telefonla nasıl denenir?', 'Bir telefonda müşteri demosunu, diğerinde yetkili mağaza ekranını açın. Müşteri Demo Market A’dan talep oluştursun; görevli onaylasın, ardından müşterinin kodunu doğrulayıp demoyu tamamlasın. Mağaza hesabı herkese açık değildir; erişim için bizimle iletişime geçebilirsiniz.'],
  ['Bağlantı kesilirse veya kamera açılmazsa?', 'Güncel durum alınamadığında bağlantı uyarısı gösterilir; başarı varsayılmaz. Kamera yerine alternatif kod elle girilebilir. Açık ekranlar yaklaşık dört saniyede bir güncellenir; tarayıcı kapalıyken bildirim vaat edilmez.'],
];

export default function Teknoloji() {
  return <div className="content-page"><div className="max-w-6xl mx-auto">
    <p className="section-kicker">NASIL ÇALIŞIR?</p>
    <h1 className="page-title">Bir talep. İki ekran.<br />Takip edilebilir bir deneme.</h1>
    <p className="page-lead">Müşteri talebini iletir, mağaza süreli olarak kabul eder. Her iki taraf aynı sürecin durumunu kendi ekranından takip eder.</p>
    <div className="grid md:grid-cols-3 gap-5 mb-16">{roles.map(({icon: Icon, title, text}) => <article className="plan-card" key={title}><Icon className="text-accent-green mb-4" size={28} /><h2>{title}</h2><p>{text}</p></article>)}</div>
    <section className="mb-16" aria-labelledby="akis-baslik">
      <h2 id="akis-baslik" className="section-title">Talep oluştur → onayı bekle → kodla tamamla</h2>
      <ol className="flow-list">{steps.map(([title, text], index) => <li key={title}><span className="flow-number">{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
    </section>
    <section className="mb-16">
      <h2 className="section-title">Denemeden önce bilmeniz gerekenler</h2>
      <div className="divide-y divide-border-subtle border border-border-subtle rounded-2xl bg-card-dark/70 overflow-hidden">
        {questions.map(([question, answer]) => <details key={question} className="faq-item group"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 md:px-7 text-white font-semibold"><span>{question}</span><ChevronDown className="shrink-0 text-accent-green group-open:rotate-180" size={22} /></summary><p className="px-5 pb-6 md:px-7 text-[#a1a1aa] leading-relaxed">{answer}</p></details>)}
      </div>
    </section>
    <div className="plan-card flex flex-wrap items-center justify-between gap-6"><div><QrCode className="text-accent-green mb-3" size={28} /><h2>Akışı kendiniz görün.</h2><p>Örnek mağazalarla çalışan demoya geçin.</p></div><a className="hero-primary-action" href="/mobil-demo/">Demoyu dene</a></div>
  </div></div>;
}
