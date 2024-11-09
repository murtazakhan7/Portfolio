// List of roles to cycle through
const roles = ["Front-End Developer", "Back-End Developer"];
let roleIndex = 0;
let charIndex = 0;
let typing = true;
let delay = 80;
let pauseBetweenRoles = 10;

const roleElement = document.getElementById("role");

function typeRole() {
  const currentRole = roles[roleIndex];

  if (typing) {
    // Display characters one by one
    roleElement.innerHTML = currentRole.substring(0, charIndex + 1) + (charIndex < currentRole.length ? "" : "");
    charIndex++;

    // If the entire role has been typed, switch to erasing mode
    if (charIndex > currentRole.length) {
      typing = false;
      setTimeout(typeRole, pauseBetweenRoles);
      return;
    }
  } else {
    // Erase characters one by one
    roleElement.innerHTML = currentRole.substring(0, charIndex - 1) + "";
    charIndex--;

    // If the entire role has been erased, move to the next role
    if (charIndex < 0) {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  // Set delay for the next character
  setTimeout(typeRole, delay);
}

// Function to check screen width and toggle visibility of elements
function checkScreenWidth() {
  const mediaQuery = window.matchMedia("(max-width: 600px)");
  const elements = document.getElementsByClassName("navigation");

  Array.from(elements).forEach((el) => {
    if (mediaQuery.matches) {
      // Hide the elements when the screen width is 600px or less
      el.style.display = "none";
    } else {
      // Show the elements when the screen width is greater than 600px
      el.style.display = "";
    }
  });
}

// Start the typing effect and check screen width when content is loaded
document.addEventListener("DOMContentLoaded", () => {
  typeRole();
  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);
});
