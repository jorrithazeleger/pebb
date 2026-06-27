// ---- Dutch / English copy (NL is the source in the HTML) ----
const I18N = {
  en: {
    'nav.collection': 'Collection',
    'nav.colors': 'Colours',
    'nav.studio': 'About PEBB',
    'nav.bespoke': 'Bespoke',
    'nav.contact': 'Contact',
    'nav.bag': 'Bag',
    'hero.kicker': 'Handmade · Amersfoort',
    'hero.title': 'A unique design<br>that is <em>all our own</em>',
    'hero.sub': 'Dining and coffee tables in every shape, colour and size. Made by hand, with nothing kept in stock.',
    'hero.cta1': 'View the collection',
    'hero.cta2': 'Request bespoke →',
    'hero.press': 'As seen in',
    'press.seen': 'As seen in',
    'intro.statement': 'PEBB makes handmade tables with a unique design. We make them in every shape, colour, type and size. You bring the idea, we think along on the functionality.',
    'intro.place': 'Amersfoort, NL',
    'intro.showroom': 'Showroom Loods 5',
    'index.label': 'The collection',
    'cat.dining': 'Dining table',
    'cat.coffee': 'Coffee table',
    'spec.shape': 'Shape',
    'spec.material': 'Material',
    'spec.materialval': 'Concrete look',
    'spec.color': 'Colour',
    'spec.colorval': 'Any colour · LAB-PAINT',
    'spec.size': 'Size',
    'spec.sizeval': 'Multiple sizes',
    'spec.maker': 'Maker',
    'price.from': 'from',
    'item.bespoke': 'or design your own table →',
    'item01.lead': 'Our signature. A pebble shape on a one-of-a-kind base, in any colour you like.',
    'item01.shape': 'Pebble with unique base',
    'item02.lead': 'A round dining table. No corners, all room for conversation.',
    'item02.shape': 'Round',
    'item03.lead': 'A flowing, organic shape that adapts to your space.',
    'item03.shape': 'Organic',
    'item04.lead': 'Soft lines and a seat for everyone. Our roomiest dining table.',
    'item04.shape': 'Oval',
    'item05.lead': 'Tight against the wall or free in the room. A half-circle that fits where a full one cannot.',
    'item05.shape': 'Half-circle',
    'item06.lead': 'Low tables in pebble and stone shapes. Lovely alone, even better as a set.',
    'item06.shape': 'Pebble & stone',
    'colors.kicker': 'In partnership with LAB-PAINT',
    'colors.title': '178 colours, one table',
    'colors.text': 'Every PEBB table comes in one of 178 colours from the LAB-PAINT palette. From soft and earthy to deep and graphic.',
    'colors.cta': 'Request a colour sample →',
    'proof.label': 'A favourite among interior stylists',
    'proof.quote': '“A PEBB table carries a whole room. For a styling job I reach for one more and more often.” <cite>Marit de Vries, interior stylist</cite>',
    'atelier.kicker': 'About PEBB',
    'atelier.quote': '“You bring the idea, we think along on the functionality.”',
    'atelier.body': 'PEBB makes handmade tables with a unique, homegrown design. We make them in every shape, colour, type and size. From a round dining table to a pebble-shaped coffee table, and any colour is possible thanks to our palette with LAB-PAINT.',
    'atelier.cta': 'Visit the showroom →',
    'press.line': 'Visit the showroom and pick your colour',
    'bespoke.kicker': 'Bespoke',
    'bespoke.title': 'Design your own table',
    'bespoke.body': 'You bring the idea, we think along on the functionality. We make tables in every shape, colour, type and size. Leave your details and we will get in touch.',
    'form.submit': 'Send',
    'form.thanks': 'Thanks, we will be in touch soon.',
    'footer.tagline': 'Handmade tables · Amersfoort<br>Showroom Loods 5',
    'footer.collection': 'Collection',
    'footer.dining': 'Dining tables',
    'footer.coffee': 'Coffee tables',
    'footer.bespoke': 'Bespoke',
    'footer.contact': 'Contact'
  },
  phEn: {
    'form.name': 'Your name',
    'form.email': 'Your email address'
  }
};

// store original NL strings so we can switch back
const NL = {};
const NL_PH = {};

function cacheDutch() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    NL[el.getAttribute('data-i18n')] = el.innerHTML;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    NL_PH[el.getAttribute('data-i18n-ph')] = el.getAttribute('placeholder');
  });
}

