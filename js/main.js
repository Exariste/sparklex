// ================= ACTIVE NAV LINK =================
(function () {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const hrefFile = href.split('/').pop();
    if (hrefFile === current) a.classList.add('active');
  });
})();

// ================= HEADER SCROLL STATE =================
const header = document.getElementById('siteHeader');
const backTop = document.getElementById('backTop');
if (header && backTop) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    backTop.classList.toggle('show', window.scrollY > 600);
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ================= MOBILE MENU =================
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => { mobileMenu.classList.toggle('open'); });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

// ================= FLOATING BUBBLES (hero only) =================
const bubbleContainer = document.getElementById('bubbles');
if (bubbleContainer) {
  for (let i = 0; i < 24; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = 6 + Math.random() * 26;
    b.style.width = size + 'px';
    b.style.height = size + 'px';
    b.style.left = Math.random() * 100 + '%';
    b.style.animationDuration = (10 + Math.random() * 14) + 's';
    b.style.animationDelay = (Math.random() * 14) + 's';
    bubbleContainer.appendChild(b);
  }
}

// ================= SCROLL REVEAL =================
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

// ================= ANIMATED COUNTERS =================
function animateCount(el) {
  const target = parseFloat(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '';
  const isBig = target >= 100000;
  let cur = 0;
  const duration = 1600;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    cur = target * eased;
    let display;
    if (target % 1 !== 0) { display = cur.toFixed(1); }
    else if (isBig) { display = Math.floor(cur).toLocaleString(); if (p >= 1) display = (target / 1000000 >= 1 ? (target / 1000000) + 'M' : target.toLocaleString()); }
    else { display = Math.floor(cur); }
    el.textContent = display + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); } });
  }, { threshold: 0.4 });
  counters.forEach(c => cio.observe(c));
}

// ================= FAQ ACCORDION (faq page only) =================
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  if (!q || !a) return;
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); const ia = i.querySelector('.faq-a'); if (ia) ia.style.maxHeight = null; });
    if (!isOpen) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
  });
});

// ================= TESTIMONIAL SLIDER (distributor page only) =================
const slides = document.querySelectorAll('#testiSlider .testi-card');
const dots = document.querySelectorAll('.testi-dots span');
if (slides.length && dots.length) {
  let curSlide = 0;
  function showSlide(i) {
    slides.forEach((s, idx) => s.style.display = idx === i ? 'block' : 'none');
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    curSlide = i;
  }
  dots.forEach((d, idx) => d.addEventListener('click', () => showSlide(idx)));
  setInterval(() => { showSlide((curSlide + 1) % slides.length); }, 5500);
}

// ================= BEFORE/AFTER SLIDER (why page only) =================
const compare = document.getElementById('slideCompare');
const afterWrap = document.getElementById('afterWrap');
const handle = document.getElementById('slideHandle');
if (compare && afterWrap && handle) {
  let dragging = false;
  function setSlide(x) {
    const rect = compare.getBoundingClientRect();
    let pct = ((x - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    afterWrap.style.width = pct + '%';
    handle.style.left = pct + '%';
  }
  handle.addEventListener('mousedown', () => dragging = true);
  window.addEventListener('mouseup', () => dragging = false);
  window.addEventListener('mousemove', (e) => { if (dragging) setSlide(e.clientX); });
  handle.addEventListener('touchstart', () => dragging = true);
  window.addEventListener('touchend', () => dragging = false);
  window.addEventListener('touchmove', (e) => { if (dragging) setSlide(e.touches[0].clientX); });
  compare.addEventListener('click', (e) => setSlide(e.clientX));
}

// ================= PROFIT CALCULATOR (distributor page only) =================
const unitsRange = document.getElementById('unitsRange');
const marginRange = document.getElementById('marginRange');
const unitsVal = document.getElementById('unitsVal');
const marginVal = document.getElementById('marginVal');
const calcResult = document.getElementById('calcResult');
if (unitsRange && marginRange && unitsVal && marginVal && calcResult) {
  function updateCalc() {
    const units = parseInt(unitsRange.value);
    const margin = parseInt(marginRange.value);
    unitsVal.textContent = units.toLocaleString();
    marginVal.textContent = '৳' + margin;
    calcResult.textContent = '৳' + (units * margin).toLocaleString();
  }
  unitsRange.addEventListener('input', updateCalc);
  marginRange.addEventListener('input', updateCalc);
  updateCalc();
}

// ================= CONTACT FORM (contact + home page) =================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const cfBtn = contactForm.querySelector('button[type="submit"]');
  const cfMsg = document.getElementById('cfMsg');

  function showFormMsg(text, type) {
    if (!cfMsg) return;
    cfMsg.textContent = text;
    cfMsg.className = 'form-msg ' + type;
    cfMsg.style.display = 'block';
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('cfName').value.trim();
    const email = document.getElementById('cfEmail').value.trim();
    const subject = document.getElementById('cfSubject').value.trim();
    const message = document.getElementById('cfMessage').value.trim();

    const originalText = cfBtn.textContent;
    cfBtn.disabled = true;
    cfBtn.textContent = 'Sending…';
    if (cfMsg) cfMsg.style.display = 'none';

    try {
      const res = await fetch('https://formsubmit.co/ajax/info@exariste.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: 'SparkleX Website — Contact Message',
          'Name': name,
          'Email': email,
          'Subject': subject || '—',
          'Message': message
        })
      });
      if (!res.ok) throw new Error('Request failed');
      showFormMsg('Thanks, ' + name + '! Your message has been sent — we\'ll get back to you soon.', 'success');
      contactForm.reset();
    } catch (err) {
      showFormMsg('Sorry, your message could not be sent right now. Please try again or email us directly at info@exariste.com.', 'error');
    } finally {
      cfBtn.disabled = false;
      cfBtn.textContent = originalText;
    }
  });
}
