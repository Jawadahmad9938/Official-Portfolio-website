// ===== PERFORMANCE & MOBILE DETECTION =====
const isMobile = window.matchMedia("(max-width: 768px)").matches;
const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const form = this;
    const btn = form.querySelector(".newsletter-btn");
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
      btn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
      form.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
      }, 2000);
    }, 1500);
  });
}

// ===== SOCIAL LINKS HOVER =====
if (!isReducedMotion) {
  document.querySelectorAll(".social-link").forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.05)";
    }, { passive: true });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    }, { passive: true });
  });
}

// ===== THREE.JS INITIALIZATION =====
function initThreeJS() {
  // Placeholder for Three.js background
}

function initHeroThreeJS() {
  // Placeholder for Hero Three.js
}

// ===== FLOATING ICONS =====
function initFloatingIcons() {
  const container = document.getElementById("floating-icons");
  if (!container) return;

  const iconCount = isMobile ? 5 : 15;
  const icons = [
    "/img/html.svg",
    "/img/css-3.svg",
    "/img/javascript.svg",
    "/img/tailwind.svg",
    "/img/node-js (1).svg",
  ];

  for (let i = 0; i < iconCount; i++) {
    const icon = document.createElement("img");
    icon.src = icons[Math.floor(Math.random() * icons.length)];
    icon.className = "floating-icon";
    icon.style.left = `${Math.random() * 100}%`;
    icon.style.top = `${Math.random() * 100}%`;
    icon.style.animationDelay = `${Math.random() * 5}s`;
    icon.loading = "lazy";
    container.appendChild(icon);

    if (!isMobile) {
      icon.addEventListener("click", function () {
        this.style.animation = "none";
        setTimeout(() => {
          this.style.animation = "floatIcon 15s infinite ease-in-out";
        }, 100);
      });
    }
  }
}

// ===== MOBILE MENU =====
const menuButton = document.getElementById("menu-button");
const mobileOverlay = document.getElementById("mobile-overlay");
const mobileMenuContainer = document.getElementById("mobile-menu-container");
const mobileCloseBtn = document.getElementById("mobile-close");
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

function closeMenu() {
  if (menuButton) menuButton.classList.remove("active");
  if (mobileOverlay) mobileOverlay.classList.remove("active");
  if (mobileMenuContainer) mobileMenuContainer.classList.remove("active");
  document.body.style.overflow = "auto";
}

function toggleMenu() {
  if (menuButton) menuButton.classList.toggle("active");
  if (mobileOverlay) mobileOverlay.classList.toggle("active");
  if (mobileMenuContainer) mobileMenuContainer.classList.toggle("active");

  if (mobileMenuContainer?.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

if (menuButton) {
  menuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });
}

if (mobileCloseBtn) {
  mobileCloseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeMenu();
  });
}

if (mobileOverlay) {
  mobileOverlay.addEventListener("click", (e) => {
    e.stopPropagation();
    closeMenu();
  });
}

mobileNavItems.forEach((item) => {
  item.addEventListener("click", () => {
    closeMenu();
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMenu();
  }
});

if (mobileMenuContainer) {
  mobileMenuContainer.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// ===== THEME TOGGLE =====
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");
const THEME_KEY = "site-theme";

function loadThemePreference() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "light" || (!savedTheme && !prefersDark)) {
    document.body.classList.add("light-mode");
    themeIcon?.classList.replace("fa-moon", "fa-sun");
  } else {
    themeIcon?.classList.replace("fa-sun", "fa-moon");
  }
}

themeToggleBtn?.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem(THEME_KEY, "light");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    localStorage.setItem(THEME_KEY, "dark");
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
});

loadThemePreference();

// ===== DOM CONTENT LOADED =====
document.addEventListener("DOMContentLoaded", () => {
  initThreeJS();
  initHeroThreeJS();
  initFloatingIcons();

  // Animate cards on load
  if (!isReducedMotion) {
    const cards = document.querySelectorAll(".service-card, .project-card");
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add("animate__animated", "animate__fadeInUp");

      if (!isMobile) {
        card.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-10px) scale(1.05)";
        }, { passive: true });

        card.addEventListener("mouseleave", function () {
          this.style.transform = "translateY(0) scale(1)";
        }, { passive: true });
      }
    });
  }

  // Intersection Observer for sections
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isReducedMotion) {
          entry.target.classList.add("animate__animated", "animate__fadeInUp");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  document
    .querySelectorAll(
      ".about-section, .services-section, .projects-section, .clients-section, .skills-section, .testimonials-section, .contact-section"
    )
    .forEach((section) => revealObserver.observe(section));
});

// ===== LAZY LOADING IMAGES =====
if ("IntersectionObserver" in window) {
  document.querySelectorAll("img[data-src]").forEach((img) => {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          if (image.dataset.src) {
            image.src = image.dataset.src;
            image.removeAttribute("data-src");
          }
          observer.unobserve(image);
        }
      });
    });
    imgObserver.observe(img);
  });
}
