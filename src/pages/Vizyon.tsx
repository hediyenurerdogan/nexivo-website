import React from 'react';

export default function Vizyon() {
  return (
    <div className="min-h-screen pt-[120px] pb-20 px-6 md:px-[5vw] bg-bg-dark">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Vizyonumuz</h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-[#a1a1aa]">
          <p className="text-xl leading-relaxed mb-8 text-white">
            Dijital ve fiziksel dünyaların iç içe geçtiği günümüzde, kimlik doğrulama artık sadece bir güvenlik prosedürü değil, temel bir insan hakkıdır. NEXIVO olarak vizyonumuz, şifrelerin ve kolayca kopyalanabilen biyometrik verilerin yarattığı güvenlik açıklarını tarihe gömmektir.
          </p>
          
          <div className="bg-card-dark p-8 md:p-12 rounded-2xl border border-border-subtle my-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-accent-purple"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-0 mb-4">Şifresiz Bir Gelecek</h2>
            <p className="mb-0">
              Kullanıcıların karmaşık şifreleri hatırlamak zorunda kalmadığı, kurumların veri ihlali korkusu yaşamadığı bir ekosistem inşa ediyoruz. Hedefimiz, finansal işlemlerden fiziksel erişimlere kadar her alanda, kişinin sadece "kendi olmasıyla" en yüksek güvenlik standardına ulaşmasını sağlamaktır.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-white mb-4">Küresel Etki</h3>
          <p className="mb-6">
            Her yıl milyarlarca dolara ulaşan dolandırıcılık kayıplarını durdurmak için proaktif bir yaklaşım benimsiyoruz. Geliştirdiğimiz teknoloji sadece bugünün değil, önümüzdeki 10 yılın güvenlik tehditlerine karşı tasarlanmıştır.
          </p>
          <p>
            NEXIVO, biyometrik güvenlikte yeni bir çağ başlatıyor. Kopyalanamaz, çalınamaz ve devredilemez bir kimlik doğrulama standardı ile dünyayı daha güvenli bir yer haline getiriyoruz.
          </p>
        </div>
      </div>
    </div>
  );
}
