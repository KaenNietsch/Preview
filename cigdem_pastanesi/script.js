/* ============================================================
   RESTORAN / PASTANE WEB SİTESİ - ANA JAVASCRIPT DOSYASI
   ============================================================
   KOLAY UYARLAMA: Aşağıdaki değişkenleri kendi işletmenize
   göre düzenleyerek menüyü ve site bilgilerini yönetebilirsiniz.
   ============================================================ */

// ============================================================
// İŞLETME BİLGİLERİ (Buradan düzenleyin)
// ============================================================
const ISLETME = {
  ad: "Çiğdem Pastanesi",
  slogan: "Gün Boyu Taze Lezzetler",
  aciklama: "Aziziye/Erzurum'da günlük taze poğaça, börek, tatlı ve pasta çeşitleriyle hizmet veriyoruz.",
  telefon: "0535 050 89 53",
  email: "",
  adres: "Şehit Onbaşı Ömer Budak Caddesi Tazegül Group Altı No 1, 25000 Aziziye/Erzurum",
  calisma_saatleri: "24 saat açık",
  harita_embed: "https://www.google.com/maps?q=39.9106439,41.1891211&hl=tr&z=16&output=embed",
  sosyal_medya: {
    instagram: "#",
    facebook: "#",
    twitter: "#"
  }
};

// ============================================================
// ALERJEN TİPLERİ (1 Temmuz 2026 Gıda Yasası Uyumlu)
// ============================================================
const ALERJEN_TIPLERI = [
  { id: "gluten", ad: "Gluten", ikon: "🌾", sinif: "gluten" },
  { id: "laktoz", ad: "Laktoz", ikon: "🥛", sinif: "laktoz" },
  { id: "fistik", ad: "Fıstık", ikon: "🥜", sinif: "fistik" },
  { id: "yumurta", ad: "Yumurta", ikon: "🥚", sinif: "yumurta" },
  { id: "soya", ad: "Soya", ikon: "🫘", sinif: "soya" },
  { id: "kabuklu-deniz", ad: "Kabuklu Deniz Ürünü", ikon: "🦐", sinif: "kabuklu-deniz" },
  { id: "kereviz", ad: "Kereviz", ikon: "🥬", sinif: "kereviz" },
  { id: "hardal", ad: "Hardal", ikon: "🟡", sinif: "hardal" },
  { id: "susam", ad: "Susam", ikon: "⚪", sinif: "susam" },
  { id: "suefit", ad: "Sülfür Dioksit", ikon: "🍷", sinif: "suefit" }
];

