/* =============================================
   Muhammad Murtaza — Portfolio
   ============================================= */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ── Sticky nav background ── */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ── Active nav link ── */
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('section[id]').forEach((s) => sectionObserver.observe(s));

/* ── Mobile menu ── */
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('nav-links');

const setMenu = (open) => {
    hamburger.classList.toggle('open', open);
    navLinksList.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
};

hamburger.addEventListener('click', () => setMenu(!navLinksList.classList.contains('open')));
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setMenu(!navLinksList.classList.contains('open'));
    }
});
navLinksList.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
});

/* ── Scroll-triggered reveals, staggered within each group ── */
const revealEls = document.querySelectorAll('[data-reveal]');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('revealed'));
} else {
    const childrenOf = new Map();
    revealEls.forEach((el) => {
        const parent = el.parentElement;
        if (!childrenOf.has(parent)) {
            childrenOf.set(parent, Array.from(parent.querySelectorAll(':scope > [data-reveal]')));
        }
        const idx = childrenOf.get(parent).indexOf(el);
        if (idx > 0) el.style.setProperty('--d', `${Math.min(idx, 6) * 70}ms`);
    });

    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    revealEls.forEach((el) => revealObserver.observe(el));
}

/* ── Cursor spotlight on project tiles ── */
if (canHover && !prefersReducedMotion) {
    let frame = null;
    let pending = null;

    const apply = () => {
        frame = null;
        if (!pending) return;
        const { card, x, y } = pending;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
    };

    document.querySelectorAll('[data-spotlight]').forEach((card) => {
        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            pending = { card, x: e.clientX - rect.left, y: e.clientY - rect.top };
            if (frame === null) frame = requestAnimationFrame(apply);
        }, { passive: true });
    });
}

/* ── Contact form (opens the visitor's mail client) ── */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const MAILBOX = 'murtazamuhammad508@gmail.com';

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            formStatus.textContent = 'Please fill in all fields.';
            formStatus.className = 'form-status error';
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            formStatus.textContent = 'That email address doesn’t look right.';
            formStatus.className = 'form-status error';
            return;
        }

        const body = encodeURIComponent(`Hi Murtaza,\n\nName: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:${MAILBOX}?subject=${encodeURIComponent(subject)}&body=${body}`;

        formStatus.textContent = '✓ Opening your mail client…';
        formStatus.className = 'form-status success';

        setTimeout(() => {
            contactForm.reset();
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 3000);
    });
}

/* ── Copy address to clipboard when a mail link is used ── */
document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener('click', () => {
        if (navigator.clipboard) navigator.clipboard.writeText(MAILBOX).catch(() => {});
    });
});
