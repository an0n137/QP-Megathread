// Smooth reveal on scroll for sections & cards
const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.section, .card, .about-card').forEach((el) => io.observe(el));

// Subtle parallax tilt on cards
document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const rx = ((y / r.height) - 0.5) * -6;
        const ry = ((x / r.width)  - 0.5) *  6;
        card.style.transform = `translateY(-6px) perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// Navbar blur strength on scroll
const nav = document.querySelector('.navbar');
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }, { passive: true });
}

fetch('assets/data/last-updated.json')
  .then(r => r.json())
  .then(d => {
    const el = document.getElementById('last-updated');
    if (el && d.date) {
      const formatted = new Date(d.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
      el.textContent = 'Updated: ' + formatted;
    }
  })
  .catch(() => {}); // fail silently if file missing