// ============================================================
// MENÜ VERİLERİ (JSON'dan yüklenecek; aşağıdaki dizi yedek/fallback)
// ============================================================
const DEFAULT_MENU = [
  {
    id: 1,
    ad: "Klasik Gurme Burger",
    aciklama: "200gr dana eti, cheddar peyniri, karamelize soğan, özel sos ve taze yeşillikler.",
    fiyat: "285",
    kategori: "Ana Yemekler",
    malzemeler: "Dana kıyma, cheddar peyniri, marul, domates, soğan, turşu, brioche ekmeği, özel burger sosu",
    alerjenler: ["gluten", "laktoz", "yumurta", "hardal", "susam"],
    gorsel: "https://mgx-backend-cdn.metadl.com/generate/images/1071055/2026-03-29/833986cd-383b-41f2-9d7e-de216a4f9eb2.png"
  },
  {
    id: 2,
    ad: "Fettuccine Alfredo",
    aciklama: "Taze fettuccine makarna, kremali parmesan sos, karabiber ve maydanoz.",
    fiyat: "245",
    kategori: "Ana Yemekler",
    malzemeler: "Fettuccine makarna, krema, parmesan peyniri, tereyağı, sarımsak, maydanoz, karabiber",
    alerjenler: ["gluten", "laktoz", "yumurta"],
    gorsel: "https://mgx-backend-cdn.metadl.com/generate/images/1071055/2026-03-29/d1034502-5c9d-4e2f-bf0e-aba198a07e64.png"
  },
  {
    id: 3,
    ad: "Akdeniz Salatası",
    aciklama: "Taze mevsim yeşillikleri, avokado, nar, ceviz ve zeytinyağı-limon sos.",
    fiyat: "165",
    kategori: "Salatalar",
    malzemeler: "Roka, marul, avokado, nar taneleri, ceviz, cherry domates, salatalık, zeytinyağı, limon",
    alerjenler: [],
    gorsel: "https://mgx-backend-cdn.metadl.com/generate/images/1071055/2026-03-29/14c61293-9ac1-4545-aae6-654812891ee2.png"
  },
  {
    id: 4,
    ad: "Çikolatalı Pasta",
    aciklama: "Belçika çikolatası ile hazırlanmış kat kat pasta, ganaj sos ve taze frambuaz.",
    fiyat: "145",
    kategori: "Tatlılar",
    malzemeler: "Belçika çikolatası, un, yumurta, tereyağı, şeker, krema, frambuaz, kakao",
    alerjenler: ["gluten", "laktoz", "yumurta", "soya"],
    gorsel: "https://mgx-backend-cdn.metadl.com/generate/images/1071055/2026-03-29/0f287d51-ce0f-41e5-8edc-486ae35242c4.png"
  },
  {
    id: 5,
    ad: "Tavuk Şiş",
    aciklama: "Marine edilmiş tavuk but, közlenmiş biber ve soğan ile servis edilir.",
    fiyat: "225",
    kategori: "Ana Yemekler",
    malzemeler: "Tavuk but, biber, soğan, zeytinyağı, baharat karışımı, sumak, pul biber",
    alerjenler: [],
    gorsel: ""
  },
  {
    id: 6,
    ad: "Mercimek Çorbası",
    aciklama: "Geleneksel kırmızı mercimek çorbası, tereyağı ve limon ile.",
    fiyat: "95",
    kategori: "Çorbalar",
    malzemeler: "Kırmızı mercimek, soğan, havuç, patates, tereyağı, limon, nane, pul biber",
    alerjenler: ["laktoz"],
    gorsel: ""
  },
  {
    id: 7,
    ad: "Karışık Pizza",
    aciklama: "İnce hamur üzerinde sucuk, mantar, biber, zeytin ve mozzarella.",
    fiyat: "265",
    kategori: "Pizzalar",
    malzemeler: "Pizza hamuru, domates sosu, mozzarella, sucuk, mantar, yeşil biber, zeytin, mısır",
    alerjenler: ["gluten", "laktoz"],
    gorsel: ""
  },
  {
    id: 8,
    ad: "Sezar Salata",
    aciklama: "Marul, parmesan, kruton, tavuk ve sezar sos.",
    fiyat: "175",
    kategori: "Salatalar",
    malzemeler: "Marul, parmesan peyniri, kruton, tavuk göğsü, sezar sos, limon, sarımsak",
    alerjenler: ["gluten", "laktoz", "yumurta", "fistik"],
    gorsel: ""
  },
  {
    id: 9,
    ad: "Künefe",
    aciklama: "Geleneksel Hatay künefesi, antep fıstığı ve şerbet ile.",
    fiyat: "155",
    kategori: "Tatlılar",
    malzemeler: "Kadayıf, tuzsuz peynir, tereyağı, şeker, su, antep fıstığı",
    alerjenler: ["gluten", "laktoz", "fistik"],
    gorsel: ""
  },
  {
    id: 10,
    ad: "Domates Çorbası",
    aciklama: "Közlenmiş domates çorbası, kruton ve fesleğen ile.",
    fiyat: "105",
    kategori: "Çorbalar",
    malzemeler: "Domates, soğan, sarımsak, zeytinyağı, kruton, fesleğen, krema",
    alerjenler: ["gluten", "laktoz"],
    gorsel: ""
  },
  {
    id: 11,
    ad: "Margarita Pizza",
    aciklama: "Klasik İtalyan pizzası: domates sos, mozzarella ve taze fesleğen.",
    fiyat: "215",
    kategori: "Pizzalar",
    malzemeler: "Pizza hamuru, domates sosu, mozzarella, taze fesleğen, zeytinyağı",
    alerjenler: ["gluten", "laktoz"],
    gorsel: ""
  },
  {
    id: 12,
    ad: "Limonata",
    aciklama: "Taze sıkılmış limon, nane ve hafif şeker ile.",
    fiyat: "65",
    kategori: "İçecekler",
    malzemeler: "Taze limon, şeker, su, nane, buz",
    alerjenler: [],
    gorsel: ""
  },
  {
    id: 13,
    ad: "Türk Kahvesi",
    aciklama: "Geleneksel yöntemle pişirilen Türk kahvesi, lokum ile servis.",
    fiyat: "55",
    kategori: "İçecekler",
    malzemeler: "Türk kahvesi, su, şeker (isteğe bağlı), lokum",
    alerjenler: [],
    gorsel: ""
  },
  {
    id: 14,
    ad: "Cheesecake",
    aciklama: "New York usulü cheesecake, orman meyveli sos ile.",
    fiyat: "135",
    kategori: "Tatlılar",
    malzemeler: "Krem peynir, bisküvi, tereyağı, yumurta, şeker, vanilin, orman meyveleri",
    alerjenler: ["gluten", "laktoz", "yumurta"],
    gorsel: ""
  },
  {
    id: 15,
    ad: "Karides Tava",
    aciklama: "Tereyağında sote edilmiş karides, sarımsak ve limon ile.",
    fiyat: "295",
    kategori: "Ana Yemekler",
    malzemeler: "Karides, tereyağı, sarımsak, limon, maydanoz, pul biber",
    alerjenler: ["kabuklu-deniz", "laktoz"],
    gorsel: ""
  }
];

