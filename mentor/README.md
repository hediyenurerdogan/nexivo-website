# NEXIVO mobil mentör demosu

Canlı adres: https://www.nexivotr.com/mobil-demo/

## Mevcut projeden yararlanılanlar
Ana sitenin React/TypeScript/Vite altyapısı ve kullanıcının sağladığı NEXIVO logosu korundu. Önceki `nexivo-cash-demo/src/lib/service.ts`, `src/components/demo-app.tsx` ve `tests/core.test.ts` incelendi. Aynı kuruş cinsinden tutar, rezervasyon, tek aktif talep, ayrı kod doğrulama ve tek seferlik kapasite düşümü kuralları sunum için saf `mentor/model.ts` durum motoruna uyarlandı. PostgreSQL/Render uygulamasına ve mevcut kullanıcı verilerine dokunulmadı.

Bu sürüm ayrı `/mobil-demo/` yoludur. Ana sitenin index.html, assets, menüleri ve tanıtım sayfaları değişmez. Service worker yalnızca `/mobil-demo/` kapsamındadır; sadece `nexivo-mentor-` adlı önbelleklerini yönetir. Yerel kayıt anahtarı `nexivo-mentor-demo-v1`.

## Telefonda açılış
1. Bağlantıyı Safari veya Chrome'da, internet varken bir kez açın.
2. Demoyu başlatın. Profil ekranında “Çevrimdışı sunum dosyaları hazır” ibaresini kontrol edin.
3. iPhone: Safari → Paylaş → Ana Ekrana Ekle. Android: Chrome → Menü → Uygulamayı yükle / Ana ekrana ekle. Desteklenen tarayıcıda Profil sayfasında yükleme düğmesi de çıkar.
4. Tek tarayıcı sekmesinde sunum yapın. Sıfırlamak için Profil → Demoyu sıfırla; onay gerekir.

## İki dakikalık mentör sunumu
- 0:00–0:20: “Demoyu başlat”, 500 TL seç. Ankara'daki kurgusal noktaları ve örnek haritayı göster.
- 0:20–0:40: Demo Market A detayını aç. Hizmet bedelinin henüz belirlenmediğini ve rezervasyon öncesi uyarıyı göster. Talep gönder.
- 0:40–1:00: Üstte İşletme demosu → “10 dakika ayır ve kabul et”. Kapasite 3.000, ayrılan 500, kullanılabilir 2.500 TL.
- 1:00–1:20: Müşteri → İşlemler. “500 TL senin için ayrıldı” mesajını, tek rezervasyon kartını ve örnek rotayı göster. “Mağazadayım, kodu göster” ile QR ve kısa kodu aç.
- 1:20–1:40: İşletmeye geç; “Bekleyen talepler” ve “Aktif rezervasyonlar” ayrımını göster. Kodu yapıştırıp doğrula; ardından “Teslimi tamamla”. Kapasite 2.500, ayrılan 0 TL olur.
- 1:40–2:00: Müşteri → İşlemler → teslim beyanı ve “Nakdi alamadım / sorun bildir” yolunu göster. “İtiraz açık” etiketini listede ve detayda doğrula. Üstteki sunum kontrollerinden finansal model taslağını aç; geri düğmesi işlem detayına döner.

## Geliştirme ve test
Node.js 20 veya üstü. Proje kökünde:

```sh
npm ci
npm run dev:mentor
npm run test:mentor
npm run build:mentor
npx vite preview --config vite.mentor.config.ts --port 4174
```

Geliştirme sunucusunda çevrimdışı kurulum test edilmez; `build:mentor` çıktısını preview ile açın. Yayına alınacak dosyalar `mobil-demo/` klasörüne üretilir; GitHub Pages mevcut main/root yayınıyla bu klasörü sunar. Ana siteyi yeniden build etmek gerekmez.

14 otomatik test: başarı, ayrı doğrulama, tek debit, ret gerekçesi, 2 dakika sınırı, onaydan önce/sonra/doğrulama sonrası iptal, rezervasyon expiry, işletme iptali, yanlış/başka mağaza/kullanılmış kod, yetersiz kapasite, kapasite alt sınırı, hizmet kapatma, tek aktif talep ve tutar doğrulama, JSON yenileme, senaryo kontrolleri, çift kabul, mağazaya varış kod kapısı ve ayrı müşteri itirazı. Son koşu: 14/14 geçti.

Tarayıcı kontrolü: başarılı akış, kullanılan kodun reddi, ret, pending timeout, rezervasyon expiry, yetersiz kapasite, müşteri iptali, harita seçimi, yenilemede kod/süre korunması; 320/375/414/768 px ana sayfa/işlemler/profil taşma kontrolü. Yerel sunucu kapatılarak cache üzerinden yeniden açılış ve başarı akışı doğrulandı.

## Sınırlamalar
- Tamamen tek cihazda çalışan sunum prototipi; çok cihazlı sunucu eşzamanlaması veya gerçek oturum yetkilendirmesi yoktur. Müşteri/işletme geçişi bilinçli olarak açıktır.
- Cihaz saatine ve tarayıcı saklama alanına dayanır. Tarayıcı verisi silinirse demo geçmişi silinir. PWA önbelleği cihaz tarafından temizlenebilir; görüşmeden önce çevrimiçi açın.
- Kurgusal mağazalar, adresler, mesafeler, kullanıcı ve tutarlar; şematik harita navigasyon değildir. Konum izni/ücretli harita yoktur.
- QR gerçek, rastgele işlem token'ı içerir. Kamera taraması eklenmedi; kısa kod veya QR içeriği elle girilebilir. Kamera izni gerekmez.
- QR ve kodlar yalnızca yerel demo doğrulamasıdır; gerçek para veya gerçek teslim kanıtı değildir.
- Android/iOS yerel uygulama veya mağaza yayını yoktur. Fiziksel telefonda PWA kurulum testi yapılmadı; tarayıcı mobil boyutları ve manifest/yükleme istemi kontrol edildi.
- Yeni ücretli servis açılmadı. Sunum akışı Render veya eski PostgreSQL veritabanına bağlanmaz.
