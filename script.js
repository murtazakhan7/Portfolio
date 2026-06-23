/* =============================================
   Muhammad Murtaza Portfolio — script.js
   ============================================= */

/* ── Nav scroll effect ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksList.classList.toggle('open');
});

// Close on link click
navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksList.classList.remove('open');
    });
});

/* ── Typed role animation ── */
const roles = [
    'AI/ML Engineer',
    'Software Engineer',
    'RAG Pipeline Builder',
    'Backend Engineer',
    'LLM Fine-tuner',
];
let roleIdx = 0;
let charIdx = 0;
let deleting = false;
let typePause = false;
const typedEl = document.getElementById('typed-role');

function typeLoop() {
    if (!typedEl) return;
    const current = roles[roleIdx];

    if (typePause) {
        typePause = false;
        setTimeout(typeLoop, 1400);
        return;
    }

    if (!deleting) {
        typedEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            deleting = true;
            typePause = true;
        }
        setTimeout(typeLoop, 75);
    } else {
        typedEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            deleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
        }
        setTimeout(typeLoop, 38);
    }
}
typeLoop();

/* ── Fade-in on scroll ── */
const fadeEls = document.querySelectorAll('[data-fade]');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger siblings in a group
            const siblings = Array.from(entry.target.parentElement.querySelectorAll('[data-fade]'));
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, idx * 80);
            fadeObserver.unobserve(entry.target);
        }
    });
}, { rootMargin: '0px 0px -60px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 72;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ── Contact form (mailto fallback) ── */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            formStatus.textContent = 'Please fill in all fields.';
            formStatus.className = 'form-status error';
            return;
        }

        const body = encodeURIComponent(`Hi Murtaza,\n\nName: ${name}\nEmail: ${email}\n\n${message}`);
        const mailto = `mailto:murtazamuhammad508@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        window.location.href = mailto;

        formStatus.textContent = '✓ Opening your mail client...';
        formStatus.className = 'form-status success';

        setTimeout(() => {
            contactForm.reset();
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 3000);
    });
}

/* ── Subtle parallax on hero orbs ── */
window.addEventListener('mousemove', (e) => {
    const orbA = document.querySelector('.orb-a');
    const orbB = document.querySelector('.orb-b');
    if (!orbA || !orbB) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    orbA.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
    orbB.style.transform = `translate(${-x * 0.25}px, ${-y * 0.25}px)`;
}, { passive: true });

/* ── Project card tilt effect ── */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ── Copy email on click in footer (bonus UX) ── */
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = 'murtazamuhammad508@gmail.com';
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).catch(() => {});
        }
    });
});