let MENU_VERILERI = [];

// ============================================================
// MENÜ VERİLERİNİ YÜKLEME
// ============================================================
async function yukleMenuJson() {
  try {
    const res = await fetch('./assets/menu.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('JSON yüklenemedi');
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Geçersiz JSON formatı');
    MENU_VERILERI = data;
  } catch (err) {
    MENU_VERILERI = DEFAULT_MENU;
  }
}

// ============================================================
// GENEL FONKSİYONLAR
// ============================================================

document.addEventListener('DOMContentLoaded', async function () {
  // Header scroll efekti
  headerScrollEfekti();

  // Hamburger menü
  hamburgerMenuKur();

  // Aktif menü durumu (Ana Sayfa / Menümüz)
  navAktifDurumKur();

  // Scroll animasyonları
  scrollAnimasyonlariKur();

  // WhatsApp butonu
  whatsappButonKur();

  // Menü sayfası mı kontrol et
  if (document.getElementById('menu-grid')) {
    await yukleMenuJson();
    menuSayfasiKur();
  }
});

// --- Aktif Menü Durumu ---
function navAktifDurumKur() {
  const links = document.querySelectorAll('.nav-menu .nav-link');
  if (!links || links.length === 0) return;

  const path = (window.location && window.location.pathname ? window.location.pathname : '').toLowerCase();
  const isMenu = path.endsWith('/menu.html') || path.endsWith('menu.html');
  const isIndex = path.endsWith('/index.html') || path.endsWith('index.html') || path.endsWith('/') || path === '';

  links.forEach(a => a.classList.remove('aktif'));

  let hedef;
  if (isMenu) {
    hedef = Array.from(links).find(a => (a.getAttribute('href') || '').includes('menu.html'));
  } else if (isIndex) {
    hedef = Array.from(links).find(a => {
      const href = a.getAttribute('href') || '';
      return href.includes('index.html') && !href.includes('#');
    });
  }

  if (hedef) hedef.classList.add('aktif');
}

// --- Header Scroll Efekti ---
function headerScrollEfekti() {
  const header = document.querySelector('.header');
  if (!header) return;

  let sonScroll = 0;
  window.addEventListener('scroll', function () {
    const suankiScroll = window.pageYOffset;
    if (suankiScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    sonScroll = suankiScroll;
  }, { passive: true });
}

// --- Hamburger Menü ---
function hamburgerMenuKur() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const overlay = document.querySelector('.mobil-menu-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  function menuKapat() {
    hamburger.classList.remove('aktif');
    navMenu.classList.remove('aktif');
    if (overlay) overlay.classList.remove('aktif');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (overlay) overlay.style.display = 'none';
    }, 300);
  }

  function menuAc() {
    if (overlay) {
      overlay.style.display = 'block';
      requestAnimationFrame(() => {
        overlay.classList.add('aktif');
      });
    }
    hamburger.classList.add('aktif');
    navMenu.classList.add('aktif');
    document.body.style.overflow = 'hidden';
  }

  hamburger.addEventListener('click', function () {
    if (navMenu.classList.contains('aktif')) {
      menuKapat();
    } else {
      menuAc();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', menuKapat);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', menuKapat);
  });
}

// --- Scroll Animasyonları ---
function scrollAnimasyonlariKur() {
  const elementler = document.querySelectorAll('.gorunur-element');
  if (elementler.length === 0) return;

  const gozlemci = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('gorundu');
        gozlemci.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elementler.forEach(function (el) {
    gozlemci.observe(el);
  });
}

// ============================================================
// MENÜ SAYFASI FONKSİYONLARI
// ============================================================

