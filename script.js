// Mobile navigation
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

menu.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("active");
  menu.textContent = isOpen ? "✕" : "☰";
  menu.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menu.textContent = "☰";
    menu.setAttribute("aria-expanded", "false");
  });
});

// Custom cursor (desktop only)
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
if (window.matchMedia("(pointer: fine)").matches) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  document.addEventListener("mousemove", event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll("a, button, .certificate, .project-card, .experience-card, .skill-list span")
    .forEach(element => {
      element.addEventListener("mouseenter", () => {
        ring.style.width = "65px";
        ring.style.height = "65px";
      });
      element.addEventListener("mouseleave", () => {
        ring.style.width = "38px";
        ring.style.height = "38px";
      });
    });
}

// Scroll reveal
const revealItems = document.querySelectorAll(
  ".about-grid, .timeline-item, .project-card, .experience-card, .research-box, .publication, .certificate, .skill-list span"
);

if ("IntersectionObserver" in window) {
  revealItems.forEach(item => {
    item.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Footer year
document.querySelector("footer p").textContent =
  `Designed with purpose by Sneha Annadhurai © ${new Date().getFullYear()}`;
