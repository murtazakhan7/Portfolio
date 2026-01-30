// ===== TYPING EFFECT =====
const roles = [
    "Backend Developer",
    "ML Engineer",
    "DL Engineer",
    "Explainable AI Specialist",
    "LLM Engineer"
];

let roleIndex = 0;
let charIndex = 0;
let typing = true;
let delay = 80;
let pauseBetweenRoles = 1500;
const roleElement = document.getElementById("role");

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (typing) {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex > currentRole.length) {
            typing = false;
            setTimeout(typeRole, pauseBetweenRoles);
            return;
        }
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex < 0) {
            typing = true;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    
    setTimeout(typeRole, delay);
}

// ===== HAMBURGER MENU =====
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    // Toggle menu
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===== SMOOTH SCROLL WITH OFFSET =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-item')) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        const progress = progressBar.getAttribute('data-progress');
                        progressBar.style.width = progress + '%';
                    }
                }
                
                // Animate timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.animation = 'fadeInLeft 0.8s ease forwards';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
    
    // Observe skill items
    document.querySelectorAll('.skill-item').forEach(el => observer.observe(el));
    
    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navigation = document.querySelector('.navigation');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navigation.style.background = 'rgba(10, 14, 39, 0.98)';
            navigation.style.boxShadow = '0 4px 20px rgba(0, 255, 245, 0.1)';
        } else {
            navigation.style.background = 'rgba(10, 14, 39, 0.95)';
            navigation.style.boxShadow = 'none';
        }
    });
}

// ===== CONTACT FORM HANDLER =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        const submitBtn = this.querySelector('.submit-btn');
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Disable submit button
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';
        
        // Create mailto link with form data
        const mailtoLink = `mailto:murtazamuhammad508@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        formStatus.style.display = 'block';
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Opening your email client...';
        
        // Reset form
        setTimeout(() => {
            this.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 3000);
        }, 2000);
    });
}

// ===== PARALLAX EFFECT FOR HERO ORBS =====
function initParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
}

// ===== CURSOR TRAIL EFFECT (OPTIONAL) =====
function initCursorTrail() {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.circle');
    
    if (circles.length === 0) return;
    
    circles.forEach(function (circle) {
        circle.x = 0;
        circle.y = 0;
    });
    
    window.addEventListener('mousemove', function(e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });
    
    function animateCircles() {
        let x = coords.x;
        let y = coords.y;
        
        circles.forEach(function (circle, index) {
            circle.style.left = x - 12 + 'px';
            circle.style.top = y - 12 + 'px';
            circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
            
            circle.x = x;
            circle.y = y;
            
            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });
        
        requestAnimationFrame(animateCircles);
    }
    
    animateCircles();
}

// ===== PROJECT CARD TILT EFFECT =====
function initProjectTilt() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===== COUNTER ANIMATION FOR STATS =====
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = target.textContent;
                
                // Only animate if it's a number
                if (!isNaN(parseFloat(targetValue))) {
                    const value = parseFloat(targetValue);
                    const duration = 2000;
                    const increment = value / (duration / 16);
                    let current = 0;
                    
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= value) {
                            target.textContent = targetValue;
                            clearInterval(counter);
                        } else {
                            target.textContent = current.toFixed(2);
                        }
                    }, 16);
                }
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// ===== LAZY LOADING FOR IMAGES =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient-primary);
            color: var(--bg-primary);
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: var(--transition-base);
            z-index: 999;
            box-shadow: var(--shadow-md);
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== INITIALIZE ALL FUNCTIONS =====
document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    typeRole();
    
    // Initialize all features
    initHamburgerMenu();
    initSmoothScroll();
    initScrollAnimations();
    initNavbarScroll();
    initContactForm();
    initParallax();
    initActiveNavLink();
    initProjectTilt();
    initCounterAnimation();
    initLazyLoading();
    initBackToTop();
    
    // Add loaded class for animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== CONSOLE SIGNATURE =====
console.log(
    '%c Muhammad Murtaza ',
    'background: linear-gradient(135deg, #00fff5 0%, #8338ec 100%); color: #0a0e27; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;'
);
console.log(
    '%c AI/ML Engineer | LLM Specialist | Deep Learning Expert ',
    'color: #00fff5; font-size: 14px; font-weight: bold;'
);
console.log('%c Looking for opportunities! 💼', 'color: #ff006e; font-size: 12px;');