let aktifKategori = "Tümü";
let aktifAlerjenler = [];
let aramaMetni = "";

function menuSayfasiKur() {
  kategorileriOlustur();
  alerjenPaneliOlustur();
  aramaKur();
  menuListele();
}

// --- Kategorileri Oluştur ---
function kategorileriOlustur() {
  const cipKonteyner = document.getElementById('kategori-cipler');
  if (!cipKonteyner) return;

  cipKonteyner.innerHTML = '';
  const KATEGORILER_DINAMIK = ["Tümü", ...new Set(MENU_VERILERI.map(u => u.kategori))];
  KATEGORILER_DINAMIK.forEach(function (kategori) {
    const cip = document.createElement('button');
    cip.className = 'kategori-cip' + (kategori === aktifKategori ? ' aktif' : '');
    cip.textContent = kategori;
    cip.addEventListener('click', function () {
      aktifKategori = kategori;
      document.querySelectorAll('.kategori-cip').forEach(function (c) {
        c.classList.remove('aktif');
      });
      cip.classList.add('aktif');
      menuListele();
    });
    cipKonteyner.appendChild(cip);
  });
}

// --- Alerjen Paneli ---
function alerjenPaneliOlustur() {
  const modal = document.getElementById('alerjen-modal');
  const overlay = document.getElementById('alerjen-modal-overlay');
  const grid = document.getElementById('alerjen-grid');
  const buton = document.getElementById('alerjen-buton');
  const kapat = document.getElementById('alerjen-kapat');
  const temizle = document.getElementById('alerjen-temizle');
  const uygula = document.getElementById('alerjen-uygula');
  if (!modal || !overlay || !grid || !buton || !kapat || !temizle || !uygula) return;

  function modalAc() {
    overlay.classList.add('aktif');
    modal.classList.add('aktif');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-acik');
    buton.classList.add('aktif');
  }
  function modalKapat() {
    overlay.classList.remove('aktif');
    modal.classList.remove('aktif');
    document.body.style.overflow = '';
    document.body.classList.remove('modal-acik');
    if (aktifAlerjenler.length === 0) buton.classList.remove('aktif');
  }

  // Listeyi oluştur (ikon YOK)
  grid.innerHTML = '';
  ALERJEN_TIPLERI.forEach(function (alerjen) {
    const btn = document.createElement('button');
    btn.className = 'alerjen-toggle';
    btn.dataset.id = alerjen.id;
    btn.textContent = alerjen.ad;
    btn.addEventListener('click', function () {
      const idx = aktifAlerjenler.indexOf(alerjen.id);
      if (idx > -1) {
        aktifAlerjenler.splice(idx, 1);
        btn.classList.remove('aktif');
      } else {
        aktifAlerjenler.push(alerjen.id);
        btn.classList.add('aktif');
      }
      alerjenButonGuncelle();
      menuListele(); // anında uygula
    });
    grid.appendChild(btn);
  });

  // Var olan seçimleri yansıt
  function secimleriYansit() {
    document.querySelectorAll('.alerjen-toggle').forEach(function (el) {
      const id = el.dataset.id;
      if (aktifAlerjenler.includes(id)) el.classList.add('aktif'); else el.classList.remove('aktif');
    });
  }
  secimleriYansit();

  // Etkileşimler
  buton.addEventListener('click', modalAc);
  overlay.addEventListener('click', modalKapat);
  kapat.addEventListener('click', modalKapat);
  uygula.addEventListener('click', modalKapat);
  temizle.addEventListener('click', function () {
    aktifAlerjenler = [];
    secimleriYansit();
    alerjenButonGuncelle();
    menuListele();
  });
}

function alerjenButonGuncelle() {
  const buton = document.getElementById('alerjen-buton');
  if (!buton) return;
  const sayi = aktifAlerjenler.length;
  const sayiEl = buton.querySelector('.filtre-sayi');
  if (sayi > 0) {
    if (sayiEl) {
      sayiEl.textContent = sayi;
    } else {
      const span = document.createElement('span');
      span.className = 'filtre-sayi';
      span.textContent = sayi;
      buton.appendChild(span);
    }
    buton.classList.add('aktif');
  } else {
    if (sayiEl) sayiEl.remove();
    const modal = document.getElementById('alerjen-modal');
    if (!modal || !modal.classList.contains('aktif')) buton.classList.remove('aktif');
  }
}

