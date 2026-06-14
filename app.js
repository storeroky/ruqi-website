// Gallery lightbox
const allImgs = Array.from(document.querySelectorAll('.g-card img'));

function openLightbox(src, caption) {
  document.getElementById('lbImg').src = src;
  document.getElementById('lbCaption').textContent = caption;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (!e || e.target === document.getElementById('lightbox') || e.target.classList.contains('lb-close')) {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
}

function lbNav(dir) {
  const visible = allImgs.filter(i => i.closest('.g-card').style.display !== 'none');
  const cur = visible.findIndex(i => i.src === document.getElementById('lbImg').src);
  const next = (cur + dir + visible.length) % visible.length;
  document.getElementById('lbImg').src = visible[next].src;
  document.getElementById('lbCaption').textContent = visible[next].alt;
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox({ target: document.getElementById('lightbox') });
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft') lbNav(-1);
});

// Filter gallery
function filterGallery(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.g-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
  });
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(link.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

// Order form → WhatsApp
function submitOrder() {
  const name = document.getElementById('f-name').value;
  const phone = document.getElementById('f-phone').value;
  const addr = document.getElementById('f-addr').value;
  const type = document.getElementById('f-type').value;
  const face = document.getElementById('f-face').value;
  const struct = document.getElementById('f-struct').value;
  const notes = document.getElementById('f-notes').value;
  if (!name || !phone) { alert('يرجى تعبئة الاسم ورقم الهاتف'); return; }
  const msg = `مرحباً، أريد الاستفسار عن خدماتكم\nالاسم: ${name}\nالهاتف: ${phone}\nالعنوان: ${addr}\nنوع المنتج: ${type}\nالواجهة: ${face}\nالهيكل: ${struct}\nملاحظات: ${notes}`;
  window.open(`https://wa.me/2180923124913?text=${encodeURIComponent(msg)}`, '_blank');
}
