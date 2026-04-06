<div align="center">
  <img src="https://img.icons8.com/nolan/256/flash-on.png" alt="KayıTech Logo" width="120" />
  <h1>KayıTech: Elektrik Hesaplayıcı</h1>
  <p>💡 Elektrik mühendisleri, teknisyenler ve öğrenciler için modern, karanlık tema destekli ve internetsiz çalışabilen geliştirilmiş web uygulaması (PWA).</p>

  [![PWA](https://img.shields.io/badge/PWA-Ready-blue.svg?style=for-the-badge&logo=pwa)](#)
  [![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](#)
  [![HTML5](https://img.shields.io/badge/Tech-HTML%2FCSS%2FJS-f3652b.svg?style=for-the-badge&logo=html5)](#)
</div>

---

## ⚡ Özellikler

KayıTech, tamamen yerel tarayıcı (istemci) tabanlı çalışan hızlı ve premium tasarımlı bir elektronik ve ağ alet çantasıdır:

- 🔥 **Kablo Kesit Hesaplayıcı:** Monofaze (220V) ve Trifaze (380V) hatlar için. Hem güç hesabı hem de TS HD 60364 standartlarındaki akım taşıma (ısınma ve voltaj düşümü) kriterlerini çaprazlayarak *en güvenli optimum kablo kesitini* hesaplar.
- 🌈 **Direnç Renk Kodları:** 4-Bant dirençler için dinamik hesaplayıcı. Değeri ve tolerans şeritlerini canlı olarak gösteren özel CSS animasyonlu görsel arayüz içerir.
- 🌐 **RJ45 Soket Dizilimleri:** Network altyapıları için vazgeçilmez T568A ve (standart) T568B ağ kablosu dizilimlerini canlı ve kusursuz makro görsellerle beraber sunar.
- 📱 **Sıfır Kurulum & PWA:** Bu dosyaları doğrudan çalıştırabilir veya *Progressive Web App* teknolojisi sayesinde Android cihazlara doğrudan indirebilirsiniz. 

## 🛠 Kullanılan Teknolojiler

Bu uygulama saf (Vanilya) Web Teknolojileri kullanılarak inşa edilmiştir. Ekstra kütüphane/sunucu yükü gerektirmez.
- `HTML5` - Temel iskelet ve mantıksal ayırma
- `CSS3` (Vanilla) - Cam Efekti (Glassmorphism), Animasyonlar ve Koyu Tema Desteği
- `JavaScript` (ES6) - Yönlendirme, matematik algoritmaları ve anlık hesaplamalar.
- `Web Manifest` - Android Cihazlarda lokal kurulum desteği için.

## 🚀 Nasıl Çalıştırılır?

Hiçbir sunucu diline veya paket yöneticisine (Node/npm vb.) ihtiyaç yoktur.

### Geliştirme (Lokal Ortam)
Dosyaları indirdikten sonra, doğrudan `index.html` dosyasını favori web tarayıcınızda açmanız çalışması için yeterlidir. 

*(Gelişmiş PWA testleri için uygulamanın her ihtimale karşı bir lokal sunucudan çalıştırılması önerilir. Python yüklüyse klasör içinde PowerShell açarak `python -m http.server 8000` yazabilir ve tarayıcıdan http://localhost:8000 adresine gidebilirsiniz).*

## 📲 Vercel & Google Play Platformuna Taşıma
Mevcut tüm proje Google Play TWA paketlemeye uygundur.
1. Tüm bu dosyaları GitHub deponuza yükleyin.
2. Vercel'den deponuzu *import* ederek uygulamayı saniyeler içinde SSL (https) destekli olarak canlıya alın.
3. Vercel üzerinde aldığınız hazır URL'yi [PWABuilder](https://www.pwabuilder.com/) adresine yapıştırarak otomatik `AAB` formatında derleme alabilir, doğrudan Google Play Store Geliştirici panelinize yükleyebilirsiniz.

---
<p align="center"><i>Hazırlayan: Geleceğin elektrik-elektronik ihtiyaçları için şık çözümlerle kodlanmıştır.</i></p>