// --- Arama ---
function aramaKur() {
  const aramaInput = document.getElementById('arama-input');
  if (!aramaInput) return;

  let zamanlayici;
  aramaInput.addEventListener('input', function (e) {
    clearTimeout(zamanlayici);
    zamanlayici = setTimeout(function () {
      aramaMetni = e.target.value.toLowerCase().trim();
      menuListele();
    }, 250);
  });
}

// --- Menü Listele ---
function menuListele() {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;

  let filtrelenmis = MENU_VERILERI.filter(function (urun) {
    // Kategori filtresi
    if (aktifKategori !== "Tümü" && urun.kategori !== aktifKategori) return false;

    // Arama filtresi
    if (aramaMetni) {
      const aramaAlani = (urun.ad + ' ' + urun.aciklama + ' ' + urun.malzemeler + ' ' + urun.kategori).toLowerCase();
      if (!aramaAlani.includes(aramaMetni)) return false;
    }

    // Alerjen filtresi (seçilen alerjenleri İÇERMEYEN ürünleri göster)
    if (aktifAlerjenler.length > 0) {
      const urunAlerjenler = urun.alerjenler || [];
      for (let i = 0; i < aktifAlerjenler.length; i++) {
        if (urunAlerjenler.includes(aktifAlerjenler[i])) return false;
      }
    }

    return true;
  });

  grid.innerHTML = '';

  if (filtrelenmis.length === 0) {
    grid.innerHTML = `
      <div class="menu-sonuc-yok">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <h3>Sonuç Bulunamadı</h3>
        <p>Arama kriterlerinize uygun ürün bulunamadı. Filtreleri değiştirmeyi deneyin.</p>
      </div>
    `;
    return;
  }

  filtrelenmis.forEach(function (urun) {
    const kart = document.createElement('div');
    kart.className = 'urun-kart';

    // Alerjen badge'leri oluştur
    let alerjenHTML = '';
    if (urun.alerjenler && urun.alerjenler.length > 0) {
      urun.alerjenler.forEach(function (alerjenId) {
        const alerjenBilgi = ALERJEN_TIPLERI.find(function (a) { return a.id === alerjenId; });
        if (alerjenBilgi) {
          alerjenHTML += '<span class="alerjen-badge ' + alerjenBilgi.sinif + '">' + alerjenBilgi.ikon + ' ' + alerjenBilgi.ad + '</span>';
        }
      });
    }

    // Görsel alanı
    let gorselHTML = '';
    if (urun.gorsel) {
      gorselHTML = `
        <div class="urun-kart-gorsel">
          <img src="${urun.gorsel}" alt="${urun.ad}" loading="lazy">
          <div class="urun-kart-fiyat-badge">₺${urun.fiyat}</div>
        </div>
      `;
    }

    kart.innerHTML = `
      ${gorselHTML}
      <div class="urun-kart-detay">
        <div class="urun-kart-ust">
          <h3 class="urun-kart-ad">${urun.ad}</h3>
          ${!urun.gorsel ? '<span class="urun-kart-fiyat-badge" style="position:static;margin-left:12px;flex-shrink:0;">₺' + urun.fiyat + '</span>' : ''}
        </div>
        <p class="urun-kart-aciklama">${urun.aciklama}</p>
        <div class="urun-kart-malzemeler">
          <strong>Malzemeler:</strong> ${urun.malzemeler}
        </div>
        ${alerjenHTML ? '<div class="urun-kart-alerjenler">' + alerjenHTML + '</div>' : '<div class="urun-kart-alerjenler"><span style="font-size:0.8rem;color:var(--renk-yesil);font-weight:500;">✓ Bilinen alerjen içermez</span></div>'}
      </div>
    `;

    grid.appendChild(kart);
  });
}

// --- WhatsApp butonu ---
function whatsappButonKur() {
  const a = document.getElementById('whatsapp-floating');
  if (!a) return;
  const telHam = (typeof ISLETME !== 'undefined' && ISLETME && ISLETME.telefon) ? ISLETME.telefon : '+90 212 555 00 00';
  let digits = String(telHam).replace(/\D/g, '');
  if (digits.startsWith('0')) digits = '90' + digits.slice(1);
  if (!digits.startsWith('90')) digits = '90' + digits;
  const isim = (typeof ISLETME !== 'undefined' && ISLETME && ISLETME.ad) ? ISLETME.ad : 'İşletme';
  const mesaj = `Merhaba ${isim}, menü hakkında bilgi almak istiyorum.`;
  const url = `https://wa.me/${digits}?text=${encodeURIComponent(mesaj)}`;
  a.setAttribute('href', url);
}