import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Check, Store, Clock3, ShieldCheck, Smartphone } from 'lucide-react';

export default function Home() {
  return <>
    <section className="landing-hero shell">
      <div className="hero-copy">
        <p className="eyebrow"><span /> MAĞAZADAN NAKİT · ÜRÜN DEMOSU</p>
        <h1>Önce talep.<br />Sonra onay.<br /><span>Her adım net.</span></h1>
        <p className="intro">Nakit alma fikrini mahallenin mağazalarıyla yeniden düşünelim. Talebini ilet, mağazanın yanıtını gör, süreli rezervasyonunu takip et.</p>
        <div className="action-row"><a className="button primary" href="/mobil-demo/">Demoyu dene <ArrowUpRight size={21} /></a><Link className="text-link" to="/nasil-calisir">Nasıl çalışır? <ArrowRight size={18} /></Link></div>
        <p className="small-note"><ShieldCheck size={17} /> Gerçek para, banka hesabı veya kart bilgisi kullanılmaz.</p>
      </div>
      <div className="journey-visual" aria-label="Örnek demo akışı">
        <div className="visual-top"><span>BİR TALEBİN YOLCULUĞU</span><span>ÖRNEK AKIŞ</span></div>
        <div className="request-paper"><div className="paper-heading"><span className="icon-box"><Store size={25} /></span><div><strong>Demo Market A</strong><span>Örnek mağaza</span></div><span className="sample-label">DEMO</span></div><p className="amount-label">Talep edilen demo tutarı</p><div className="demo-amount">500 <span>TL</span></div><div className="paper-line" /><div className="approval"><span className="check-circle"><Check size={18} /></span><div><strong>Mağaza onayladı</strong><p>Rezervasyon onayla başlar.</p></div></div><div className="reservation"><Clock3 size={18} /><span>10 dakika rezervasyon</span><span>→</span></div></div>
        <div className="journey-caption"><span className="caption-arrow">↗</span><div><strong>İki ekran. Aynı süreç.</strong><p>Müşteri ve mağaza, adım adım birlikte.</p></div></div>
        <p className="visual-disclaimer">Temsili görünüm · Gerçek işlem veya canlı rezervasyon değildir.</p>
      </div>
    </section>
    <section className="steps-section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">KARMAŞIK OLMASINA GEREK YOK</p><h2>Birlikte, üç adımda.</h2></div><Link className="text-link" to="/nasil-calisir">Tüm akışı incele <ArrowUpRight size={20} /></Link></div><div className="step-grid">{[
      ['01','Talebini ilet.','Örnek mağazayı seç, demo tutarını belirle. Aynı anda tek aktif talebini takip et.',Smartphone],
      ['02','Onayı bekle.','Mağaza kabul ettiğinde süreli rezervasyon oluşur. Onay gelmeden yola çıkma.',Store],
      ['03','Kodla tamamla.','Görevli kodunu doğrulasın, ardından ayrı bir adımla demo teslimini tamamlasın.',Check],
    ].map(([n,title,description,Icon]) => { const StepIcon = Icon as typeof Check; return <article className="step-card" key={String(n)}><div className="step-top"><span>{String(n)}</span><StepIcon size={26} /></div><h3>{String(title)}</h3><p>{String(description)}</p></article>; })}</div></div></section>
    <section className="shell next-section"><div><p className="eyebrow">BUGÜN DEMO. YARIN, BİRLİKTE DOĞRULAMA.</p><h2>Çalışan bir süreç.<br />Birlikte atılan ilk adım.</h2></div><div><p>Müşteri talebini mağazaya ulaştırabiliyoruz. Mağaza süreli olarak kabul edebiliyor; iki taraf da süreci takip edebiliyor.</p><p>Finansal ortaklık ve gerçek para içeren saha pilotu sonraki aşama. Bugün örnek mağazalarla, gerçek para kullanmadan deniyoruz.</p><Link className="text-link" to="/vizyon">İş planımızı keşfet <ArrowUpRight size={20} /></Link></div></section>
    <section className="shell"><div className="contact-band"><div><p className="eyebrow">BİRLİKTE GELİŞTİRELİM</p><h2>Mağazanızın görüşü değerli.</h2><p>İhtiyacı, mağaza süreçlerini ve pilot fikrini konuşalım.</p></div><Link to="/iletisim" className="button primary">İletişime geç <ArrowUpRight size={20} /></Link></div></section>
  </>;
}
