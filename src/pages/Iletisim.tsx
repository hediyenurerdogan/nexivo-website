import React, { useState } from 'react';
import { Mail, Globe, MapPin } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Iletisim() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Kullanıcı yazmaya başladığında hatayı temizle
    if (errors[e.target.name as keyof FormData]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Ad alanı zorunludur.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta alanı zorunludur.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz.';
    }
    
    if (!formData.subject.trim()) newErrors.subject = 'Konu alanı zorunludur.';
    if (!formData.message.trim()) newErrors.message = 'Mesaj alanı zorunludur.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // mailto linkini oluştur
      const mailtoLink = `mailto:destek@nexivotr.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Ad: ${formData.name}\nMesaj:\n${formData.message}`)}`;
      
      // E-posta uygulamasını aç
      window.location.href = mailtoLink;
      
      // Başarı durumunu göster ve formu temizle
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // 5 saniye sonra başarı mesajını gizle
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen pt-[120px] pb-20 px-6 md:px-[5vw] bg-bg-dark">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">İletişim</h1>
        <p className="text-xl text-[#a1a1aa] mb-16 max-w-2xl leading-relaxed">
          Potansiyel ortaklıklar, yatırım fırsatları ve teknik detaylar için bizimle iletişime geçebilirsiniz.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* İletişim Bilgileri */}
          <div className="space-y-8">
            <div className="bg-card-dark p-6 rounded-2xl border border-border-subtle flex items-start gap-4">
              <div className="bg-accent-green/10 p-3 rounded-lg">
                <Mail className="text-accent-green" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">E-posta</h3>
                <a href="mailto:destek@nexivotr.com" className="text-[#a1a1aa] hover:text-accent-green transition-colors">
                  destek@nexivotr.com
                </a>
              </div>
            </div>

            <div className="bg-card-dark p-6 rounded-2xl border border-border-subtle flex items-start gap-4">
              <div className="bg-accent-purple/10 p-3 rounded-lg">
                <Globe className="text-accent-purple" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Web Sitesi</h3>
                <a href="https://www.nexivotr.com" target="_blank" rel="noopener noreferrer" className="text-[#a1a1aa] hover:text-accent-purple transition-colors">
                  www.nexivotr.com
                </a>
              </div>
            </div>

            <div className="bg-card-dark p-6 rounded-2xl border border-border-subtle flex items-start gap-4">
              <div className="bg-white/5 p-3 rounded-lg">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Konum</h3>
                <p className="text-[#a1a1aa]">
                  Türkiye, Ankara
                </p>
              </div>
            </div>
          </div>

          {/* İletişim Formu */}
          <div className="bg-card-dark p-8 rounded-2xl border border-border-subtle">
            <h3 className="text-2xl font-bold text-white mb-6">Bize Yazın</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              
              {isSuccess && (
                <div className="bg-accent-green/10 border border-accent-green text-accent-green px-4 py-3 rounded-lg mb-4 font-medium">
                  Mesajınız başarıyla gönderildi, e-posta uygulamanız açılıyor...
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#a1a1aa] mb-2">Adınız Soyadınız</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-bg-dark border ${errors.name ? 'border-red-500' : 'border-border-subtle'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-green transition-colors`}
                  placeholder="Adınız"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#a1a1aa] mb-2">E-posta Adresiniz</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-bg-dark border ${errors.email ? 'border-red-500' : 'border-border-subtle'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-green transition-colors`}
                  placeholder="ornek@sirket.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#a1a1aa] mb-2">Konu</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full bg-bg-dark border ${errors.subject ? 'border-red-500' : 'border-border-subtle'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-green transition-colors`}
                  placeholder="Mesajınızın konusu"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#a1a1aa] mb-2">Mesajınız</label>
                <textarea 
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-bg-dark border ${errors.message ? 'border-red-500' : 'border-border-subtle'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-green transition-colors resize-none`}
                  placeholder="Size nasıl yardımcı olabiliriz?"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              
              <button 
                type="submit"
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors mt-2"
              >
                Mesaj Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
