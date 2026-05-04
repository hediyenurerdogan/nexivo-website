export default function Vizyon() {
  return (
    <div className="min-h-screen pt-[120px] pb-20 px-6 md:px-[5vw] bg-bg-dark">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Vizyonumuz</h1>

        <div className="prose prose-invert prose-lg max-w-none text-[#a1a1aa]">
          <p className="text-xl leading-relaxed mb-8 text-white">
            NEXIVO, kimlik doğrulamanın daha güvenli, daha özel ve daha zor taklit edilebilir hale gelmesi gerektiğine inanan erken aşama bir teknoloji girişimidir. Odağımız kısa vadeli satıştan çok, doğru teknoloji kanıtlarını üretmek ve doğru yatırımcılarla ölçeklenebilir bir güvenlik altyapısı kurmaktır.
          </p>

          <div className="bg-card-dark p-8 md:p-12 rounded-2xl border border-border-subtle my-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-accent-purple"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-0 mb-4">Yatırıma Hazırlanan Teknoloji</h2>
            <p className="mb-0">
              Hedefimiz; damar biyometrisi, cihaz üstü doğrulama ve sıfır güven prensiplerini bir araya getiren uygulanabilir bir ürün çekirdeği geliştirmek. Bu çekirdeği pilot çalışmalar, demo günleri ve stratejik ortaklıklarla doğrulayarak yatırım ölçeğine taşımayı planlıyoruz.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-white mb-4">Neden Şimdi?</h3>
          <p className="mb-6">
            Yapay zeka ile sahte yüz, ses ve kimlik üretimi hızlanırken, geleneksel biyometrik yöntemlerin güvenilirliği yeniden sorgulanıyor. NEXIVO bu kırılma noktasında, kopyalanması çok daha zor olan biyometrik sinyalleri erişilebilir bir doğrulama altyapısına dönüştürmeyi hedefler.
          </p>
          <p>
            Yatırımcılar, hızlandırıcılar ve kurumsal pilot ortakları için amacımız net: güçlü bir problem, farklılaşan bir teknik yaklaşım ve ölçülebilir validasyon süreciyle büyüyen bir güvenlik girişimi inşa etmek.
          </p>
        </div>
      </div>
    </div>
  );
}
