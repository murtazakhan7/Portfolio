// Typing Effect Code
const roles = ["Front-End Developer", "Back-End Developer", "Aspiring ML Engineer"];
let roleIndex = 0;
let charIndex = 0;
let typing = true;
let delay = 80;
let pauseBetweenRoles = 1000;
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

// Hamburger Menu Functionality
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  // Toggle menu
  hamburger.addEventListener('click', () => {
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

// Toggle Visibility of Elements Based on Screen Width
function checkScreenWidth() {
  const mediaQuery = window.matchMedia("(max-width: 600px)");
  const elements = document.getElementsByClassName("navigation");

  Array.from(elements).forEach((el) => {
    el.style.display = mediaQuery.matches ? "none" : "block";
  });
}

// Function to Animate Elements When in View
function animateOnScroll(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('skills-bar')) {
        entry.target.style.animation = 'fillBar 1.2s ease-in-out forwards';
      } else if (entry.target.classList.contains('education')) {
        entry.target.style.animation = 'slideInLeft 1s ease-in-out forwards';
      } else if (entry.target.classList.contains('experience')) {
        entry.target.style.animation = 'slideInRight 1s ease-in-out forwards';
      }
      observer.unobserve(entry.target);
    }
  });
}

// Create Intersection Observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Observe skills bars and sections
document.querySelectorAll('.skills-bar').forEach((bar) => observer.observe(bar));
document.querySelectorAll('.education').forEach((section) => observer.observe(section));

// Start the typing effect and check screen width when content is loaded
document.addEventListener("DOMContentLoaded", () => {
  typeRole();
  checkScreenWidth();
  initHamburgerMenu();
  window.addEventListener("resize", checkScreenWidth);
});