function setLang(lang) {
  const dict = lang === 'en' ? I18N.en : NL;
  const phDict = lang === 'en' ? I18N.phEn : NL_PH;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (phDict[key] !== undefined) el.setAttribute('placeholder', phDict[key]);
  });
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('.lang').forEach(b => {
    b.classList.toggle('is-active', b.dataset.lang === lang);
  });
}

// ---- toast ----
let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

// ---- bag ----
let bagCount = 0;

// ---- product photo galleries (Pexels placeholder material) ----
const px = (id, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

// Local product photos. Drop your own files into pebb/assets/ with exactly
// these names (jpg). Until a file exists, the matching stock photo from
// FALLBACK is shown automatically, so the site never looks broken.
const GALLERIES = {
  '01': ['assets/pam-1.jpg'],
  '02': ['assets/rond-1.jpg'],
  '03': ['assets/organisch-1.jpg'],
  '04': ['assets/ovaal-1.jpg'],
  '05': ['assets/halve-cirkel-1.jpg'],            // nog geen eigen foto -> stock
  '06': ['assets/salontafel-1.jpg', 'assets/salontafel-2.jpg']
};

const FALLBACK = {
  '01': [px(5865162)],
  '02': [px(7180275)],
  '03': [px(6748972)],
  '04': [px(5472818)],
  '05': [px(6908357)],
  '06': [px(7538106), px(36502347)]
};

const galleryState = {}; // gallery id -> current index

function showImage(article, idx) {
  const id = article.dataset.gallery;
  const list = GALLERIES[id];
  if (!list) return;
  idx = ((idx % list.length) + list.length) % list.length;
  galleryState[id] = idx;

  const img = article.querySelector('.stage-img');
  img.classList.remove('loaded');
  img.onload = () => img.classList.add('loaded');
  img.onerror = () => {           // local file missing -> use stock fallback
    img.onerror = null;
    img.src = FALLBACK[id][idx];
  };
  img.src = list[idx];
  if (img.complete && img.naturalWidth) img.classList.add('loaded');

  article.querySelector('.gallery-count .cur').textContent = String(idx + 1).padStart(2, '0');
  article.querySelector('.gallery-count .total').textContent = String(list.length);

  // preload neighbour so the next click is instant
  const next = new Image();
  next.src = FALLBACK[id][(idx + 1) % list.length];
}

function initGalleries() {
  document.querySelectorAll('.item[data-gallery]').forEach(article => {
    showImage(article, 0);
    article.querySelectorAll('.gnav').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = article.dataset.gallery;
        const dir = btn.classList.contains('next') ? 1 : -1;
        showImage(article, (galleryState[id] || 0) + dir);
      });
    });
  });
}

// ---- header turns solid once the hero is scrolled past ----
function initHeader() {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  if (!header || !hero) return;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > hero.offsetHeight - 90);
    document.body.classList.toggle('topbar-hidden', y > 40);  // bovenbalk verdwijnt bij scrollen
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ---- build the wall of 178 LAB-PAINT colour swatches ----
function initColors() {
  const wall = document.getElementById('swatches');
  if (!wall) return;
  // a compact, curated sample of muted tones (not the literal 178)
  const hueSteps = 8, lightSteps = 6;
  for (let h = 0; h < hueSteps; h++) {
    for (let l = 0; l < lightSteps; l++) {
      const hue = Math.round((h / hueSteps) * 360);
      const sat = 24 + l * 3;          // 24 → 39 % (muted)
      const light = 80 - l * 8;        // 80 → 40 %
      const d = document.createElement('div');
      d.className = 'swatch';
      d.style.background = `hsl(${hue} ${sat}% ${light}%)`;
      wall.appendChild(d);
    }
  }
}

// ---- fade sections up as they enter the viewport ----
function initReveal() {
  const els = document.querySelectorAll('.item, .proof, .colors, .atelier, .press, .bespoke');
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return; // already visible
    el.classList.add('reveal');
    io.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  cacheDutch();

  document.querySelectorAll('.lang').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  initGalleries();
  initColors();
  initHeader();
  initReveal();

  document.querySelectorAll('.add-to-bag').forEach(btn => {
    btn.addEventListener('click', () => {
      bagCount++;
      document.getElementById('bag-count').textContent = bagCount;
      const name = btn.closest('.item-info').querySelector('.item-title').textContent;
      toast(`“${name}” toegevoegd aan je tas`);
    });
  });

  const form = document.querySelector('.signup');
  if (form) {
    form.addEventListener('submit', () => {
      const note = document.getElementById('signup-note');
      note.hidden = false;
      form.reset();
    });
  }
});
